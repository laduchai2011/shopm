import React from "react";
import './styles.css';

import Header from "screen/Header";
import HomeTop from "./components/HomeTop";
import HomeBottom from "./components/HomeBottom";

const Home = () => {
    return (
        <div className="Home">
            <Header index={ 0 }/>
            <HomeTop />
            <HomeBottom />
        </div>
    )
}

export default Home;