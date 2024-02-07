import React, { memo, useEffect, useState } from "react";
import './styles.css';

import { useSelector } from 'react-redux';

import { TiDelete } from "react-icons/ti";
import { CiEdit } from 'react-icons/ci';

import { 
    useEditCaseRecordMedicationsMutation
} from "reduxStore/RTKQuery/caseRecordRTKQuery";

import { $ } from "utilize/Tricks";

const MedicationTableEdit = ({ caseRecord }) => {
    // const dispatch = useDispatch();
    const current_caseRecordMedication = useSelector((state) => state.caseRecord.current_caseRecordMedication);
    const index = useSelector((state) => state.caseRecord.index);

    const [editCaseRecordMedications] = useEditCaseRecordMedicationsMutation();

    const [medication, setMedication] = useState({
        index: 1,
        uuid_caseRecordMedication: 'asfasfsad',
        name: 'name fasfda',
        amount: 123,
        note: 'asfasfdgdfg'
    });

    const [noti, setNoti] = useState();

    useEffect(() => {
        if (current_caseRecordMedication!==null) {
            setMedication(current_caseRecordMedication);
        }
    }, [current_caseRecordMedication])

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

    const caclCost = (medication) => {
        const allCost = medication?.price*medication.amount;
        const discountCost = allCost*medication?.discount/100;
        return allCost - discountCost;
    }

    const handleSaveEdit = () => {
        editCaseRecordMedications({
            caseRecord: caseRecord,
            uuid_caseRecordMedication: medication.uuid_caseRecordMedication,
            amount: medication.amount,
            note: medication.note,
            cost: caclCost(medication),
            pageNumber: medication.pageNumber
        }).then(res => {
            const resData = res.data;
            if (resData?.success) {
                removeShowTableEditMedication();
            } else {
                console.log(resData)
                if (resData?.isCompletedPrescription) {
                    
                }
                // alert(resData?.message);
            }
        }).catch(err => console.error(err));
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
                    <span>: { index }</span>
                </div>
                <div>
                    <strong>Uid:</strong>
                    <span>: { medication.uuid_caseRecordMedication }</span>
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
                    <button onClick={() => handleSaveEdit()}>Oke</button>
                    <button onClick={() => removeShowTableEditMedication()}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default memo(MedicationTableEdit);