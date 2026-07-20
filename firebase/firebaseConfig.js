import {
    initializeApp,
    getApps,
    getApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA4SFEmlQkui5rCTil6jHwH2JHeyyc3BI8",
    authDomain: "startup-builder-ea49c.firebaseapp.com",
    projectId: "startup-builder-ea49c",
    storageBucket: "startup-builder-ea49c.firebasestorage.app",
    messagingSenderId: "1029500287535",
    appId: "1:1029500287535:web:e9cf8100efb96c6674a4da"
};

const app = getApps().length
    ? getApp()
    : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;