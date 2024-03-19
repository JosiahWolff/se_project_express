const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { defaultSecret } = require("../utils/config");

const { serverError } = require("../utils/errors");
const { BadRequestError } = require("../utils/moreErrors/BadRequestError");
const { NotFoundError } = require("../utils/moreErrors/NotFoundError");
const { UnauthorizedError } = require("../utils/moreErrors/UnauthorizedError");
const { ConflictError } = require("../utils/moreErrors/ConflictError");

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new Error("User not found");
      }
      return res.status(200).send({ data: user });
    })
    .catch((e) => {
      console.error(e);

      if (e.name === "CastError") {
        next(BadRequestError).send({ message: "Invalid data" });
      } else if (e.message === "User not found") {
        next(NotFoundError).send({ message: "User not found" });
      } else {
        next(serverError).send({ message: "Server error from getCurrentUser" });
      }
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("User not found"));
      }
      return res.send({ data: user });
    })
    .catch((e) => {
      console.error(e);

      if (e.name === "ValidationError") {
        next(BadRequestError).send({ message: "Invalid data" });
      } else if (e.name === "CastError") {
        next(BadRequestError).send({ message: "Invalid data" });
      } else if (e.name === "DocumentNotFoundError") {
        next(NotFoundError).send({ message: "Requested resource not found" });
      } else {
        next(serverError).send({ message: "Server error in updateUser" });
      }
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new Error("Email already in use");
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const response = user.toObject();
      delete response.password;
      res.status(201).send({
        data: response,
      });
    })
    .catch((e) => {
      console.error(e);

      if (e.name === "ValidationError") {
        next(BadRequestError).send({ message: "Invalid data" });
      } else if (e.name === "CastError") {
        next(BadRequestError).send({ message: "Invalid data" });
      } else if (e.message === "Email already in use") {
        next(ConflictError).send({
          message: "Email already exists in database",
        });
      } else {
        next(serverError).send({ message: "Server error from createUser" });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    next(BadRequestError).send({ message: "Invalid Email" });
    return;
  }

  if (!password) {
    next(BadRequestError).send({ message: "Invalid Password" });
    return;
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, defaultSecret, {
        expiresIn: "7d",
      });
      res.status(200).send({ data: token });
    })
    .catch((e) => {
      console.error(e);

      if (e.message === "Incorrect email or password") {
        next(UnauthorizedError).send({
          message: "Incorrect email or password",
        });
      } else {
        next(serverError).send({ message: "An error occurred on the server" });
      }
    });
};

module.exports = {
  getCurrentUser,
  updateUser,
  createUser,
  login,
};
