const router = require("express").Router();
const {
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
// Import Validators
const { validateNewItem, validateId } = require("../middlewares/validation");

// Create
router.post("/", validateNewItem, createItem);

// Delete
router.delete("/:itemId", validateId, deleteItem);

// like
router.put("/:id/likes", validateId, likeItem);

// dislike
router.delete("/:id/likes", validateId, dislikeItem);

module.exports = router;
