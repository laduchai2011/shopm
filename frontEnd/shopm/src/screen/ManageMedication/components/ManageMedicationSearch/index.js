import React from "react";
import './styles.css';

import { GrSearch, GrMicrophone } from 'react-icons/gr';

const ManageMedicationSearch = () => {
    return (
        <div className='ManageMedicationSearch'>
            <div className='ManageMedicationSearch-inputContainer'>
                <input placeholder="Search" />
                <GrMicrophone size={20} />
                <GrSearch size={20} />
            </div>
        </div>
    )
}

export default ManageMedicationSearch;