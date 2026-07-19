const admin = require("firebase-admin");

// Make sure db is initialized in your Firebase config
// const db = admin.firestore();
const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(require("./serviceAccountKey.json"))
});

const db = admin.firestore();

module.exports = { admin, db };
async function saveStartup(req, result) {
    try {
        const prompt = req.body.prompt;

        const docRef = await db.collection("startups").add({
            uid: req.user.uid,
            prompt: prompt,
            startupData: result,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        return {
            success: true,
            id: docRef.id
        };
    } catch (error) {
        console.error("Error saving startup:", error);
        throw error;
    }
}

module.exports = {
    saveStartup
};