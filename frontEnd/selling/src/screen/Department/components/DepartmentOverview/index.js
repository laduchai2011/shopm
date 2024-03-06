import React, { memo } from 'react';
import './styles.css';

import { IoAdd } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";

const DepartmentOverView = () => {

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
                <div>Create a department</div>
                <div><IoAdd size={ 50 } color='greenyellow' /></div>
            </div>
            <div>
                <div>Custom a department</div>
                <div><CiSettings size={ 50 } color='gray' /></div>
            </div>
        </div>
    )
}

export default memo(DepartmentOverView);