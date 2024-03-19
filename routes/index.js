const router = require("express").Router();
const user = require("./users");
const clothingItem = require("./clothingItems");
const { notFoundError } = require("../utils/moreErrors/NotFoundError");

router.use("/users", user);

router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(notFoundError).send({ message: "Router not found" });
});

module.exports = router;
