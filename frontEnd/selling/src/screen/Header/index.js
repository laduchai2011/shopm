import React, { memo } from 'react';
import './styles.css';

import { useDispatch } from 'react-redux';

import { AiOutlineMenu } from 'react-icons/ai';
import { IoIosMore } from "react-icons/io";

import HeaderOverlay from './components/HeaderOverlay';
import HeaderMenu from './components/HeaderMenu';
import HeaderProviderDialog from './components/HeaderProviderDialog';

import { 
    setMenuStatus,
    setProviderStatus 
} from 'reduxStore/slice/headerSlice';

const Header = () => {
    const dispatch = useDispatch();

    return (
        <div className='Header'>
            <div className='HeaderL'>
                <AiOutlineMenu onClick={() => dispatch(setMenuStatus({menuStatus: 'on', overlayStatus: true}))} />
                <p>SellingSHOPM</p>
            </div>
            <div className='HeaderR'>
                <strong>provider</strong>
                <IoIosMore onClick={() => dispatch(setProviderStatus({providerStatus: 'on', overlayStatus: true}))} size={ 30 } />
                <img src='http://thuthuatphanmem.vn/uploads/2018/09/11/hinh-anh-dep-62_044135376.jpg' alt='' />
            </div>
            <HeaderOverlay />
            <HeaderMenu />
            <HeaderProviderDialog />
        </div>
    )
}

export default memo(Header);