const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Хэрэглэгчийн нэрийг заавал оруул"],
  },
  profileImg: String,
  password: String,
  email: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  },
  phone: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const user = mongoose.model("User", UserSchema);

module.exports = user;
