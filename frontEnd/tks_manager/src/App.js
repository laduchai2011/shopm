// import React from "react";
import './App.css';

import Router from './Router';
import { ThemeContextApp } from 'utilize/ContextApp';

import { getCookie } from 'auth/cookie';

function App() {

  const loginInforCookie = getCookie('loginInforTKS');
    let loginInfor = null;
    if (loginInforCookie) {
      loginInfor = JSON.parse(loginInforCookie);
    }

  return (
    <ThemeContextApp.Provider value={{loginInfor}}>
      <Router />
    </ThemeContextApp.Provider>
  );
}

export default App;
