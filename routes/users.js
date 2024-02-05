const router = require("express").Router();
const { getUsers, getUser, createUser } = require("../controllers/users");

// return all users
router.get("/", getUsers);

// return user by id
router.get("/:userId", getUser);

// create user
router.post("/", createUser);

module.exports = router;
