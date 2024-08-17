import React from 'react';
import './styles.css';

import { useNavigate } from "react-router-dom";

import Header from "screen/Header";

const DepartmentSetup = () => {
    const navigate = useNavigate();

    return (
        <div className='DepartmentSetup'>
            <Header />
            <div className='DepartmentSetup-main'>
                <div className='DepartmentSetup-center'>
                    <button onClick={() => navigate('/department/create')}>Create a department</button>
                    <br />
                    <button onClick={() => navigate('/department/edit')}>Edit a department</button>
                    <br />
                    <button onClick={() => navigate('/department/edit')}>Select a chest</button>
                </div>
            </div>
        </div>
    )
}

export default DepartmentSetup;