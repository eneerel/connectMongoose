const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoriesController");
const checkRole = require("../utils/checkrRole");

const router = express.Router();

router.route("/").post(checkRole, createCategory).get(getAllCategories);
router
  .route("/:id")
  .get(checkRole, getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
