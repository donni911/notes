import { Router } from "express";
import {
  registerNewUser,
  loginUser,
  getUserDetails,
} from "../controllers/user-controllers.js";
import authConfig from "../middleware/auth.config.js";

const router = Router();

// Register route
router.post("/register", registerNewUser);
// Login route
router.post("/login", loginUser);
// Get user info
router.get("/me", authConfig, getUserDetails);

export default router;
