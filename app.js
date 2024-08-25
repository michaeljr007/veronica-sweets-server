require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const cron = require("node-cron");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const multer = require("multer");

const { uploadImg } = require("./controllers/uploads");

// Middleware
app.use(express.json());
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

// Dummy API homepage
app.get("/", (req, res) => {
  res.send("<h1>Veronica Sweets Api</h1>");
});

// Routers
const userRouter = require("./routes/users");
const foodRouter = require("./routes/foods");
const notFound = require("./middleware/not-found");

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/foods", foodRouter);

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the folder to save uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }); // Initialize multer with storage configuration

app.post(
  "/api/v1/uploads",
  upload.fields([
    { name: "primaryImage", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  uploadImg
); // Apply multer middleware to the route

//not found
app.use(notFound);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to DB");

    app.listen(port, () => console.log(`Server listening ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
