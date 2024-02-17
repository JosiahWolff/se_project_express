const router = require("express").Router();
const {
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// Create
router.post("/", createItem);

// Delete
router.delete("/:itemId", deleteItem);

// like
router.put("/:id/likes", likeItem);

// dislike
router.delete("/:id/likes", dislikeItem);

module.exports = router;
