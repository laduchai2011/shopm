import React from "react";
import './styles.css';

import ProviderBottomAbout from "./components/ProviderBottomAbout";
import ProviderBottomProduct from "./components/ProviderBottomProduct";
import ProviderBottomNews from "./components/ProviderBottomNews";

const ProviderBottom = () => {
    return (
        <div className="ProviderBottom">
            <ProviderBottomAbout />
            <ProviderBottomProduct />
            <ProviderBottomNews />
        </div>
    )
}

export default ProviderBottom;