const express = require("express");
const router = express.Router();
const {
  createUser,
  listUsers,
  updateUser,
  softDeleteUser,
  hardDeleteUser,
  getUser,
} = require("../controllers/userController");
const {
  validateUser,
  validateList,
  validateUserId,
} = require("../validations/validator");

// Create a new user profile
router.post("/", validateUser, createUser);

// Retrieve a single user
router.get("/:id", getUser);

// Retrieve a list of user profiles
router.get("/", validateList, listUsers);

// Update an existing user profile
router.put("/:id", validateUser, updateUser);

// Soft delete a user
router.delete("/soft/:idOrEmailOrUsername", softDeleteUser);

// Hard delete a user
router.delete("/hard/:idOrEmailOrUsername", hardDeleteUser);

module.exports = router;
