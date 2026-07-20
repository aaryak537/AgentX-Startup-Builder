const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const router = express.Router();

// AI Orchestrator
const orchestrator = require("../agents/orchestrator");

// ----------------------------------------------
// Database Folder
// ----------------------------------------------

const DATABASE_DIR = path.join(__dirname, "../database");
const DATABASE_FILE = path.join(DATABASE_DIR, "startups.json");

// Create database folder if missing
if (!fs.existsSync(DATABASE_DIR)) {
    fs.mkdirSync(DATABASE_DIR, { recursive: true });
}

// Create database file if missing
if (!fs.existsSync(DATABASE_FILE)) {
    fs.writeFileSync(DATABASE_FILE, JSON.stringify([], null, 2));
}

// ----------------------------------------------
// Helpers
// ----------------------------------------------

function loadDatabase() {
    try {
        const data = fs.readFileSync(DATABASE_FILE, "utf8");
        return JSON.parse(data);
    } catch (err) {
        console.error("Database Read Error:", err);
        return [];
    }
}

function saveDatabase(data) {
    fs.writeFileSync(
        DATABASE_FILE,
        JSON.stringify(data, null, 2),
        "utf8"
    );
}

function generateId() {
    return crypto.randomBytes(8).toString("hex");
}

function validatePrompt(prompt) {

    if (!prompt) {
        return "Prompt is required.";
    }

    if (typeof prompt !== "string") {
        return "Prompt must be text.";
    }

    if (prompt.trim().length < 10) {
        return "Prompt is too short.";
    }

    if (prompt.trim().length > 5000) {
        return "Prompt is too long.";
    }

    return null;
}

// ------------------------------------------------------
// POST /api/startup/generate
// ------------------------------------------------------

router.post("/generate", async (req, res) => {

    try {

        const { prompt, userId } = req.body;

        const validationError = validatePrompt(prompt);

        if (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError
            });
        }

        console.log("Generating Startup...");
        console.log(prompt);

        // --------------------------------------
        // Run AI Orchestrator
        // --------------------------------------

        const startupResult = await orchestrator.generate(prompt);

        const startup = {

            id: generateId(),

            createdAt: new Date().toISOString(),

            updatedAt: new Date().toISOString(),

            userId: userId || "guest",

            prompt,

            data: startupResult

        };

        const database = loadDatabase();

        database.push(startup);

        saveDatabase(database);

        return res.status(200).json({

            success: true,

            message: "Startup generated successfully.",

            startup

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to generate startup.",

            error: error.message

        });

    }

});
// ======================================================
// GET /api/startup/all
// Returns all startups
// ======================================================

router.get("/all", (req, res) => {

    try {

        const database = loadDatabase();

        database.sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );

        return res.status(200).json({

            success: true,

            total: database.length,

            startups: database

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Unable to fetch startups.",

            error: error.message

        });

    }

});


// ======================================================
// GET /api/startup/:id
// Get single startup
// ======================================================

router.get("/:id", (req, res) => {

    try {

        const id = req.params.id;

        const database = loadDatabase();

        const startup = database.find(item => item.id === id);

        if (!startup) {

            return res.status(404).json({

                success: false,

                message: "Startup not found."

            });

        }

        return res.status(200).json({

            success: true,

            startup

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Unable to fetch startup.",

            error: error.message

        });

    }

});


// ======================================================
// PUT /api/startup/update/:id
// Update startup
// ======================================================

router.put("/update/:id", (req, res) => {

    try {

        const id = req.params.id;

        const updates = req.body;

        const database = loadDatabase();

        const index = database.findIndex(item => item.id === id);

        if (index === -1) {

            return res.status(404).json({

                success: false,

                message: "Startup not found."

            });

        }

        database[index] = {

            ...database[index],

            ...updates,

            updatedAt: new Date().toISOString()

        };

        saveDatabase(database);

        return res.status(200).json({

            success: true,

            message: "Startup updated successfully.",

            startup: database[index]

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Unable to update startup.",

            error: error.message

        });

    }

});


// ======================================================
// DELETE /api/startup/delete/:id
// ======================================================

router.delete("/delete/:id", (req, res) => {

    try {

        const id = req.params.id;

        const database = loadDatabase();

        const filtered = database.filter(item => item.id !== id);

        if (filtered.length === database.length) {

            return res.status(404).json({

                success: false,

                message: "Startup not found."

            });

        }

        saveDatabase(filtered);

        return res.status(200).json({

            success: true,

            message: "Startup deleted successfully."

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Unable to delete startup.",

            error: error.message

        });

    }

});


// ======================================================
// GET /api/startup/search?q=
// ======================================================

router.get("/search/query", (req, res) => {

    try {

        const query = (req.query.q || "").toLowerCase().trim();

        if (!query) {

            return res.status(400).json({

                success: false,

                message: "Search query is required."

            });

        }

        const database = loadDatabase();

        const results = database.filter(item => {

            const prompt = (item.prompt || "").toLowerCase();

            const name =
                (item.data?.startupName || "").toLowerCase();

            const industry =
                (item.data?.industry || "").toLowerCase();

            return (
                prompt.includes(query) ||
                name.includes(query) ||
                industry.includes(query)
            );

        });

        return res.status(200).json({

            success: true,

            total: results.length,

            startups: results

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Search failed.",

            error: error.message

        });

    }

});


// ======================================================
// GET /api/startup/stats
// ======================================================

router.get("/stats/summary", (req, res) => {

    try {

        const database = loadDatabase();

        const stats = {

            totalStartups: database.length,

            today: database.filter(item => {

                const created =
                    new Date(item.createdAt).toDateString();

                const today =
                    new Date().toDateString();

                return created === today;

            }).length

        };

        return res.status(200).json({

            success: true,

            stats

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Unable to generate statistics.",

            error: error.message

        });

    }

});
module.exports = router;