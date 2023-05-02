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

mongoose
  .connect(
    "mongodb+srv://withsjb:as7170882@cluster0.ub4j94d.mongodb.net/?retryWrites=true&w=majority",
    {}
  )
  .then(() => {
    console.log("DB Connection Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true,
  })
);

app.use(morgan("tiny"));
app.use(express.json());
config();

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
