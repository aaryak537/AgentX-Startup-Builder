const express = require("express");
const router = express.Router();

const orchestrator = require("../agents/orchestrator");

// Generate complete startup
router.post("/generate", async (req, res) => {
    try {
        const { idea } = req.body;

        if (!idea) {
            return res.status(400).json({
                success: false,
                message: "Startup idea is required."
            });
        }

        const result = await orchestrator.generateStartup(idea);

        res.json({
            success: true,
            data: result
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "AI generation failed."
        });
    }
});

module.exports = router;