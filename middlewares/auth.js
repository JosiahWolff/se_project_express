const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { unauthorizedError } = require("../utils/errors");

const authError = (res) => {
  res.status(unauthorizedError).send({ message: "Authorization Required" });
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return authError(res);
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    console.error(unauthorizedError);
    return authError(res);
  }

  req.user = payload;

  next();
};
