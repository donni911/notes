import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Task from "./models/Task.js";

dotenv.config();

const PORT = process.env.PORT || 4001;
const URL = process.env.URL || "mongodb://localhost:27017";

console.log(process.env.PORT);

const app = express();

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
