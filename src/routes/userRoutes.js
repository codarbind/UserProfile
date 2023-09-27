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

router.post("/", validateUser, createUser);

router.get("/:id", getUser);

router.get("/", validateList, listUsers);

router.put("/:id", validateUser, updateUser);

router.delete("/soft/:idOrEmailOrUsername", softDeleteUser);

router.delete("/hard/:idOrEmailOrUsername", hardDeleteUser);

module.exports = router;
