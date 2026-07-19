import express from "express";

import { exportPDF }

from "../controllers/reportController.js";

const router=express.Router();

router.post("/pdf",exportPDF);

export default router;