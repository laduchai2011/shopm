import React from "react";
import './styles.css';

import Header from "screen/Header";

const DepartmentGroupSetup = () => {

    return (
        <div className="DepartmentGroupSetup">
            <Header />
            <div className='DepartmentGroupCreate-main'>
                <div className='DepartmentGroupCreate-center'>
                    <button>Create a new depatment Group</button>
                    <p></p>
                    <br />
                    <strong>OR</strong>
                    <br />
                    <h3>Custom old Group</h3>
                    <button>Custom a new depatment Group</button>
                </div>
            </div>
        </div>
    )
}

export default DepartmentGroupSetup;