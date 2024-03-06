import React, { memo, useEffect } from 'react';
import './styles.css';

import { useDispatch, useSelector } from 'react-redux';

import { 
    setMenuStatus,
    setProviderStatus 
} from 'reduxStore/slice/headerSlice';

import { $ } from 'utilize/Tricks';

const HeaderOverlay = () => {
    const dispatch = useDispatch();
    const overlayStatus = useSelector(state => state.headerSlice.overlayStatus);

    useEffect(() => {
        const q_HeaderOverlay = $('.HeaderOverlay');
        if (overlayStatus) {
            q_HeaderOverlay.classList.add('show');
        } else {
            q_HeaderOverlay.classList.remove('show');
        }
    }, [overlayStatus])

    const handleRemoveOverlay = () => {
        dispatch(setMenuStatus({menuStatus: 'off', overlayStatus: false}));
        dispatch(setProviderStatus({providerStatus: 'off', overlayStatus: false}))
    }

    return (
        <div className='HeaderOverlay' onClick={() => handleRemoveOverlay()}>
            
        </div>
    )
}

export default memo(HeaderOverlay);