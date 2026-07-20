const express = require("express");
const router = express.Router();

const pdf = require("../exports/pdf");

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

module.exports = router;