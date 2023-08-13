import './App.css';

import Router from './Router';
import ClickDocument from './utilize/ClickDocument';
import { ThemeContextApp } from './utilize/ContextApp';


function App() {
    
    const clickDocument = new ClickDocument();
    clickDocument.start();
    return (
        <ThemeContextApp.Provider value={ clickDocument }>
            <div className="App">
                <Router />
            </div>
        </ThemeContextApp.Provider>
    );
}

export default App;
