const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const multer = require("multer");
const path = require("path");

const connectDB = require("./config/mongodb");
const logger = require("./middlewares/logger");
const cloudinary = require("./utils/cloudinary");

const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const travelRoutes = require("./routes/travelRoutes");
const { resourceUsage } = require("process");
const { resourceLimits } = require("worker_threads");

dotenv.config();

const PORT = process.env.PORT;
const dburi = process.env.DATABASE_URI;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const filename = Math.floor(Math.random() * 1_000_000).toString(16);
    cb(null, `${filename}${fileExt}`);
  },
});
const upload = multer({ storage: storage });

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);
app.use("/uploads", express.static("uploads"));

app.use("/users", userRoutes);
app.use("/category", categoryRoutes);
app.use("/travel", travelRoutes);
app.get("/", (req, res) => {
  res.json({ messege: "sain baina uu" });
  //   res.send("<h1>sain baina uu<h1>");
});
app.post("/uploads", upload.single("image"), async (req, res) => {
  console.log("Req", req.file);
  const result = await cloudinary.uploader.upload(req.file.path);
  res.status(200).json({
    messege: "amjilttai hadgallaa.",
    imgUrl: result,
  });
});

connectDB(dburi);

app.listen(PORT, () => {
  console.log(`server ${PORT} port deer aslaa`.rainbow);
});
