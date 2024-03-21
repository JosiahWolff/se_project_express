// const NODE_ENV = production;
const defaultSecret = "SecretPassword";

if (process.env.NODE_ENV === "development") {
  module.exports.JWT_SECRET = defaultSecret;
} else {
  module.exports.JWT_SECRET = process.env.JWT_SECRET;
}

module.exports = { defaultSecret };
