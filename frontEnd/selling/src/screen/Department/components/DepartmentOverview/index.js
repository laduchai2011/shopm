import React, { memo } from 'react';
import './styles.css';

import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import { IoAdd } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";

import { baseURL_shopm } from 'config/server';

const DepartmentOverView = () => {
    const navigate = useNavigate();

    const selectedProvider = useSelector(state => state.providerSlice.selectedProvider);

    const handleDepartmentGroupCreate = () => {
        navigate('/departmentGroup/create');
    }

    const handleDepartmentSetup = () => {
        navigate('/department/setup');
    }

    const handleCreateMedication = () => {
        if (selectedProvider) {
            window.location.href = `${baseURL_shopm}/provider/${selectedProvider.uuid_provider}/addMedication`;
        }
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
            <div>
                <div>Add a medication</div>
                <div onClick={() => handleCreateMedication()}><IoAdd size={ 50 } color='greenyellow' /></div>
            </div>
        </div>
    )
}

export default memo(DepartmentOverView);