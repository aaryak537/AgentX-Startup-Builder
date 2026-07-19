import express from "express";
import { generateStartup } from "../controllers/startupController.js";

const router = express.Router();

router.post("/generate", generateStartup);

export default router;