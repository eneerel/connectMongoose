const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");

dotenv.config();

const connectDB = require("./config/mongodb");

const PORT = process.env.PORT;
const dburi = process.env.DATABASE_URI;

const app = express();

app.get("/", (req, res) => {
  res.json({ messege: "sain baina uu" });
  //   res.send("<h1>sain baina uu<h1>");
});

connectDB(dburi);

app.listen(PORT, () => {
  console.log(`server ${PORT} port deer aslaa`.rainbow);
});
