// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCS2s7GzBGZ4-yKJ_q4d-vdqDNZQpD8M70",
    authDomain: "gt-webdev-website.firebaseapp.com",
    projectId: "gt-webdev-website",
    storageBucket: "gt-webdev-website.appspot.com",
    messagingSenderId: "562784179730",
    appId: "1:562784179730:web:37e4b2c5ea06f7f5e26acb",
    measurementId: "G-1QX4LKFHCS"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
