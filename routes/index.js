const router = require("express").Router();
const user = require("./users");
const clothingItem = require("./clothingItems");
const NotFoundError = require("../utils/moreErrors/NotFoundError");

router.use("/users", user);

router.use("/items", clothingItem);

router.use((req, res, next) => {
  next(new NotFoundError("Router not found"));
});

module.exports = router;
