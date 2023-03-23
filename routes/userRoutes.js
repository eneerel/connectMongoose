const express = require("express");
const {
  register,
  login,
  createUser,
  getAllUsers,
  getUsers,
  updateUsers,
  deleteUsers,
} = require("../controllers/userController");
const checkRole = require("../utils/checkrRole");

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/").post(checkRole, createUser).get(checkRole, getAllUsers);
router.route("/:id").get(getUsers).put(updateUsers).delete(deleteUsers);

module.exports = router;
