
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    // apiKey: "AIzaSyC83-M1Tz0nqoyorZVlrLhAbIjUYpAW_8g",
    // authDomain: "shopm-70ee1.firebaseapp.com",
    // projectId: "shopm-70ee1",
    // storageBucket: "shopm-70ee1.appspot.com",
    // messagingSenderId: "96127932305",
    // appId: "1:96127932305:web:bcf35f84a2a051b8feac30",
    // measurementId: "G-9LM77D0PET"
    apiKey: "AIzaSyDQAhwt3o-q8geqz-aH3cviIP8BIrHotoU",
    authDomain: "shopm-64c93.firebaseapp.com",
    projectId: "shopm-64c93",
    storageBucket: "shopm-64c93.appspot.com",
    messagingSenderId: "249909556971",
    appId: "1:249909556971:web:5e14f26f8a002e313770ae",
    measurementId: "G-1HN6XGRMWX"
};

// Initialize Firebase
export const initFirebase = () => {
    return initializeApp(firebaseConfig);
} 