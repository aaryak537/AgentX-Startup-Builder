const express = require("express");
const router = express.Router();

const orchestrator = require("../agents/orchestrator");

// Run all AI agents
router.post("/generate", async (req, res) => {
    try {
        const { startupIdea } = req.body;

        if (!startupIdea) {
            return res.status(400).json({
                success: false,
                message: "Startup idea is required."
            });
        }

        const result = await orchestrator.generateStartup(startupIdea);

        res.json({
            success: true,
            data: result
        });

    } catch (error) {
        console.error("Agent Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to generate startup plan.",
            error: error.message
        });
    }
});

// Health Check
router.get("/status", (req, res) => {
    res.json({
        success: true,
        status: "Agent service is running."
    });
});

module.exports = router;