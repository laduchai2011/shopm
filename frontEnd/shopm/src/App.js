import './App.css';

import Router from './Router';
// import Overlay from './screen/Overlay';
import ClickDocument from './utilize/ClickDocument';
import { ThemeContextApp } from './utilize/ContextApp';
// import { initFirebase } from 'config/firebase';

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { getCookie } from 'auth/cookie';



function App() {
    
    // initFirebase();
    // const firebaseConfig = {
    //     apiKey: "AIzaSyDQAhwt3o-q8geqz-aH3cviIP8BIrHotoU",
    //     authDomain: "shopm-64c93.firebaseapp.com",
    //     projectId: "shopm-64c93",
    //     storageBucket: "shopm-64c93.appspot.com",
    //     messagingSenderId: "249909556971",
    //     appId: "1:249909556971:web:5e14f26f8a002e313770ae",
    //     measurementId: "G-1HN6XGRMWX"
    // };
    
    // // Initialize Firebase
    // const app = initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);

    const clickDocument = new ClickDocument();
    clickDocument.start();

    const loginInforCookie = getCookie('loginInfor');
    let loginInfor = null;
    if (loginInforCookie) {
        loginInfor = JSON.parse(loginInforCookie);
    }

    return (
        <ThemeContextApp.Provider value={{clickDocument, loginInfor}}>
            <div className="App">
                <Router />
                {/* <Overlay /> */}
            </div>
        </ThemeContextApp.Provider>
    );
}

export default App;
