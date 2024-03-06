import React, { memo, useEffect } from 'react';
import './styles.css';

import { useDispatch, useSelector } from 'react-redux';

import { CiCircleRemove } from "react-icons/ci";

import { setProviderStatus } from 'reduxStore/slice/headerSlice';

import { $ } from 'utilize/Tricks';

const HeaderProviderDialog = () => {
    const dispatch = useDispatch();

    const providerStatus = useSelector(state => state.headerSlice.providerStatus);

    useEffect(() => {
        const q_HeaderMenu = $('.HeaderProviderDialog');
        if (providerStatus==='on') {
            q_HeaderMenu.classList.add('show');
        }
        if (providerStatus==='off') {
            q_HeaderMenu.classList.remove('show');
        }
    }, [providerStatus])

    const list_provider = [1,2,3,4,5].map((index, data) => {
        return (
            <div className='HeaderProviderDialog-providerContainer' key={ index }>
                <input type='checkbox' />
                <img src='https://tse3.mm.bing.net/th?id=OIP.nY6QFviNI2QewDU9Lx00yQHaE_&pid=Api&P=0&h=220' alt='' />
                <span>Name Name Name Name Name Name Name Name Name Name Name Name Name</span>
            </div>
        )
    })

    return (
        <div className='HeaderProviderDialog'>
            <div className='HeaderProviderDialog-top'>
                <strong>Provider</strong>
                <CiCircleRemove onClick={() => dispatch(setProviderStatus({providerStatus: 'off', overlayStatus: false}))} size={ 25 } />
            </div>
            <div className='HeaderProviderDialog-body'>
                { list_provider }
            </div>
        </div>
    )
}

export default memo(HeaderProviderDialog);