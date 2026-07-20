// ======================================================
// AgentX Startup Builder - Backend Server
// server.js
// ======================================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const startupRoutes = require("./routes/startup");
const agentRoutes = require("./routes/agents");
const exportRoutes = require("./routes/export");

const app = express();

// ======================================================
// Middleware
// ======================================================

app.use(cors());

app.use(express.json({
    limit: "20mb"
}));

app.use(express.urlencoded({
    extended: true
}));

// ======================================================
// Static Files (Optional)
// ======================================================

// If frontend is inside /public
app.use(express.static(path.join(__dirname, "public")));

// ======================================================
// API Routes
// ======================================================

app.use("/api/auth", authRoutes);

app.use("/api/startup", startupRoutes);

app.use("/api/agents", agentRoutes);

app.use("/api/export", exportRoutes);

// ======================================================
// Health Check
// ======================================================

app.get("/", (req, res) => {

    res.json({

        success: true,

        application: "AgentX Startup Builder",

        version: "1.0.0",

        status: "Running",

        message: "Backend Server is Live 🚀"

    });

});

// ======================================================
// 404 Handler
// ======================================================

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "API Route Not Found"

    });

});

// ======================================================
// Error Handler
// ======================================================

app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({

        success: false,

        message: "Internal Server Error",

        error: err.message

    });

});

// ======================================================
// Start Server
// ======================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log("=====================================");
    console.log("🚀 AgentX Backend Started");
    console.log("=====================================");
    console.log(`Server : http://localhost:${PORT}`);
    console.log(`Status : Running`);
    console.log("=====================================");

});