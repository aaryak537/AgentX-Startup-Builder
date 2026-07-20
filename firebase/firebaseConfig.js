// firebaseConfig.js

// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Replace these values with your Firebase project's configuration
const firebaseConfig = {
    projectId: "startup-builder-ea49c",
    messagingSenderId: "1029500287535",
    appId: "1:1029500287535:web:e9cf8100efb96c6674a4da"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Export for use in other files
export { app, auth, db };