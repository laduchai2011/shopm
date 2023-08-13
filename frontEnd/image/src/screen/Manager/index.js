import React from "react";
import './styles.css';

import Header from "screen/Header";
import ManagerTop from "./components/ManagerTop";
import ManagerBottom from "./components/ManagerBottom";
import ToastMessage from "./components/ToastMessage";

const Manager = () => {
    return (
        <div className="Manager">
            <div className="Manager-header">
                <Header index={ 1 }/>
            </div>
            <div className="Manager-ManagerTop">
                <ManagerTop />
            </div>
            <ManagerBottom />
            <ToastMessage />
        </div>
    )
}

export default Manager;