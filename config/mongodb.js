const mongoose = require("mongoose");

const connectDB = async (dburi) => {
  try {
    await mongoose.connect(dburi);
    console.log("MongoDB tei holbogdloo".green);
  } catch (err) {
    console.log("MongoDB tei holbogdoh uyd aldaa garlaa".red, err);
  }
};

module.exports = connectDB;
