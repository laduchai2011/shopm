import React, { useState } from 'react';
import './styles.css';

import { BiLoaderAlt } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';

import { $ } from 'utilize/Tricks';

const HomeRightBoxExamine = () => {

    const [state, setState] = useState({
        option: 'all',
        note: '',
        autoSelect: false
    })

    const handleCloseBox = (e) => {
        const q_box = $('.HomeRightBoxExamine');
        if (q_box.classList.contains('active')) {
            e.stopPropagation();
            q_box.classList.remove('active');
        }
    }

    const handleOpenBox = () => {
        const q_box = $('.HomeRightBoxExamine');
        if (!q_box.classList.contains('active')) {
            q_box.classList.add('active');
        }
    }

    const handleBox = () => {
        const q_overlay = $('.HomeRightBoxExamine-overlay');
        q_overlay.classList.add('active');
    }

    const handleCancleBox = () => {
        const q_overlay = $('.HomeRightBoxExamine-overlay');
        q_overlay.classList.remove('active');
    }

    return (
        <div className='HomeRightBoxExamine active' onClick={() => handleOpenBox()}>
            <div className='HomeRightBoxExamine-close'>
                <GrClose onClick={(e) => handleCloseBox(e)} />
            </div>
            <div className='HomeRightBoxExamine-header'>
                Box Examine
            </div>
            <div className='HomeRightBoxExamine-options'>
                <div>
                    <input id='HomeRightBoxExamine-options-all' type='checkbox' checked={state.option === 'all'} onChange={() => setState({...state, option: 'all'})} />
                    <label htmlFor="HomeRightBoxExamine-options-all">All</label>
                </div>
                <div>
                    <input id='HomeRightBoxExamine-options-online' type='checkbox' checked={state.option === 'online'} onChange={() => setState({...state, option: 'online'})} />
                    <label htmlFor="HomeRightBoxExamine-options-online">Online</label>
                </div>
                <div>
                    <input id='HomeRightBoxExamine-options-surgery' type='checkbox' checked={state.option === 'surgery'} onChange={() => setState({...state, option: 'surgery'})} />
                    <label htmlFor="HomeRightBoxExamine-options-surgery">Surgery</label>
                </div>
            </div>
            <div className='HomeRightBoxExamine-note'>
                <span>Note</span>
                <input value={state.note} onChange={(e) => setState({...state, note: e.target.value})} />
            </div>
            <div className='HomeRightBoxExamine-options'>
                <div>
                    <input id='HomeRightBoxExamine-options-autoSelect' type='checkbox' checked={state.autoSelect} onChange={() => setState({...state, autoSelect: !state.autoSelect})} />
                    <label htmlFor="HomeRightBoxExamine-options-autoSelect">Auto select !</label>
                </div>
            </div>
            <div className='HomeRightBoxExamine-book'>
                <button onClick={() => handleBox()}>Book</button>
            </div>
            <div className='HomeRightBoxExamine-overlay'>
                <div>
                    <BiLoaderAlt size={50} color='white' />
                    <button onClick={() => handleCancleBox()}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default HomeRightBoxExamine;