// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUFCCtuiGQm7RkjoO5hrp93LisBrk9T2A",
    authDomain: "fir-update-4730b.firebaseapp.com",
    projectId: "fir-update-4730b",
    storageBucket: "fir-update-4730b.appspot.com",
    messagingSenderId: "489691183478",
    appId: "1:489691183478:web:9bc5ce8254055e583e2257"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;