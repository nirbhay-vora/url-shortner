import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getAllShortUrls } from "../controller/user.controller.js";
const router = express.Router();

router.post("/url",authMiddleware,getAllShortUrls);
export default router;
