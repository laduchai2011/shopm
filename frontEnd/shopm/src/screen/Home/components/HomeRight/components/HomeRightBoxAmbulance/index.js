import React, { useState } from 'react';
import './styles.css';

import { BiLoaderAlt } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';

import { $ } from 'utilize/Tricks';

const HomeRightBoxAmbulance = () => {

    const [state, setState] = useState({
        note: '',
        autoSelect: false
    })

    const handleCloseBox = (e) => {
        const q_box = $('.HomeRightBoxAmbulance');
        if (q_box.classList.contains('active')) {
            e.stopPropagation();
            q_box.classList.remove('active');
        }
    }

    const handleOpenBox = () => {
        const q_box = $('.HomeRightBoxAmbulance');
        if (!q_box.classList.contains('active')) {
            q_box.classList.add('active');
        }
    }

    const handleBox = () => {
        const q_overlay = $('.HomeRightBoxAmbulance-overlay');
        q_overlay.classList.add('active');
    }

    const handleCancleBox = () => {
        const q_overlay = $('.HomeRightBoxAmbulance-overlay');
        q_overlay.classList.remove('active');
    }

    return (
        <div className='HomeRightBoxAmbulance active' onClick={() => handleOpenBox()}>
            <div className='HomeRightBoxAmbulance-close'>
                <GrClose onClick={(e) => handleCloseBox(e)} />
            </div>
            <div className='HomeRightBoxAmbulance-header'>
                Box Ambulance
            </div>
            <div className='HomeRightBoxAmbulance-note'>
                <span>Note</span>
                <input value={state.note} onChange={(e) => setState({...state, note: e.target.value})} />
            </div>
            <div className='HomeRightBoxAmbulance-options'>
                <div>
                    <input id='HomeRightBoxAmbulance-options-autoSelect' type='checkbox' checked={state.autoSelect} onChange={() => setState({...state, autoSelect: !state.autoSelect})} />
                    <label htmlFor="HomeRightBoxAmbulance-options-autoSelect">Auto select !</label>
                </div>
            </div>
            <div className='HomeRightBoxAmbulance-book'>
                <button onClick={() => handleBox()}>Book</button>
            </div>
            <div className='HomeRightBoxAmbulance-overlay'>
                <div>
                    <BiLoaderAlt size={50} color='white' />
                    <button onClick={() => handleCancleBox()}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default HomeRightBoxAmbulance;