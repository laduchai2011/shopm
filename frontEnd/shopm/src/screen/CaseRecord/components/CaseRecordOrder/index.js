import React, { memo, useState } from "react";
import './styles.css';

import { useDispatch } from 'react-redux';

import { useSelector } from "react-redux";
import { TiDelete } from "react-icons/ti";
import { IoReloadCircleSharp } from "react-icons/io5";
import { IoMdCheckmarkCircle } from "react-icons/io";

import { 
    useCreateOrderMedicationWithCaseRecordMutation
} from "reduxStore/RTKQuery/orderMedicationRTKQuery";

import { 
    handleCaseRecordMid  
} from "../utilize";

import { $ } from "utilize/Tricks";


// /**
// *@typedef {
// *title: string,
// *type: string,
// *pageNumber: string,
// *status: string,
// *uuid_caseRecord: uuid,
// *uuid_orderMyself: uuid,
// *uuid_user: uuid
// *} orderMedicationOptions
// */ 

// /**
// *@typedef {
// *step: string,
// *isCompleted: text,
// *status: string,
// *uuid_orderMedication: uuid
// *} historyOptions

// */ 

// /**
// *@typedef {
// *type: string,
// *information: text,
// *cost: int,
// *status: string,
// *uuid_orderMedication: uuid
// *} transportOptions
// */ 
    
// /**
// *@typedef {
// *type: string,
// *information: text,
// *cost: int,
// *status: string,
// *uuid_orderMedication: uuid
// *} paymentMedicationOptions
// */ 

/**
*@typedef {
*name: string,
*amount: string,
*costTotal: float,
*note: text,
*status: string,
*uuid_departmentMedication: uuid,
*uuid_orderMedicationGroup: uuid
*} orderMedicationOptions
*/ 

/**
*@typedef {
*name: string,
*amount: string,
*price: float,
*discount: float,
*costTotal: float,
*note: text,
*status: string,
*uuid_orderMedication: uuid
*} orderMedicationMedicationOptions
*/ 

/**
*@typedef {
*description: TEXT,
*status: string,
*uuid_orderMedication: uuid
*} orderMedicationDescriptionOptions
*/ 

/**
*@typedef {
*title: string,
*imageUrl: string,
*status: string,
*uuid_orderMedication: uuid
*} orderMedicationImageOptions
*/

/**
*@typedef {
*title: string,
*videoUrl: string,
*status: string,
*uuid_orderMedication: uuid
*} orderMedicationVideoOptions
*/

/**
*@typedef {
*prescription: TEXT,
*status: string,
*uuid_orderMedication: uuid
*} orderMedicationPrescriptionOptions
*/ 

/**
*@typedef {
*step: string,              cart - order - confirm - transport - receive
*isCompleted: text,
*status: string,
*uuid_orderMedication: uuid
*} orderMedicationStepByStepOptions
*/ 

/**
*@typedef {
*type: string,
*information: text,
*cost: float,
*status: string,
*uuid_orderMedication: uuid
*} orderMedicationTransportOptions
*/ 
    
/**
*@typedef {
*type: string,
*information: text,
*cost: float,
*status: string,
*uuid_orderMedication: uuid
*} orderMedicationPaymentOptions
*/ 

const CaseRecordOrder = () => {
    const dispatch = useDispatch();
    const caseRecord_orderMedication = useSelector(state => state.caseRecord.caseRecord_orderMedication);
    
    const [createOrderMedicationWithCaseRecord] = useCreateOrderMedicationWithCaseRecordMutation();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState();

    const removeCaseRecordOrder = () => {
        !loading && $('.CaseRecordOrder').classList.remove('show');
    }

    const handleAgree = () => {
        // const orderMedicationFromCaseRecordOptions = {}

        const orderMedicationOptions = {
            title: caseRecord_orderMedication?.caseRecord?.title,
            type: 'caseRecord',
            pageNumber: caseRecord_orderMedication?.pageNumber,
            status: 'normal',
            uuid_caseRecord: null,
            uuid_orderMyself: null,
            uuid_user: null
        }
        
        setLoading(true);
        setTimeout(async () => {
            try {
                const res_createOrderMedication = await createOrderMedicationWithCaseRecord({
                    uuid_caseRecord: caseRecord_orderMedication?.caseRecord?.uuid_caseRecord,
                    pageNumber: caseRecord_orderMedication?.pageNumber,
                    orderMedicationOptions: orderMedicationOptions,
                    soldMedicationList: caseRecord_orderMedication.soldMedicationList
                })
                setLoading(false);
                const resData = res_createOrderMedication?.data;
                if (resData?.success) {
                    setSuccess(true);
                } else if (resData?.success===false) {
                    const isCheckCaseRecordMidOptions = {
                        isCheckCurrentPage: true,
                        isCheckCompleted: true,
                        isCheckCompletedPrescription: false,
                        isCheckCompletedOrCompletedPrescription: false,
                        isCheckLocked: false,
                        isCheckOrderMedication: true,
                        isCheckOutOfMedication: true
                    }
    
                    handleCaseRecordMid({
                        isCheckCaseRecordMidOptions: isCheckCaseRecordMidOptions,
                        resData: resData,
                        dispatch: dispatch
                    })

                    removeCaseRecordOrder();

                    setSuccess(false);
                }
            } catch (error) {
                console.error(error)
            }
        }, 3000);
    }

    return (
        <div className="CaseRecordOrder" onClick={() => removeCaseRecordOrder()}>
            { !loading ? 
            <div onClick={(e) => e.stopPropagation()}>
                <div>
                    <TiDelete onClick={() => removeCaseRecordOrder()} size={ 25 } />
                </div>
                <div>
                    {`Order (${caseRecord_orderMedication?.pageNumber})`}
                </div>
                {
                    success===true && 
                    <div>
                        <div>
                            <IoMdCheckmarkCircle size={ 50 } color="greenyellow"/>
                        </div>
                        <div>
                            <span>Success !</span>
                        </div>
                    </div> 
                }
                {
                    !success && 
                    <div>
                        <div>
                            <span>Transport :</span>
                            <span>Default</span>
                        </div>
                        <div>
                            <span>Payment :</span>
                            <span>Default (Cash)</span>
                        </div>
                    </div>
                }
                {
                    !success && 
                    <div>
                        <button onClick={() => handleAgree()}>Agree</button>
                        <button onClick={() => removeCaseRecordOrder()}>Cance</button>
                    </div>
                }
            </div> : 
            <div onClick={(e) => e.stopPropagation()}>
                <div>
                    <IoReloadCircleSharp  size={ 25 } color="blue" />
                </div>
                <div>
                    Loading ...
                </div>
                <div>
                    Wait to complete to loading. Please !
                </div>
            </div>
            }
        </div>
    )
}

export default memo(CaseRecordOrder);