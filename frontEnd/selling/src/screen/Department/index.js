import React, { memo } from 'react';
import './styles.css';

import Header from 'screen/Header';
import DepartmentOverview from './components/DepartmentOverview';
import DepartmentChart from './components/DepartmentChart';
import DepartmentTable from './components/DepartmentTable';

const Department = () => {

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