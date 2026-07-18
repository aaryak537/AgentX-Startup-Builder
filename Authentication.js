import { admin } from "../config/firebase.js";

export async function verifyUser(req, res, next) {

    try {

        const token = req.headers.authorization?.split("Bearer ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const decoded = await admin.auth().verifyIdToken(token);

        req.user = decoded;

        next();

    } catch {

        res.status(401).json({
            message: "Invalid Token"
        });
    }

}