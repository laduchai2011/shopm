import React from 'react';
import './styles.css';

import { TfiArrowsHorizontal } from 'react-icons/tfi';

import { $ } from 'utilize/Tricks';

const HomeLeft = () => {

    const handleShow = () => {
        const q_HomeLeft = $('.HomeLeft');
        q_HomeLeft.classList.toggle('active');
    }

    return (
        <div className='HomeLeft active'>
            <div className='HomeLeft-main'>
                <div className='HomeLeft-providerContainer'>
                    <div className='HomeLeft-providerContainer-header'>Provider</div>
                    <div className='HomeLeft-providerContainer-list'>
                        <div>fsdfsdg</div>
                        <div>fsdfsdg</div>
                        <div>fsdfsdg</div>
                        <div>fsdfsdg</div>
                        <div>fsdfsdg</div>
                        <div>fsdfsdg</div>
                        <div>fsdfsdg</div>
                    </div>
                </div>
                <div className='HomeLeft-hospitalContainer'>
                    <div className='HomeLeft-hospitalContainer-header'>Hospital</div>
                    <div className='HomeLeft-hospitalContainer-list'>
                        <div>fsdfsdg</div>
                        <div>fsdfsdg</div>
                        <div>fsdfsdg</div>
                        <div>fsdfsdg</div>
                        <div>fsdfsdg</div>
                        <div>fsdfsdg</div>
                        <div>fsdfsdg</div>
                    </div>
                </div>
            </div>
            <TfiArrowsHorizontal size={25} onClick={() => handleShow()} />
        </div>
    )
}

export default HomeLeft;