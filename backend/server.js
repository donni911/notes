import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { default as taskRoutes } from "./routes/task-routes.js";
import { default as userRoutes } from "./routes/user-routes.js";

dotenv.config();

const PORT = process.env.PORT || 4001;
const URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/adventure-notes";

const app = express();
app.use(cors());
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(taskRoutes);
app.use(userRoutes);

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
