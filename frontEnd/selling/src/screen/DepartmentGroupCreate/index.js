import React from 'react';
import './styles.css';

import { useNavigate } from "react-router-dom";

import Header from "screen/Header";

const DepartmentGroupCreate = () => {
    const navigate = useNavigate();

    return (
        <div className='DepartmentGroupCreate'>
            <Header />
            <div className='DepartmentGroupCreate-main'>
                <div className='DepartmentGroupCreate-center'>
                    <h3>Create Depatment Group</h3>
                    <div>
                        <p>Name:</p>
                        <input placeholder='Name' />
                    </div>
                    <div>
                        <p>Title:</p>
                        <input placeholder='Title' />
                    </div>
                    <button className='DepartmentGroupCreate-btnCreate'>Create</button>
                    <h4>If you have group, you can go to that group !</h4>
                    <button onClick={() => navigate('/departmentGroup/setup')}>Click to exist group to set up</button>
                </div>
            </div>
        </div>
    )
}

export default DepartmentGroupCreate;