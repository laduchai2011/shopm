import React, { useState, useEffect } from 'react';
import './styles.css';

import { useParams } from "react-router-dom";

import { HiCheck } from 'react-icons/hi';
import { CiCircleChevDown } from "react-icons/ci";

import { $ } from 'utilize/Tricks';

import Header from 'screen/Header';
import MedicationOrderImage from './components/MedicationOrderImage';
import MedicationOrderVideoBox from './components/MedicationOrderVideoBox';
import MedicationOrderImageBox from './components/MedicationOrderImageBox';

import { 
    useGetOrderMedicationWithUuidQuery,
    useGetHistoriesWithFKQuery,
    useGetTransportWithFKQuery,
    useGetPaymentMedicationWithFKQuery 
} from 'reduxStore/RTKQuery/orderMedicationRTKQuery';

import { 
    useLazyGetCaseRecordImageAllQuery,
    useLazyGetCaseRecordDescriptionQuery,
    useLazyGetCaseRecordPrescriptionQuery,
    useLazyGetCaseRecordMedicationsAllQuery
} from 'reduxStore/RTKQuery/caseRecordRTKQuery';



/**
*@typedef {
*title: string,
*type: string,
*pageNumber: string,
*status: string,
*uuid_caseRecord: uuid,
*uuid_orderMyself: uuid,
*uuid_user: uuid
*} orderMedicationOptions
*/ 

/**
*@typedef {
*step: string,
*isCompleted: text,
*status: string,
*uuid_orderMedication: uuid
*} historyOptions
*/ 

/**
*@typedef {
*type: string,
*information: text,
*cost: int,
*status: string,
*uuid_orderMedication: uuid
*} transportOptions
*/ 
    
/**
*@typedef {
*type: string,
*information: text,
*cost: int,
*status: string,
*uuid_orderMedication: uuid
*} paymentMedicationOptions
*/ 


