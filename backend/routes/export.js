const express = require("express");
const router = express.Router();

const pdf = require("../exports/pdf");
const ppt = require("../exports/ppt");
const excel = require("../exports/excel");

// PDF Export
router.post("/pdf", async (req, res) => {
    try {
        const file = await pdf.generate(req.body);

        res.json({
            success: true,
            file
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "PDF export failed."
        });
    }
});

// PPT Export
router.post("/ppt", async (req, res) => {
    try {
        const file = await ppt.generate(req.body);

        res.json({
            success: true,
            file
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "PPT export failed."
        });
    }
});

// Excel Export
router.post("/excel", async (req, res) => {
    try {
        const file = await excel.generate(req.body);

        res.json({
            success: true,
            file
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Excel export failed."
        });
    }
});

module.exports = router;