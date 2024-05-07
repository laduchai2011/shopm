import React, { useEffect } from 'react';
import './styles.css';

import { useSelector, useDispatch } from "react-redux";

import { MdError } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { TiTick } from "react-icons/ti";

import { 
    setToastMessageRT 
} from 'reduxStore/slice/registerProviderSlice';

import { $ } from 'utilize/Tricks';

const RegisterProviderToastMessage = () => {

    const dispatch = useDispatch();

    const toastMessage = useSelector(state => state.registerProvider.toastMessage);

    useEffect(() => {
        const q_RegisterProviderToastMessage = $('.RegisterProviderToastMessage');
        if (toastMessage?.show) {
            q_RegisterProviderToastMessage.classList.add('show');
        } else {
            q_RegisterProviderToastMessage.classList.remove('show');
        }
    }, [toastMessage?.show]) 

    const handleOke = () => {
        dispatch(setToastMessageRT({
            type: '',
            message: '',
            show: false
        }))
    }

    return (
        <div className='RegisterProviderToastMessage'>
            <div>
                { toastMessage?.type==='error' && <MdError size={ 25 } color='red' />}
                { toastMessage?.type==='warning' && <IoIosWarning size={ 25 } color='yellow' />}
                { toastMessage?.type==='success' && <TiTick size={ 25 } color='greenyellow' />}
            </div>
            <div>{ toastMessage?.message }</div>
            <div>
                <button onClick={() => handleOke()}>Oke</button>
            </div>
        </div>
    )
}

export default RegisterProviderToastMessage;