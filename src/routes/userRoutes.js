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
const { validateUser, validateUserId } = require("../validations/validator");

// Create a new user profile
router.post("/", validateUser, createUser);

// Retrieve a list of user profiles
router.get("/", listUsers);

// Retrieve a single user
router.get("/:id", getUser);

// Add similar routes for retrieving users by email and username

// Update an existing user profile
router.put("/:id", updateUser);

// Soft delete a user
router.delete("/soft/:idOrEmailOrUsername", softDeleteUser);

// Hard delete a user
router.delete("/hard/:idOrEmailOrUsername", hardDeleteUser);

module.exports = router;