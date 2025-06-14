import express from "express";
import { registerUser, loginUser,getCurrentUser, logoutUser } from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/me",authMiddleware,getCurrentUser)
export default router;
