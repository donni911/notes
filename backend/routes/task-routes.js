import { Router } from "express";
import {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
} from "../controllers/task-controller.js";
import authConfig from "../middleware/auth.config.js";

const router = Router();

router.get("/tasks", authConfig, getTasks);
// router.get("/tasks", getTasksByParams);
router.post("/tasks", addTask);
router.delete("/tasks/:id", deleteTask);
router.patch("/tasks/:id", updateTask);

export default router;
