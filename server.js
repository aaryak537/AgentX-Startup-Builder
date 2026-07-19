import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import startupRoutes from "./routes/startupRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/startup", startupRoutes);

app.get("/", (req, res) => {
    res.send("AgentX Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});