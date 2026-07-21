require("dotenv").config();
const codeRoutes = require("./routes/code");
const retryAgent = require("./agents/retryAgent");
const express = require("express");
const cors = require("cors");
const path = require("path");
const chatbotRoutes = require("./routes/chatbotRoutes");

const app = express();

app.use("/api/code", codeRoutes);
app.use("/api", chatbotRoutes);
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

const FRONTEND = path.join(__dirname, "..");

app.use(express.static(FRONTEND));

app.get("/", (req, res) => {
    res.sendFile(path.join(FRONTEND, "index.html"));
});
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        status: "running",
        service: "AgentX Backend",
        time: new Date()
    });
});
app.use((err, req, res, next) => {
    console.error("=== SERVER ERROR ===");
    console.error(err.stack || err);

    res.status(500).json({
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV !== "production" ? err.stack : undefined
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