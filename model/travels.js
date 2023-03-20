const mongoose = require("mongoose");

const TravelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  travelImg: String,
  detail: String,
  price: String,
  location: String,
  day: Number,
});

const travel = mongoose.model("Travel", TravelSchema);

module.exports = travel;
