import './App.css';

import Router from './Router';
// import Overlay from './screen/Overlay';
import ClickDocument from './utilize/ClickDocument';
import { ThemeContextApp } from './utilize/ContextApp';
// import { initFirebase } from 'config/firebase';


function App() {
    
    // initFirebase();

    const clickDocument = new ClickDocument();
    clickDocument.start();
    return (
        <ThemeContextApp.Provider value={ clickDocument }>
            <div className="App">
                <Router />
                {/* <Overlay /> */}
            </div>
        </ThemeContextApp.Provider>
    );
}

export default App;
