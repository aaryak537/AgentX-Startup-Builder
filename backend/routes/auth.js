// routes/auth.js

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// =============================
// Generate JWT Token
// =============================
const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET || "agentx_secret_key",
        { expiresIn: "7d" }
    );
};

// =============================
// SIGNUP
// POST /api/auth/signup
// =============================
router.post("/signup", async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields."
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            startups: []
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: "Account created successfully.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

// =============================
// LOGIN
// POST /api/auth/login
// =============================
router.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password required."
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        const match = await bcrypt.compare(
            password,
            user.password
        );

        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password."
            });
        }

        const token = generateToken(user._id);

        res.json({

            success: true,

            message: "Login Successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

});

// =============================
// AUTH MIDDLEWARE
// =============================
const verifyToken = (req, res, next) => {

    const bearer = req.headers.authorization;

    if (!bearer) {

        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });

    }

    const token = bearer.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "agentx_secret_key"
        );

        req.user = decoded;

        next();

    } catch (err) {

        res.status(401).json({
            success: false,
            message: "Invalid Token"
        });

    }

};

// =============================
// PROFILE
// GET /api/auth/profile
// =============================
router.get("/profile", verifyToken, async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
            .select("-password");

        res.json({
            success: true,
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

// =============================
// EXPORT
// =============================
module.exports = router;