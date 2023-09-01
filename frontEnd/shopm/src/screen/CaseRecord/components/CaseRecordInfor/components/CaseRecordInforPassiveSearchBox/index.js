import React, { useState } from 'react';
import './styles.css';

import { TiDeleteOutline, TiDelete } from 'react-icons/ti';
import { MdAdd } from 'react-icons/md';

import { $ } from 'utilize/Tricks';

const CaseRecordInforPassiveSearchBox = () => {
    const [targetList, setTargetList] = useState([]);
    const [targetInput, setTargetInput] = useState('');

    const handleAddTarget = () => {
        if (targetInput.length > 0) {
            setTargetList(pre => [...pre, targetInput.trim()]);
        }
    }

    const handleRemoveTarget = (index) => {
        const cp_targetList = [...targetList];
        cp_targetList.splice(index, 1);
        setTargetList(cp_targetList);
    }

    const handleRemoveBox = () => {
        $('.CaseRecordInforPassiveSearchBox-overlay').classList.remove('active');
    }

    const list_target = targetList.map((data, index) => {
        return (
            <div key={index}>
                <span>{ data }</span>
                <TiDelete color='red' size={25} onClick={() => handleRemoveTarget(index)} />
            </div>
        )
    })

    return (
        <div className='CaseRecordInforPassiveSearchBox'>
            <div className='CaseRecordInforPassiveSearchBox-overlay'>
                <div className='CaseRecordInforPassiveSearchBox-box'>
                    <div><TiDeleteOutline size={30} onClick={() => handleRemoveBox()} /></div>
                    <h4>Add target</h4>
                    <div className='CaseRecordInforPassiveSearchBox-targetList'>
                        { list_target }
                    </div>
                    <div className='CaseRecordInforPassiveSearchBox-inputContainer'>
                        <input value={targetInput} onChange={(e) => setTargetInput(e.target.value)} />
                        <div onClick={() => handleAddTarget()}><MdAdd /> <span>Add</span></div>
                    </div>
                    <div className='CaseRecordInforPassiveSearchBox-begin'><button>Begin</button></div>
                </div>
            </div>
        </div>
    )
}

export default CaseRecordInforPassiveSearchBox;