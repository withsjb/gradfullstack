const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/AuthRoutes");
const app = express();
const cookieParser = require("cookie-parser");
const { config } = require("dotenv");
const morgan = require("morgan");

/** app port*/
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server connected to http://localhost:${port}`);
});

config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connection Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(morgan("tiny"));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
