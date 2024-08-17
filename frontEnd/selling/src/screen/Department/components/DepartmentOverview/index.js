import React, { memo } from 'react';
import './styles.css';

import { useNavigate } from "react-router-dom";

import { IoAdd } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";

const DepartmentOverView = () => {

    const navigate = useNavigate();

    const handleDepartmentGroupCreate = () => {
        navigate('/departmentGroup/create');
    }

    const handleDepartmentSetup = () => {
        navigate('/department/setup');
    }

    return (
        <div className='DepartmentOverView'>
            <div>
                <div>Department have most turnover</div>
                <div>1.000.000 $</div>
            </div>
            <div>
                <div>Department have most medications</div>
                <div>1.000</div>
            </div>
            <div>
                <div>Create a department group</div>
                <div onClick={() => handleDepartmentGroupCreate()}><IoAdd size={ 50 } color='greenyellow' /></div>
            </div>
            <div>
                <div>Custom a department</div>
                <div onClick={() => handleDepartmentSetup()}><CiSettings size={ 50 } color='gray' /></div>
            </div>
        </div>
    )
}

export default memo(DepartmentOverView);