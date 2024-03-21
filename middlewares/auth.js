const jwt = require("jsonwebtoken");
const { defaultSecret } = require("../utils/config");
const { UnauthorizedError } = require("../utils/moreErrors/UnauthorizedError");

const authError = (next) => {
  next(new UnauthorizedError("Authorization Required"));
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return authError(res);
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, defaultSecret);
  } catch (e) {
    console.error(UnauthorizedError);
    return authError(res);
  }

  req.user = payload;

  return next();
};
