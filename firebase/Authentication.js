import { admin } from "../config/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseconfig.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);

        // Connect Login → Dashboard
        window.location.href = "dashboard.html";

    } catch (error) {
        alert(error.message);
    }
});

createUserWithEmailAndPassword(auth, email, password)

export const verifyUser = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization token missing."
            });
        }

        const token = authHeader.split("Bearer ")[1];

        const decodedToken = await admin.auth().verifyIdToken(token);

        req.user = decodedToken;

        next();

    } catch (error) {

        console.error("Authentication Error:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
    document.getElementById("signupForm").addEventListener("submit", signupUser);

async function signupUser(e) {
    e.preventDefault();

    // Signup logic here
}
};