require("dotenv").config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// ===============================
// Middleware
// ===============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// Serve Frontend
// ===============================
app.use(express.static(path.join(__dirname, "../frontend")));

// ===============================
// Routes
// ===============================
const authRoutes = require("./routes/auth");
const startupRoutes = require("./routes/startup");
const agentRoutes = require("./routes/agents");
const exportRoutes = require("./routes/export");

app.use("/api/auth", authRoutes);
app.use("/api/startup", startupRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/export", exportRoutes);

// ===============================
// Home Route
// ===============================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ===============================
// 404
// ===============================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// ===============================
// Error Handler
// ===============================
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("==================================");
    console.log(`🚀 AgentX Server Running`);
    console.log(`🌐 http://localhost:${PORT}`);
    console.log("==================================");
});