const MedicationOrder = () => {
    const { id: uuid_orderMedication } = useParams();

    const [toastImage, setToastImage] = useState('');
    const [costTotal, setCostTotal] = useState();

    // oderMedication
    const {
        data: data_orderMedication, 
        // isFetching: isFetching_orderMedication, 
        isError: isError_orderMedication,
        error: error_orderMedication
    } = useGetOrderMedicationWithUuidQuery({uuid_orderMedication: uuid_orderMedication});
    const [orderMedication, setOrderMedication] = useState();
    useEffect(() => {
        isError_orderMedication && console.log(error_orderMedication);
    }, [isError_orderMedication, error_orderMedication])
    useEffect(() => {
        const resData = data_orderMedication;
        if (resData?.success) {
            setOrderMedication(resData?.orderMedication);
        }
    }, [data_orderMedication])

    // histories
    const {
        data: data_histories, 
        // isFetching: isFetching_histories, 
        isError: isError_histories,
        error: error_histories
    } = useGetHistoriesWithFKQuery({uuid_orderMedication: uuid_orderMedication});
    const [histories, setHistories] = useState();
    useEffect(() => {
        isError_histories && console.log(error_histories);
    }, [isError_histories, error_histories])
    useEffect(() => {
        const resData = data_histories;
        setHistories(resData?.historyOptionsList);
        if (resData?.success) {
            const data_ = resData?.historyOptionsList;
            const newHistories = [1,2,3,4,5];
            for (let i = 0; i < data_.length; i++) {
                const newHistory = {
                    step: data_[i].step,
                    isCompleted: data_[i].isCompleted,
                    time: data_[i].updatedAt
                }

                if (data_[i].step==='cart') {
                    newHistories[0] = newHistory;
                }
                if (data_[i].step==='order') {
                    newHistories[1] = newHistory;
                }
                if (data_[i].step==='confirm') {
                    newHistories[2] = newHistory;
                }
                if (data_[i].step==='transport') {
                    newHistories[3] = newHistory;
                }
                if (data_[i].step==='receive') {
                    newHistories[4] = newHistory;
                }
            }

            setHistories(newHistories);
        }
    }, [data_histories])

    // transport
    const {
        data: data_transport, 
        // isFetching: isFetching_transport, 
        isError: isError_transport,
        error: error_transport
    } = useGetTransportWithFKQuery({uuid_orderMedication: uuid_orderMedication});
    const [transport, setTransport] = useState();
    useEffect(() => {
        isError_transport && console.log(error_transport);
    }, [isError_transport, error_transport])
    useEffect(() => {
        const resData = data_transport;
        if (resData?.success) {
            setTransport(resData?.transport);
        }
    }, [data_transport])

    // paymentMedication
    const {
        data: data_paymentMedication, 
        // isFetching: isFetching_paymentMedication, 
        isError: isError_paymentMedication,
        error: error_paymentMedication
    } = useGetPaymentMedicationWithFKQuery({uuid_orderMedication: uuid_orderMedication});
    const [paymentMedication, setPaymentMedication] = useState();
    useEffect(() => {
        isError_paymentMedication && console.log(error_paymentMedication);
    }, [isError_paymentMedication, error_paymentMedication])
    useEffect(() => {
        const resData = data_paymentMedication;
        if (resData?.success) {
            setPaymentMedication(resData?.paymentMedication);
        }
    }, [data_paymentMedication])

    // all images
    const [getCaseRecordImageAll, {
        data: data_imageAll, 
        // isFetching: isFetching_imageAll, 
        isError: isError_imageAll,
        error: error_imageAll
    }] = useLazyGetCaseRecordImageAllQuery();
    const [imageAll, setImageAll] = useState([]);
    useEffect(() => {
        isError_imageAll && console.log(error_imageAll);
    }, [isError_imageAll, error_imageAll])
    useEffect(() => {
        const resData = data_imageAll;
        if (resData?.success) {
            setImageAll(resData?.caseRecordImageAll);
        }
    }, [data_imageAll])

    // description
    const [getCaseRecordDescription, {
        data: data_description, 
        // isFetching: isFetching_description, 
        isError: isError_description,
        error: error_description
    }] = useLazyGetCaseRecordDescriptionQuery();
    const [description, setDescription] = useState();
    useEffect(() => {
        isError_description && console.log(error_description);
    }, [isError_description, error_description])
    useEffect(() => {
        const resData = data_description;
        if (resData?.success) {
            setDescription(resData?.caseRecordDescription?.description);
        }
    }, [data_description])

    // prescription
    const [getCaseRecordPrescription, {
        data: data_prescription, 
        // isFetching: isFetching_prescription, 
        isError: isError_prescription,
        error: error_prescription
    }] = useLazyGetCaseRecordPrescriptionQuery();
    const [prescription, setPrescription] = useState();
    useEffect(() => {
        isError_prescription && console.log(error_prescription);
    }, [isError_prescription, error_prescription])
    useEffect(() => {
        const resData = data_prescription;
        if (resData?.success) {
            setPrescription(resData?.caseRecordPrescription?.prescription);
        }
    }, [data_prescription])
    useEffect(() => {
        const q_prescription = $('.MedicationOrder-Note-list');
        q_prescription.children.innerHTML = prescription;
    }, [prescription])

    // medication
    const [getCaseRecordMedicationsAll, {
        data: data_medicationsAll, 
        // isFetching: isFetching_medicationsAll, 
        isError: isError_medicationsAll,
        error: error_medicationsAll
    }] = useLazyGetCaseRecordMedicationsAllQuery();
    const [medicationsAll, setMedicationsAll] = useState([]);
    useEffect(() => {
        isError_medicationsAll && console.log(error_medicationsAll);
    }, [isError_medicationsAll, error_medicationsAll])
    useEffect(() => {
        const resData = data_medicationsAll;
        if (resData?.success && (resData?.caseRecordMedications!==null)) {
            const new_medicationList = [];
            for (let i = 0; i < resData?.caseRecordMedications?.length; i++) {
                const medicationList_m = {
                    caseRecordMedication: resData?.caseRecordMedications[i],
                    medication: null
                }
                new_medicationList.push(medicationList_m);
            }
            setMedicationsAll(new_medicationList);
        } 
    }, [data_medicationsAll])

    // trigger data
    useEffect(() => {
        orderMedication && getCaseRecordImageAll({
            uuid_caseRecord: orderMedication.uuid_caseRecord, 
            pageNumber: orderMedication.pageNumber
        })
        orderMedication && getCaseRecordDescription({
            uuid_caseRecord: orderMedication.uuid_caseRecord, 
            pageNumber: orderMedication.pageNumber
        })
        orderMedication && getCaseRecordPrescription({
            uuid_caseRecord: orderMedication.uuid_caseRecord, 
            pageNumber: orderMedication.pageNumber
        })
        orderMedication && getCaseRecordMedicationsAll({
            uuid_caseRecord: orderMedication.uuid_caseRecord, 
            pageNumber: orderMedication.pageNumber
        })
    }, [orderMedication, 
        getCaseRecordDescription, 
        getCaseRecordImageAll, 
        getCaseRecordPrescription,
        getCaseRecordMedicationsAll
    ])

    useEffect(() => {
        let costTotal_m = 0;
        for (let i = 0; i < medicationsAll.length; i++) {
            const caseRecordMedication = medicationsAll[i].caseRecordMedication;
            costTotal_m = costTotal_m + caseRecordMedication.cost;
        }
        
        setCostTotal(costTotal_m);
    }, [medicationsAll])

    const handleGotoMedication = (uuid_medication) => {
        window.open(`/medication/${uuid_medication}`, 'rel=noopener noreferrer')
    }

    const handleGoToCaseRecord = (uuid_caseRecord) => {
        window.open(`/caseRecord/${uuid_caseRecord}`, 'rel=noopener noreferrer')
    }

    const list_medication = medicationsAll.map((data, index) => {
        const caseRecordMedication = data.caseRecordMedication;
        return (
            <div className='MedicationOrder-medicateList-medicate' key={ index }>
                <div>{ caseRecordMedication.name }</div>
                <div>{ caseRecordMedication.note }</div>
                <div>
                    <span>{ caseRecordMedication.amount }</span>
                    <span>{ caseRecordMedication.discount }%</span>
                    <span>{ caseRecordMedication.price }</span>
                    <button onClick={() => handleGotoMedication(caseRecordMedication.uuid_medication)}>Detail</button>
                </div>
            </div>
        )
    })

    const list_image = imageAll.map((data, index) => {
        return <MedicationOrderImageBox key={index} data={data} setToastImage={setToastImage} />
    })

    const list_video = [
        'http://localhost:4040/api/video/',
        'http://localhost:4040/api/video/',
        'http://localhost:4040/api/video/',
        'http://localhost:4040/api/video/',
        'http://localhost:4040/api/video/'
    ].map((data, index) => {
        return <MedicationOrderVideoBox key={index} data={data} index={index} />
    })

    return (
        <div className='MedicationOrder'>
            <Header />
            <div className='MedicationOrder-main'>
                <h2>{`Order ( ${ orderMedication?.uuid_orderMedication } )`}</h2>
                <h4>{ `${ orderMedication?.title }` }</h4>
                <div className='MedicationOrder-History'>
                    <div className='MedicationOrder-History-header'>History</div>
                    <div className='MedicationOrder-History-list'>
                        <div className='MedicationOrder-History-step'>
                            <div><span>1</span></div>
                            { histories && <div>Cart ( <span>{ `${histories[0]?.time}` }</span> ) </div> }
                            { histories && histories[0]?.isCompleted ? <div><HiCheck size={25} color='green' /></div> : <CiCircleChevDown size={25} /> }
                        </div>
                        <div className='MedicationOrder-History-step'>
                            <div><span>2</span></div>
                            { histories && <div>Order ( <span>{ `${histories[1]?.time}` }</span> ) </div> }
                            { histories && histories[1]?.isCompleted ? <div><HiCheck size={25} color='green' /></div> : <CiCircleChevDown size={25} /> }
                        </div>
                        <div className='MedicationOrder-History-step'>
                            <div><span>3</span></div>
                            { histories && <div>Confirm ( <span>{ `${histories[2]?.time}` }</span> ) </div> }
                            { histories && histories[2]?.isCompleted ? <div><HiCheck size={25} color='green' /></div> : <CiCircleChevDown size={25} /> }
                        </div>
                        <div className='MedicationOrder-History-step'>
                            <div><span>4</span></div>
                            { histories && <div>Transport ( <span>{ `${histories[3]?.time}` }</span> ) </div> }
                            { histories && histories[3]?.isCompleted ? <div><HiCheck size={25} color='green' /></div> : <CiCircleChevDown size={25} /> }
                        </div>
                        <div className='MedicationOrder-History-step'>
                            <div><span>5</span></div>
                            { histories && <div>Receive ( <span>{ `${histories[4]?.time}` }</span> ) </div> }
                            { histories && histories[4]?.isCompleted ? <div><HiCheck size={25} color='green' /></div> : <CiCircleChevDown size={25} /> }
                        </div>
                    </div>
                </div>
                <div className='MedicationOrder-MedicateList'>
                    <div className='MedicationOrder-MedicateList-header'>Medicate List</div>
                    <div className='MedicationOrder-MedicateList-list'>
                        { list_medication }
                    </div>
                </div>
                <div className='MedicationOrder-Support'>
                    <div className='MedicationOrder-Support-header'>Support</div>
                    { orderMedication?.uuid_caseRecord!==null && <div className='MedicationOrder-Support-list'>
                        <div>Case-Record: <strong>{`${orderMedication?.uuid_caseRecord}`}</strong> -- Page number: <strong>{`${orderMedication?.pageNumber}`}</strong></div>
                        <div>
                            <button onClick={() => handleGoToCaseRecord(orderMedication?.uuid_caseRecord)}>Go to caseRecord</button>
                        </div>
                    </div> }
                    { orderMedication?.uuid_orderMyself!==null && <div className='MedicationOrder-Support-list'>
                        Not is a medicated order by case-record
                    </div> }
                </div>
                <div className='MedicationOrder-Image'>
                    <div className='MedicationOrder-Image-header'>Image</div>
                    { orderMedication?.uuid_caseRecord!==null && <div className='MedicationOrder-Image-list'>
                        { list_image }
                    </div> }
                    { orderMedication?.uuid_orderMyself!==null && <div className='MedicationOrder-Image-list'>
                        Not is a medicated order by case-record
                    </div> }
                </div>
                <div className='MedicationOrder-Video'>
                    <div className='MedicationOrder-Video-header'>Video</div>
                    { orderMedication?.uuid_caseRecord!==null && <div className='MedicationOrder-Video-list'>
                        { list_video }
                    </div> }
                    { orderMedication?.uuid_orderMyself!==null && <div className='MedicationOrder-Video-list'>
                        Not is a medicated order by case-record
                    </div> }
                </div>
                <div className='MedicationOrder-Note'>
                    <div className='MedicationOrder-Note-header'>Note (<span>You</span>)</div>
                    { orderMedication?.uuid_caseRecord!==null && <div className='MedicationOrder-Note-list'>
                        <div>{ description }</div>
                    </div> }
                    { orderMedication?.uuid_orderMyself!==null && <div className='MedicationOrder-Note-list'>
                        Not is a medicated order by case-record
                    </div> }
                </div>
                <div className='MedicationOrder-Note'>
                    <div className='MedicationOrder-Note-header'>Note (<span>Doctor or Pharmacist</span>)</div>
                    { orderMedication?.uuid_caseRecord!==null && <div className='MedicationOrder-Note-list'>
                        <div>{ prescription }</div>
                    </div> }
                    { orderMedication?.uuid_orderMyself!==null && <div className='MedicationOrder-Note-list'>
                        Not is a medicated order by case-record
                    </div> }
                </div>
                <div className='MedicationOrder-Transport'>
                    <div className='MedicationOrder-Transport-header'>Transport</div>
                    <div className='MedicationOrder-Transport-list'>
                        <div className='MedicationOrder-Transport-step'>
                            <div>{ transport?.type }</div>
                            <div>: { transport?.cost } $</div>
                        </div>
                    </div>
                </div>
                <div className='MedicationOrder-Pay'>
                    <div className='MedicationOrder-Pay-header'>Payment</div>
                    <div className='MedicationOrder-Pay-list'>
                        <div className='MedicationOrder-Pay-step'>
                            <div><span>1</span></div>
                            <div>{ paymentMedication?.type }</div>
                            <div><HiCheck size={25} color='green' /></div>
                        </div>
                    </div>
                </div>
                <div className='MedicationOrder-Total'>
                    <div className='MedicationOrder-Total-header'>Total</div>
                    <div className='MedicationOrder-Total-list'>
                        <div>Medication</div>
                        <div>Transport</div>
                        <div>Total</div>
                        <div>{ costTotal } $</div>
                        <div>{ transport?.cost } $</div> 
                        <div>{ costTotal + transport?.cost } $</div> 
                    </div>
                </div>
                <div className='MedicationOrder-Report'>
                    <div>
                        <textarea placeholder='Content Report' />
                    </div>
                    <div>
                        <button>Report</button>
                    </div>
                </div>
            </div>
            <MedicationOrderImage toastImage={toastImage} />
        </div>
    )
}

export default MedicationOrder;