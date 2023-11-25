import React, { memo, useState } from "react";
import './styles.css';

import { TiDelete } from "react-icons/ti";
import { CiEdit } from 'react-icons/ci';

import { $ } from "utilize/Tricks";

const MedicationTableEdit = () => {

    const [medication, setMedication] = useState({
        index: 1,
        uid: 'asfasfsad',
        name: 'name fasfda',
        amount: 123,
        note: 'asfasfdgdfg'
    });

    const [noti, setNoti] = useState();

    const removeShowTableEditMedication = () => {
        const q_medicationEdit = $('.MedicationTableEdit');
        q_medicationEdit.classList.remove('show');
    }

    const handleAmount = (e) => {
        const value = e.target.value;
        if (isNaN(value)) {
            setNoti('Amount must is number');
        } else {
            setMedication(pre => {
                return {
                    ...pre,
                    amount: Number(value)
                }
            })
        }
    }

    const handleNote = (e) => {
        const value = e.target.value;
        setMedication(pre => {
            return {
                ...pre,
                note: value
            }
        })
    }

    return (
        <div className="MedicationTableEdit" onClick={() => removeShowTableEditMedication()}>
            <div onClick={(e) => e.stopPropagation()}>
                <div>
                    <CiEdit size={ 25 } color="green" />
                    <TiDelete onClick={() => removeShowTableEditMedication()} size={ 25 } />
                </div>
                <div>
                    <strong>Index:</strong>
                    <span>: { medication.index }</span>
                </div>
                <div>
                    <strong>Uid:</strong>
                    <span>: { medication.uid }</span>
                </div>
                <div>   
                    <strong>Name:</strong>
                    <span>: { medication.name }</span>
                </div>
                <div>
                    <strong>Amount:</strong>
                    <span>: <input value={ medication.amount } onChange={(e) => handleAmount(e)} /></span>
                    <button>Check</button>
                    <button>Go</button>
                </div>
                <div>
                    <strong>Note:</strong>
                    <span>: <textarea value={ medication.note } onChange={(e) => handleNote(e)} /></span>
                </div>
                <div>
                    { noti }
                </div>
                <div>
                    <button>Oke</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default memo(MedicationTableEdit);