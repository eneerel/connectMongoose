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
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

const travel = mongoose.model("Travel", TravelSchema);

module.exports = travel;
