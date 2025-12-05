import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCODpPZZTAutG5G3EyP-NxTPXJe3xcaWAo",
    authDomain: "minehat-cb34d.firebaseapp.com",
    databaseURL: "https://minehat-cb34d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "minehat-cb34d",
    storageBucket: "minehat-cb34d.firebasestorage.app",
    messagingSenderId: "66495178674",
    appId: "1:66495178674:web:a3e3ba8a1d0dcbd721e6ab",
    measurementId: "G-5J8EXZVG9H"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

let analytics;
if (typeof window !== 'undefined') {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, auth, analytics };
