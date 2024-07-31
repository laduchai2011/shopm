import React, { memo, useEffect } from 'react';
import './styles.css';

import { useNavigate } from 'react-router-dom';

import Header from 'screen/Header';
import DepartmentOverview from './components/DepartmentOverview';
import DepartmentChart from './components/DepartmentChart';
import DepartmentTable from './components/DepartmentTable';

import { getCookie } from 'auth/cookie';

const Department = () => {

    const navigate = useNavigate();

    // let selectedProvider = null;

    useEffect(() => {
        const selectedProviderCookie = getCookie('selectedProvider');
        if (selectedProviderCookie) {
            // selectedProvider = JSON.parse(selectedProviderCookie);
        } else {
            navigate('/firstProvider');
        }
    }, [navigate])

    return (
        <div className='Department'>
            <Header />
            <div className='Department-main'>
                <div className='Department-center'>
                    <h3>DEPARTMENT</h3>
                    <DepartmentOverview />
                    <DepartmentChart />
                    <DepartmentTable />
                </div>
            </div>
        </div>
    )
}

export default memo(Department);