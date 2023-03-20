const express = require("express");
const {
  createTravel,
  getAllTravel,
  getTravel,
  updateTravel,
  deleteTravel,
} = require("../controllers/travelController");

const router = express.Router();

router.route("/").post(createTravel).get(getAllTravel);
router.route("/:id").get(getTravel).put(updateTravel).delete(deleteTravel);

module.exports = router;
