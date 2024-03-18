const ClothingItem = require("../models/clothingItem");
const {
  BadRequestError,
  notFoundError,
  serverError,
  forbiddenError,
} = require("../utils/errors");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      console.error(e);
      next(err);
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((e) => {
      console.error(e);

      if (e.name === "ValidationError") {
        res.status(BadRequestError).send({ message: "Invalid data" });
      } else if (e.name === "CastError") {
        res.status(BadRequestError).send({ message: "Invalid data" });
      } else {
        next(err);
      }
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((e) => {
      console.error(e);

      if (e.name === "ValidationError") {
        res.status(BadRequestError).send({ message: "Invalid data" });
      } else if (e.name === "CastError") {
        res.status(BadRequestError).send({ message: "Invalid data" });
      } else if (e.name === "DocumentNotFoundError") {
        res
          .status(notFoundError)
          .send({ message: "Requested resource not found" });
      } else {
        next(err);
      }
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((e) => {
      console.error(e);

      if (e.name === "ValidationError") {
        res.status(BadRequestError).send({ message: "Invalid data" });
      } else if (e.name === "CastError") {
        res.status(BadRequestError).send({ message: "Invalid data" });
      } else if (e.name === "DocumentNotFoundError") {
        res
          .status(notFoundError)
          .send({ message: "Requested resource not found" });
      } else {
        next(err);
      }
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        return res
          .status(forbiddenError)
          .send({ message: "You are not authorized to delete this item" });
      }
      return item.deleteOne().then(() => {
        res.status(200).send({ data: item, message: "Item deleted" });
      });
    })
    .catch((e) => {
      console.error(e);

      if (e.name === "ValidationError") {
        res.status(BadRequestError).send({ message: "Invalid data" });
      } else if (e.name === "CastError") {
        res.status(BadRequestError).send({ message: "Invalid data" });
      } else if (e.name === "DocumentNotFoundError") {
        res
          .status(notFoundError)
          .send({ message: "Requested resource not found" });
      } else {
        next(err);
      }
    });
};

module.exports = {
  createItem,
  getItems,
  likeItem,
  dislikeItem,
  deleteItem,
};
