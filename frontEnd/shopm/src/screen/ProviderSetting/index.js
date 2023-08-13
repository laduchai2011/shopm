import React from "react";
import './styles.css';

import Header from "screen/Header";
import HeaderProviderSetting from "./components/HeaderProviderSetting";
import BodyProviderSetting from "./components/BodyProviderSetting";

const ProviderSetting = () => {

    return (
        <div className="ProviderSetting">
            <Header />
            <HeaderProviderSetting index={ 0 } />
            <BodyProviderSetting />
        </div>
    )
}

export default ProviderSetting;