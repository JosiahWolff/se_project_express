const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// Create
router.post("/", createItem);

// Reutrn all clothing
router.get("/", getItems);

// Delete
router.delete("/:itemId", deleteItem);

// like
router.put("/:id/likes", likeItem);

// dislike
router.delete("/:id/likes", dislikeItem);

module.exports = router;
