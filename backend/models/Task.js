// Define task schema using mongoose
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  importanceLevel: {
    name: { type: String, required: true },
    priority: { type: String, required: true },
    priorityLevel: { type: Number, required: true },
  },
  starred: { type: Boolean, required: true },
  time: { type: String, required: true },
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
