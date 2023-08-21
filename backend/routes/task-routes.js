import { Router } from "express";
import {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
} from "../controllers/task-controller.js";

const router = Router();

router.get("/tasks", getTasks);
// router.get("/tasks", getTasksByParams);
router.post("/tasks", addTask);
router.delete("/tasks/:id", deleteTask);
router.patch("/tasks/:id", updateTask);

export default router;
