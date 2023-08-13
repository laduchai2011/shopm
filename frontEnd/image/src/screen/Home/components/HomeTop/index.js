import React from "react";
import './styles.css';

import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillMicFill } from 'react-icons/bs';


const HomeTop = () => {
    return (
        <div className="HomeTop">
            <div className="serachContainer">
                <input placeholder="Search" />
                <AiOutlineSearch size={20} />
                <BsFillMicFill size={20} />
            </div>
            <div className="serachContainer-id">
                <input placeholder="Select Id" />
                <select id="selectId">
                    <option value="select">Select</option>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                </select>
            </div>
            <div className="serachContainer-tag">
                <input placeholder="Select tag name" />
                <select id="selectTag">
                    <option value="select">Select</option>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                </select>
            </div>
        </div>
    )
}

export default HomeTop;