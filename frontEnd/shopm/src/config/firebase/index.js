
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyC83-M1Tz0nqoyorZVlrLhAbIjUYpAW_8g",
    authDomain: "shopm-70ee1.firebaseapp.com",
    projectId: "shopm-70ee1",
    storageBucket: "shopm-70ee1.appspot.com",
    messagingSenderId: "96127932305",
    appId: "1:96127932305:web:bcf35f84a2a051b8feac30",
    measurementId: "G-9LM77D0PET"
};

// Initialize Firebase
export const initFirebase = () => {
    return initializeApp(firebaseConfig);
} 