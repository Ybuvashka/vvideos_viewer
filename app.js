const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require('path');
const cors = require("cors");
require("express-async-errors");
const multer = require("multer")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const coverId = req.params._id || req.body._id;
    const dir = path.join("uploads", coverId);
    
    // Створюємо папку, якщо її ще немає
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
const app = express();


dotenv.config();

const port = process.env.PORT || 8000;

//routers
const fileRouter = require("./routes/file.routes.js");
const userRouter = require("./routes/user.routes.js");
const authRouter = require("./routes/auth.routes.js");
const coverRouter = require("./routes/cover.routes.js");

//middlewares
const authenticateUser = require("./middleware/auth.middleware.js");

app.use(cors());
app.use(fileUpload({}));
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use((req, res, next) => {
  if (req.url.endsWith('.mp4')) {
    res.setHeader('Content-Type', 'video/mp4');
  }
  next();
});

app.use("/api/upload", fileRouter);
app.use("/api/covers", coverRouter);
app.use("/api/users", authenticateUser, userRouter);
app.use("/api/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log("app starts on port", port);
    });
    if (!fs.existsSync(process.env.FILE_PATH)) {
      fs.mkdirSync(process.env.FILE_PATH, { recursive: true });
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
