const express = require("express");
const admin = require("firebase-admin");

const router = express.Router();

/**
 * Verify Firebase ID Token
 */
router.post("/verify", async (req, res) => {
    try {
        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({
                success: false,
                message: "ID Token is required"
            });
        }

        const decodedToken = await admin.auth().verifyIdToken(idToken);

        res.json({
            success: true,
            uid: decodedToken.uid,
            email: decodedToken.email,
            name: decodedToken.name || "",
            message: "User verified successfully"
        });

    } catch (err) {
        console.error(err);

        res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
});

/**
 * Get User Details
 */
router.get("/user/:uid", async (req, res) => {
    try {
        const user = await admin.auth().getUser(req.params.uid);

        res.json({
            success: true,
            user
        });

    } catch (err) {
        console.error(err);

        res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
});

/**
 * Health Check
 */
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Authentication API Running"
    });
});

module.exports = router;