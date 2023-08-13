import React from 'react';
import './styles.css';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import { FaInfoCircle } from 'react-icons/fa';

const MedicationAddToastMessage = () => {
    return (
        <div className='MedicationAddToastMessage'>
            <div className='MedicationAddToastMessage-iconContainer'>
                <FaInfoCircle size={25} color='red' />
                <AiOutlineLoading3Quarters size={25} color='greenyellow' />
                <TiTick size={25} color='blue' />
            </div>
            <div className='MedicationAddToastMessage-text'></div>
        </div>
    )
}

export default MedicationAddToastMessage;