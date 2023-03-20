const express = require("express");
const {
  createUser,
  getAllUsers,
  getUsers,
  updateUsers,
  deleteUsers,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").post(createUser).get(getAllUsers);
router.route("/:id").get(getUsers).put(updateUsers).delete(deleteUsers);

module.exports = router;
