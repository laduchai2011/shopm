import React from "react";
import './styles.css';

import Header from "../Header";
import HomeTop from "./components/HomeTop";
import HomeBottom from "./components/HomeBottom";
import HomeLeft from "./components/HomeLeft";
import HomeRight from "./components/HomeRight";

const Home = () => {
    return (
        <div className="Home">
            <Header />
            <div className="Home-main">
                <div className="Home-left">
                    <HomeLeft />
                </div>
                <div className="Home-center">
                    <div className="Home-center1">
                        <HomeTop />
                        <HomeBottom />
                    </div>
                </div>
                <div className="Home-right">
                    <HomeRight />
                </div>
            </div>
        </div>
    )
}

export default Home;