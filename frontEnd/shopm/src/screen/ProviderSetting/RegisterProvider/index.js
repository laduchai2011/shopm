import React from "react";
import './styles.css';

import Header from "screen/Header";
import HeaderProviderSetting from "../components/HeaderProviderSetting";
import RegisterProviderHeader from "./components/RegisterProviderHeader";
import RegisterProviderBody from "./components/RegisterProviderBody";


const RegisterProvider = () => {
    return (
        <div className="RegisterProvider">
            <Header />
            <HeaderProviderSetting index={ 1 } />
            <div className="RegisterProvider-main">
                <RegisterProviderHeader index={ 0 } />
                <RegisterProviderBody />
            </div>
        </div>
    )
}

export default RegisterProvider;