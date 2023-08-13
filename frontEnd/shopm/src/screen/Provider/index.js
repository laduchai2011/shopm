import React, { useState } from "react";
import './styles.css';

import { useParams } from "react-router-dom";

import { ProviderContext } from "screen/Provider/utilize/ProviderContext";

import Header from "../Header";
import ProviderHeader from "./components/ProviderHeader";
import ProviderTop from "./components/ProviderTop";
import ProviderBottom from "./components/ProviderBottom";
import ProviderFooter from "./components/ProviderFooter";

const Provider = () => {
    const uuid_provider = useParams().id; 
    const [getProvider, setGetprovider] = useState(false);
    const providerStore = {
        uuid_provider: uuid_provider,
        setGetprovider: setGetprovider
    }
    
    return (
        <div className="Provider">
            <Header />
            <ProviderContext.Provider value={providerStore}>
                <div className="Provider-main">
                    {getProvider && <ProviderHeader />}
                    <ProviderTop />
                    {getProvider && <ProviderBottom />}
                </div>
            </ProviderContext.Provider>
            <ProviderFooter />
        </div>
    )
}

export default Provider;