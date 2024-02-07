import React, { useState, useEffect, useContext } from "react";
import './styles.css';

import { useParams } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { 
    setCurrent_caseRecordMedication
} from "reduxStore/slice/caseRecordSlice";
import { ThemeContextApp } from 'utilize/ContextApp';

import { AiFillEdit } from 'react-icons/ai';
import { CiCircleRemove, CiEdit } from 'react-icons/ci';
import { GrAdd } from 'react-icons/gr';
import { BsFillFileEarmarkImageFill, BsPersonVideo2 } from 'react-icons/bs';
import { IoCheckmark } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

import CaseRecordPageImage from "./components/CaseRecordPageImage";

import TextEditor from "TextEditor";
import { TEGetContent, TESetContent } from "TextEditor/utilize";
import { $, $$ } from "utilize/Tricks";

import { 
    SERVER_ADDRESS_GET_VIDEO
} from "config/server";

import { 
    useGetCaseRecordLockQuery,
    useGetCaseRecordDescriptionQuery,
    useGetCaseRecordImageAllQuery,
    useGetCaseRecordPrescriptionQuery,
    usePostCaseRecordLockMutation,
    usePatchCaseRecordDescriptionMutation,
    usePatchCaseRecordPrescriptionMutation,
    useGetCaseRecordMedicationsAllQuery,
    useDeleteCaseRecordLockMutation,
    useCompletedPrescriptionMutation,
    useCompletedMutation,
    useDopReqPrescriptionAgainMutation
} from "reduxStore/RTKQuery/caseRecordRTKQuery";
import { 
    useGetOrderMedicationWithCaseRecordQuery
} from "reduxStore/RTKQuery/orderMedicationRTKQuery";
import { usePatchCurrentCartMutation } from "reduxStore/RTKQuery/currentCartRTKQuery";
import { useLazyGetMedicationQuery } from "reduxStore/RTKQuery/medicationRTKQuery";
import { useCreateNotificationMutation } from 'reduxStore/RTKQuery/notificationRTKQuery';
import { 
    useGetDoctorOrPharmacistFromCaseRecordQuery
} from "reduxStore/RTKQuery/doctorOrPharmacistRTKQuery";
import { 
    setCurrent_pageNumber,
    setCaseRecord_orderMedication
} from "reduxStore/slice/caseRecordSlice";

import { 
    handleCaseRecordMid,
    handleCaseRecordCondition,
    isCurrentPage,
    isCompleted, 
    // isNotCompleted, 
    // isCompletedPrescription,
    // isNotCompletedPrescription,
    isCompletedOrIsCompletedPrescription,
    isLocked,
    isNotLocked 
} from "../utilize";

/**
*@typedef {
*title: string,
*priceTotal: integer,
*pageTotal: integer,
*currentPage: string,
*report: text,
*status: string,
*uuid_doctorOrPharmacist: uuid,
*uuid_user: uuid
*} caseRecordOptions
*/ 

/**
*@typedef {
*pageNumber: string,
*description: text,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordDescriptionOptions
*/

/**
*@typedef {
*pageNumber: string,
*image: string,
*title: string,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordImageOptions
*/  

/**
*@typedef {
*pageNumber: string,
*videos: text,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordVideoOptions
*/  

/**
*@typedef {
*pageNumber: string,
*prescription: text,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordPrescriptionOptions
*/  

/**
*@typedef {
*pageNumber: string,
*name: string,
*amount: INTEGER.UNSIGNED,
*note: text,
*price: INTEGER.UNSIGNED,
*cost: INTEGER.UNSIGNED,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordMedicationOptions
*/  

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
*uuid_caseRecord: uuid_caseRecord,
*caseRecordRole: string, doctorOrPharmacist or patient
*isLocked: boolean,
*pageNumber: string
*} caseRecordLockOptions
*/ 

/**
*@typedef {
*isCheckCurrentPage: boolean,
*isCheckCompleted: boolean,
*isCheckCompletedPrescription: boolean,
*isCheckCompletedOrCompletedPrescription: boolean,
*isCheckOrderMedication: boolean
*isCheckLock: boolean
*} isCheckCaseRecordMidOptions
*/ 

/**
*@typedef {
*type: string,
*notification: text,
*status: string,  // sent - receved - seen - read - deleted / 1 - 2 - 3 - 4 - 5
*uuid_user: uuid
*} notificationOptions
*/  

/**
*@typedef {
*title: string, 
*type: string,
*uuid_userSent: string,
*data: json
*} notification
*/

const CaseRecordPage = ({caseRecord, caseRecordRole}) => {
    const { id: uuid_caseRecord } = useParams();
    const index = 0;
    const dispatch = useDispatch();
    const { loginInfor } = useContext(ThemeContextApp);

    const [completedStatus, setCompletedStatus] = useState(false);
    const [completedOrCompletedPrescriptionStatus, setCompletedOrCompletedPrescriptionStatus] = useState(false);
    const [orderStatus, setOrderStatus] = useState(false);
    const [lockedStatus, setLockedStatus] = useState(false);
    const [editBoolD, setEditBoolD] = useState(false);
    const [editBoolP, setEditBoolP] = useState(false);

    const [createNotification] = useCreateNotificationMutation();
    const [postCaseRecordLock] = usePostCaseRecordLockMutation();
    const [patchCaseRecordDescription] = usePatchCaseRecordDescriptionMutation();
    const [patchCaseRecordPrescription] = usePatchCaseRecordPrescriptionMutation();
    const [patchCurrentCart] = usePatchCurrentCartMutation();
    const [getMedication] = useLazyGetMedicationQuery();
    const [deleteCaseRecordLock] = useDeleteCaseRecordLockMutation();
    const [completedPrescription] = useCompletedPrescriptionMutation();
    const [completed] = useCompletedMutation();
    const [dopReqPrescriptionAgain] = useDopReqPrescriptionAgainMutation();

    const {
        data: data_description, 
        // isFetching: isFetching_description, 
        isError: isError_description,
        error: error_description
    } = useGetCaseRecordDescriptionQuery({uuid_caseRecord: uuid_caseRecord, pageNumber: index + 1});
    const [description, setDescription] = useState();

    const {
        data: data_imageAll, 
        // isFetching: isFetching_imageAll, 
        isError: isError_imageAll,
        error: error_imageAll
    } = useGetCaseRecordImageAllQuery({uuid_caseRecord: uuid_caseRecord, pageNumber: index + 1});
    const [imageAll, setImageAll] = useState([]);

    const {
        data: data_prescription, 
        // isFetching: isFetching_prescription, 
        isError: isError_prescription,
        error: error_prescription
    } = useGetCaseRecordPrescriptionQuery({uuid_caseRecord: uuid_caseRecord, pageNumber: index + 1});
    const [prescription, setPrescription] = useState();

    const {
        data: data_medicationList, 
        // isFetching: isFetching_medicationList, 
        isError: isError_medicationList,
        error: error_medicationList
    } = useGetCaseRecordMedicationsAllQuery({uuid_caseRecord: uuid_caseRecord, pageNumber: index + 1});
    const [medicationList, setMedicationList] = useState([]);

    // doctorOrPharmacist
    const {
        data: data_doctorOrPharmacist, 
        // isFetching: isFetching_doctorOrPharmacist, 
        isError: isError_doctorOrPharmacist, 
        error: error_doctorOrPharmacist
    } = useGetDoctorOrPharmacistFromCaseRecordQuery({uuid_doctorOrPharmacist: caseRecord.uuid_doctorOrPharmacist});

    // lock
    const {
        data: data_caseRecordLock, 
        // isFetching: isFetching_data_caseRecordLock, 
        isError: isError_caseRecordLock, 
        error: error_caseRecordLock
    } = useGetCaseRecordLockQuery({uuid_caseRecord: uuid_caseRecord});
    const [caseRecordLock, setCaseRecordLock] = useState();

    // orderMedication
    const {
        data: data_orderMedication, 
        // isFetching: isFetching_orderMedication, 
        isError: isError_orderMedication,
        error: error_orderMedication
    } = useGetOrderMedicationWithCaseRecordQuery({uuid_caseRecord: uuid_caseRecord, pageNumber: index + 1});
    const [orderMedication, setOrderMedication] = useState();

    // description
    useEffect(() => {
        isError_description && console.log(error_description);
    }, [isError_description, error_description])
    useEffect(() => {
        const resData = data_description;
        setDescription(resData?.caseRecordDescription?.description);
    }, [data_description])

    useEffect(() => {
        isError_imageAll && console.log(error_imageAll);
    }, [isError_imageAll, error_imageAll])
    useEffect(() => {
        const resData = data_imageAll;
        if (resData?.success) {
            setImageAll(resData.caseRecordImageAll);
        }
    }, [data_imageAll])

    // prescription
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
        if (!editBoolP) {
            const q_prescription = $$('.CaseRecordPage-prescription-content')[index];
            q_prescription.children[0].innerHTML = prescription;
        } else {
            TESetContent({content: prescription, index: index})
        }
    }, [prescription, editBoolP])

    // medicationAll
    useEffect(() => {
        isError_medicationList && console.log(error_medicationList);
    }, [isError_medicationList, error_medicationList])
    useEffect(() => {
        const resData = data_medicationList;
        if (resData?.success && (resData?.caseRecordMedications!==null)) {
            const new_medicationList = [];
            for (let i = 0; i < resData?.caseRecordMedications?.length; i++) {
                const medicationList_m = {
                    caseRecordMedication: resData?.caseRecordMedications[i],
                    medication: null
                }
                new_medicationList.push(medicationList_m);
            }
            setMedicationList(new_medicationList);
        } 
    }, [data_medicationList])

    // doctorOrPharmacist
    useEffect(() => {
        isError_doctorOrPharmacist && console.log(error_doctorOrPharmacist);
    }, [isError_doctorOrPharmacist, error_doctorOrPharmacist])
    useEffect(() => {
        // const resData = data_doctorOrPharmacist;
    }, [data_doctorOrPharmacist])

    // lock
    useEffect(() => {
        isError_caseRecordLock && console.log(error_caseRecordLock);
    }, [isError_caseRecordLock, error_caseRecordLock])
    useEffect(() => {
        // console.log('caseRecordLock', data_caseRecordLock?.caseRecordLock)
        setCaseRecordLock(data_caseRecordLock?.caseRecordLock);
    }, [data_caseRecordLock])

    // orderMedication
    useEffect(() => {
        isError_orderMedication && console.log(error_orderMedication);
    }, [isError_orderMedication, error_orderMedication])
    useEffect(() => {
        const resData = data_orderMedication;
        if (resData?.success) {
            setOrderMedication(resData?.orderMedication);
        }
    }, [data_orderMedication])

    const handleSaveP = () => {
        if (editBoolP) {
            setEditBoolP(false);
            patchCaseRecordPrescription({
                uuid_caseRecord: uuid_caseRecord,
                pageNumber: (index + 1).toString(),
                uuid_caseRecordPrescription: data_prescription?.caseRecordPrescription?.uuid_caseRecordPrescription,
                prescription: TEGetContent(index)
            }).then(res => {
                const resData = res.data
                if (resData?.success===false) {
                    const isCheckCaseRecordMidOptions = {
                        isCheckCurrentPage: true,
                        isCheckCompleted: true,
                        isCheckCompletedPrescription: false,
                        isCheckCompletedOrCompletedPrescription: false,
                        isCheckLocked: true,
                        isCheckOrderMedication: false
                    }
    
                    handleCaseRecordMid({
                        isCheckCaseRecordMidOptions: isCheckCaseRecordMidOptions,
                        resData: resData,
                        dispatch: dispatch
                    })
                }
            }).catch(err => console.error(err))
        }
    }

    const handleSaveD = () => {
        if (editBoolD) {
            patchCaseRecordDescription({
                uuid_caseRecord: uuid_caseRecord,
                pageNumber: (index + 1).toString(),
                uuid_caseRecordDescription: data_description?.caseRecordDescription?.uuid_caseRecordDescription,
                description: description
            }).then(res => {
                const resData = res.data
                if (resData?.success) {
                    setEditBoolD(false);
                } else if (resData?.success===false) {
                    const isCheckCaseRecordMidOptions = {
                        isCheckCurrentPage: true,
                        isCheckCompleted: true,
                        isCheckCompletedPrescription: true,
                        isCheckCompletedOrCompletedPrescription: false,
                        isCheckLocked: true,
                        isCheckOrderMedication: false
                    }
    
                    handleCaseRecordMid({
                        isCheckCaseRecordMidOptions: isCheckCaseRecordMidOptions,
                        resData: resData,
                        dispatch: dispatch
                    })
                }
            }).catch(err => console.error(err))
        }
    }

    const handeleEditP = () => {
        if (!editBoolP) {
            setEditBoolP(true);
        }
    }

    const handleEditDesNote = (e) => {
        const value = e.target.value;
        setDescription(value);
    }

    const handleAddImages = () => {
        dispatch(setCurrent_pageNumber({current_pageNumber: (index + 1).toString()}));
        $('.CaseRecordAddImage').classList.add('show');
    }

    const handleAddMedication = () => {
        patchCurrentCart({
            uuid_caseRecord: uuid_caseRecord,
            pageNumber: (index + 1).toString()
        });
    }

    const showTableDeleteMedication = (caseRecordMedication, index) => {
        dispatch(setCurrent_caseRecordMedication({caseRecordMedication: caseRecordMedication, index: index}));
        const q_medicationDelete = $('.MedicationTableDelete');
        q_medicationDelete.classList.add('show');
    }

    const showTableEditMedication = (caseRecordMedication, index) => {
        dispatch(setCurrent_caseRecordMedication({caseRecordMedication: caseRecordMedication, index: index}));
        const q_medicationEdit = $('.MedicationTableEdit');
        q_medicationEdit.classList.add('show');
    }

    const handleCheckMedication = (caseRecordMedication, index) => {
        getMedication({
            uuid_medication: caseRecordMedication.uuid_medication
        }).then(res => {
            const resData = res.data;
            if (resData?.success) {
                const medicationList_m = {
                    caseRecordMedication: caseRecordMedication,
                    medication: resData.medication
                }

                const cp_medicationList = [...medicationList];
                cp_medicationList[index] = medicationList_m;

                setMedicationList(cp_medicationList);
            } else {
                alert(resData?.message);
            }
        }).catch(err => console.error(err));
    }

    const handleCheckAllMedication = async () => {
        const cp_medicationList = [...medicationList];
        for (let index = 0; index < medicationList.length; index++) {
            const caseRecordMedication = medicationList[index].caseRecordMedication;   
            const promise_getMedication = new Promise((resolve, reject) => {
                getMedication({
                    uuid_medication: caseRecordMedication.uuid_medication
                }).then(res => {
                    const resData = res.data;
                    if (resData?.success) {
                        const medicationList_m = {
                            caseRecordMedication: caseRecordMedication,
                            medication: resData.medication
                        }
                        resolve(medicationList_m);
                    } else {
                        alert(resData?.message);
                    }
                }).catch(err => reject(err));
            });

            try {
                const medicationList_m = await promise_getMedication;
                cp_medicationList[index] = medicationList_m;
            } catch (error) {
                console.error(error);
            }
        }

        setMedicationList(cp_medicationList);
    }

    const handleRequireDoctorOrPharmacistCheck = (caseRecordMedication) => {
        const notification = {
            title: 'Toi can kiem tra lai thuoc',
            type: 'requireCheckMedication',
            uuid_userSent: loginInfor?.uuid, 
            data: {
                caseRecord: caseRecord, 
                pageNumber: (index + 1).toString(),
                caseRecordMedication: caseRecordMedication
            }
        }

        createNotification({
            type: 'now',
            notification: JSON.stringify(notification),
            status: 'sent',
            uuid_user: data_doctorOrPharmacist?.doctorOrPharmacist?.uuid_user
        })
    }

    const handleRequireDoctorOrPharmacistCheckAll = () => {
        const notification = {
            title: 'Toi can kiem tra lai tat ca thuoc',
            type: 'requireCheckAllMedication',
            uuid_userSent: loginInfor?.uuid, 
            data: {
                caseRecord: caseRecord, 
                pageIndex: (index + 1).toString()
            }
        }

        createNotification({
            type: 'now',
            notification: JSON.stringify(notification),
            status: 'sent',
            uuid_user: data_doctorOrPharmacist?.doctorOrPharmacist?.uuid_user
        })
    }

    const handleLock = () => {
        postCaseRecordLock({
            uuid_caseRecord: uuid_caseRecord,
            pageNumber: (index + 1).toString()
        }).then(res => {
            const resData = res.data;
            if (resData?.success===false) {
                const isCheckCaseRecordMidOptions = {
                    isCheckCurrentPage: true,
                    isCheckCompleted: true,
                    isCheckCompletedPrescription: true,
                    isCheckCompletedOrCompletedPrescription: false,
                    isCheckLocked: true,
                    isCheckOrderMedication: false
                }

                handleCaseRecordMid({
                    isCheckCaseRecordMidOptions: isCheckCaseRecordMidOptions,
                    resData: resData,
                    dispatch: dispatch
                })
            }
        }).catch(err => console.error(err))
    }

    const handleUnLock = () => {
        deleteCaseRecordLock({
            uuid_caseRecord: uuid_caseRecord,
            pageNumber: (index + 1).toString()
        }).then(res => {
            const resData = res.data;
            if (resData?.success===false) {
                const isCheckCaseRecordMidOptions = {
                    isCheckCurrentPage: true,
                    isCheckCompleted: false,
                    isCheckCompletedPrescription: false,
                    isCheckCompletedOrCompletedPrescription: false,
                    isCheckLocked: true,
                    isCheckOrderMedication: false
                }

                handleCaseRecordMid({
                    isCheckCaseRecordMidOptions: isCheckCaseRecordMidOptions,
                    resData: resData,
                    dispatch: dispatch
                })
            }
        }).catch(err => console.error(err))
    }

    const handleComplete = () => {
        if (caseRecordRole==='doctorOrPharmacist') {
            completedPrescription({
                uuid_caseRecord: uuid_caseRecord,
                pageNumber: (index + 1).toString()
            }).then(res => {
                const resData = res.data;
                if (resData?.success===false) {
                    const isCheckCaseRecordMidOptions = {
                        isCheckCurrentPage: true,
                        isCheckCompleted: true,
                        isCheckCompletedPrescription: true,
                        isCheckCompletedOrCompletedPrescription: false,
                        isCheckLocked: true,
                        isCheckOrderMedication: false
                    }
                    handleCaseRecordMid({
                        isCheckCaseRecordMidOptions: isCheckCaseRecordMidOptions,
                        resData: resData,
                        dispatch: dispatch
                    })
                }
            }).catch(error => console.error(error))
            .finally(() => {
                handleUnLock();
            })
        }

        if (caseRecordRole==='patient') {
            completed({
                uuid_caseRecord: uuid_caseRecord,
                pageNumber: (index + 1).toString()
            }).then(res => {
                const resData = res.data;
                if (resData?.success===false) {
                    const isCheckCaseRecordMidOptions = {
                        isCheckCurrentPage: true,
                        isCheckCompleted: true,
                        isCheckCompletedPrescription: true,
                        isCheckCompletedOrCompletedPrescription: false,
                        isCheckLocked: true,
                        isCheckOrderMedication: false
                    }
                    handleCaseRecordMid({
                        isCheckCaseRecordMidOptions: isCheckCaseRecordMidOptions,
                        resData: resData,
                        dispatch: dispatch
                    })
                }
            }).catch(error => console.error(error))
            .finally(() => {
                handleUnLock();
            })
        }

        
    }

    const handleDopReqPrescriptionAgain = () => {
        dopReqPrescriptionAgain({
            uuid_caseRecord: uuid_caseRecord,
            pageNumber: (index + 1).toString()
        }).then(res => {
            const resData = res.data;
                if (resData?.success===false) {
                    const isCheckCaseRecordMidOptions = {
                        isCheckCurrentPage: true,
                        isCheckCompleted: false,
                        isCheckCompletedPrescription: false,
                        isCheckCompletedOrCompletedPrescription: true,
                        isCheckLocked: false,
                        isCheckOrderMedication: false
                    }
                    handleCaseRecordMid({
                        isCheckCaseRecordMidOptions: isCheckCaseRecordMidOptions,
                        resData: resData,
                        dispatch: dispatch
                    })
                } else if (resData?.success) {
                    const notification = {
                        title: 'Doctor or Pharmacist want to prescribe again !',
                        type: 'dopReqPrescribeAgain',
                        uuid_userSent: loginInfor?.uuid, 
                        data: {
                            caseRecord: caseRecord, 
                            pageIndex: (index + 1).toString()
                        }
                    }
                    createNotification({
                        type: 'now',
                        notification: JSON.stringify(notification),
                        status: 'sent',
                        uuid_user: data_doctorOrPharmacist?.doctorOrPharmacist?.uuid_user
                    })
                }
        })
    }

    const list_image = imageAll.map((data, index) => {
        return (
            <CaseRecordPageImage 
                key={ index }
                index={ index }
                editBoolD={ editBoolD }
                onData={ data }
            />
        )
    })

    const list_video = [
        SERVER_ADDRESS_GET_VIDEO, 
        SERVER_ADDRESS_GET_VIDEO, 
        SERVER_ADDRESS_GET_VIDEO,
        SERVER_ADDRESS_GET_VIDEO
    ].map((data, index) => {
        return (
            <div key={index}>
                { editBoolD && <CiCircleRemove size={25} /> }
                <video src={data} muted controls />
            </div>
        )
    })

    const handleCheckColor = (caseRecordMedication, medication, type) => {
        if (type==='number') {
            if (caseRecordMedication <= medication) {
                return 'blue';
            } else {
                return 'red';
            }
        } else if (type==='string') {
            if (caseRecordMedication === medication) {
                return 'blue';
            } else {
                return 'red';
            }
        }
    }

    const caclCost = (medication, caseRecordMedication) => {
        const allCost = medication?.price*caseRecordMedication.amount;
        const discountCost = allCost*medication?.discount/100;
        return allCost - discountCost;
    }

    const handleOrder = () => {
        dispatch(setCaseRecord_orderMedication({
            caseRecord: caseRecord,
            pageNumber: (index + 1).toString()
        }))
        $('.CaseRecordOrder').classList.add('show');
    }

    // check condition for case-record
    useEffect(() => {
        handleCondition_completedStatus();
        handleCondition_completedOrCompletedPrescriptionStatus();
        handleCondition_orderStatus();
        handleCondition_lockedStatus();

        // eslint-disable-next-line
    }, [caseRecord, caseRecordRole, index, caseRecordLock])

    function setUpDataForCRCondition (data, next) {
        data.caseRecord = caseRecord;
        data.caseRecordRole = caseRecordRole;
        data.pageNumber = (index + 1).toString();
        data.caseRecordLockOptions = caseRecordLock;
        next();
    }
    const handleCondition_completedStatus = () => {
        handleCaseRecordCondition(
            setUpDataForCRCondition,
            isCurrentPage,
            isCompleted,
            () => {
                setCompletedStatus(true);
            }
        )
    }
    const handleCondition_completedOrCompletedPrescriptionStatus = () => {
        handleCaseRecordCondition(
            setUpDataForCRCondition,
            isCurrentPage,
            isCompletedOrIsCompletedPrescription,
            () => {
                setCompletedOrCompletedPrescriptionStatus(true);
            }
        )
    }
    const handleCondition_orderStatus = () => {
        handleCaseRecordCondition(
            setUpDataForCRCondition,
            isCurrentPage,
            isCompleted,
            () => {
                if (caseRecordRole==='patient') {
                    setOrderStatus(true);
                }
            }
        )
    }
    const handleCondition_lockedStatus = () => {
        !lockedStatus && handleCaseRecordCondition(
            setUpDataForCRCondition,
            isCurrentPage,
            isLocked,
            () => {
                setLockedStatus(true);
            }
        )
        lockedStatus && handleCaseRecordCondition(
            setUpDataForCRCondition,
            isCurrentPage,
            isNotLocked,
            () => {
                setLockedStatus(false);
            }
        )
    }
    ///

    const medication_list = medicationList.map((data, index) => {
        const caseRecordMedication = data.caseRecordMedication;
        const medication = data.medication;
        return (
            <div className="CaseRecordPage-prescription-medicationList-table list" key={ index }>
                <div>
                    <div><span>Index</span><div>{ index }</div></div>
                    <div>
                        <span>Uid</span>
                        <div>{ caseRecordMedication.uuid_caseRecordMedication }</div>
                    </div>
                    <div>
                        <span>Name</span>
                        <div>
                            { caseRecordMedication.name }
                            { medication && <span className={`CaseRecordPage-prescription-medicationList-table-check ${handleCheckColor(caseRecordMedication.name, medication?.name, 'string')}`}>
                                /{ medication?.name }
                            </span> }
                        </div>
                    </div>
                    <div>
                        <span>Amount</span>
                        <div>
                            { caseRecordMedication.amount }
                            { medication && <span className={`CaseRecordPage-prescription-medicationList-table-check ${handleCheckColor(caseRecordMedication.amount, medication?.amount, 'number')}`}>
                                /{ medication?.amount }
                            </span> }
                        </div>
                    </div>
                    <div>
                        <span>Note</span>
                        { caseRecordMedication.note }
                    </div>
                    <div>
                        <span>Price</span>
                        <div>
                            { caseRecordMedication.price }
                            { medication && <span className={`CaseRecordPage-prescription-medicationList-table-check ${handleCheckColor(caseRecordMedication.price, medication?.price, 'number')}`}>
                                /{ medication?.price }
                            </span> }
                        </div>
                    </div>
                    <div>
                        <span>Cost</span>
                        <div>
                            { caseRecordMedication.cost }
                            { medication && <span className={`CaseRecordPage-prescription-medicationList-table-check ${handleCheckColor(caseRecordMedication.cost, caclCost(medication, caseRecordMedication), 'number')}`}>
                                /{ caclCost(medication, caseRecordMedication) }
                            </span> }
                        </div>
                        <div>
                            <FaArrowDown color="blue" />
                            { `${caseRecordMedication.discount}%` }
                            { medication && <span className={`CaseRecordPage-prescription-medicationList-table-check ${handleCheckColor(caseRecordMedication.discount, medication?.discount, 'number')}`}>
                                /{ `${medication?.discount}%` }
                            </span> }
                        </div>
                    </div>
                </div>
                <div className="CaseRecordPage-prescription-medicationList-table-icon">
                    { completedOrCompletedPrescriptionStatus && caseRecordRole==='patient' &&<IoSend onClick={() => handleRequireDoctorOrPharmacistCheck(caseRecordMedication)} title="Send require to doctor or Pharmacist" color="blue" /> }
                    <IoCheckmark onClick={() => handleCheckMedication(caseRecordMedication, index)} title="Check medication amount" color="blue" size={ 20 } />
                    { completedOrCompletedPrescriptionStatus && caseRecordRole==='doctorOrPharmacist' && <CiEdit onClick={() => showTableEditMedication(caseRecordMedication, index)} title="Edit a medication" color="green" size={ 20 } /> }
                    { completedOrCompletedPrescriptionStatus && caseRecordRole==='doctorOrPharmacist' && <MdDelete onClick={() => showTableDeleteMedication(caseRecordMedication, index)} title="Delete a medication" color="red" size={ 20 } /> }
                </div>
            </div>
        )
    })

    return (
        <div className="CaseRecordPage">
            <h2>Page { index + 1 }</h2>
            <div className="CaseRecordPage-description">
                <div className="CaseRecordPage-description-header">Description of the disease</div>
                <div className="CaseRecordPage-description-iconContainer">
                    { caseRecordRole==='patient' && !completedOrCompletedPrescriptionStatus && <>
                        { editBoolD && <div className="CaseRecordPage-description-icon image" onClick={() => handleAddImages()}>
                            <span>Image</span>
                            <BsFillFileEarmarkImageFill color="white" size={25} />
                        </div> }
                        { editBoolD && <label className="CaseRecordPage-description-icon video" htmlFor='inputVideo'>
                            <span>Video</span>
                            <BsPersonVideo2 color="white" size={25} />
                            <input id='inputVideo' type='file' hidden="hidden" accept="video/mp4, video/mov" multiple />
                        </label> }
                        <div className="CaseRecordPage-description-icon editor" onClick={() => setEditBoolD(true)}>
                            <span>Edit</span>
                            <AiFillEdit color="green" size={25} />
                        </div>
                    </> }
                </div>
                <div className="CaseRecordPage-description-content">
                    { !editBoolD && <div>{ description }</div> }
                    { editBoolD && <textarea value={ description } onChange={(e) => handleEditDesNote(e)} /> }
                </div>
                <div className="CaseRecordPage-description-image">
                    { list_image }
                </div>
                <div className="CaseRecordPage-description-video">
                    { list_video }
                </div>
            </div>
            <div className="CaseRecordPage-prescription">
                <div className="CaseRecordPage-prescription-header">Prescription</div>
                <div className="CaseRecordPage-prescription-iconContainer">
                    { caseRecordRole==='doctorOrPharmacist' && !completedOrCompletedPrescriptionStatus && <>
                        <div className="CaseRecordPage-prescription-icon" onClick={() => handeleEditP()}>
                            <span>Edit</span>
                            <AiFillEdit color="green" size={25} />
                        </div>
                    </> }
                </div>
                <div className="CaseRecordPage-prescription-content">
                    { !editBoolP && <div></div> }
                    { editBoolP && <div><TextEditor /></div> }
                </div>
                <div className="CaseRecordPage-prescription-medicationList">
                    <div><strong>Medication List:</strong></div>
                    { editBoolP && <>
                        <div className="CaseRecordPage-prescription-medicationList-add" onClick={() => handleAddMedication()} title="Add medication">
                            <GrAdd />
                            <span>Add</span>
                        </div>
                    </>}
                    <div className="CaseRecordPage-prescription-medicationList-table header">
                        <div>
                            <div>Index</div>
                            <div>Uid</div>
                            <div title="name">Name</div>
                            <div>Amount</div>
                            <div>Note</div>
                            <div>Price</div>
                            <div>Cost</div>
                        </div>
                        <div className="CaseRecordPage-prescription-medicationList-table-icon">
                            { caseRecordRole==='patient' &&<IoSend onClick={() => handleRequireDoctorOrPharmacistCheckAll()} title="Send require to doctor or Pharmacist" color="blue" /> }
                            <IoCheckmark onClick={() => handleCheckAllMedication()} title="Check all medication amount" color="blue" size={ 20 } />
                            { caseRecordRole==='doctorOrPharmacist' && <CiEdit title="Edit all medications" color="green" size={ 20 } /> }
                            { caseRecordRole==='doctorOrPharmacist' && <MdDelete title="Delete all medications" color="red" size={ 20 } /> }
                        </div>
                    </div>
                    { medication_list }
                </div>
            </div>
            <div className="CaseRecordPage-buttonContainer">
                { caseRecordRole==='doctorOrPharmacist' && 
                    <>{ editBoolP && <button onClick={() => handleSaveP()}>Save Prescription</button> }</> 
                }
                { caseRecordRole==='patient' && 
                    <>{ editBoolD && <button onClick={() => handleSaveD()}>Save Description</button> }</> 
                }
                { lockedStatus 
                    ? <button onClick={() => handleUnLock()}>Un-Lock</button>
                    : <button onClick={() => handleLock()}>Lock</button>
                }
                { caseRecordRole==='patient' && lockedStatus && !completedStatus && <button onClick={() => handleComplete()}>Complete</button> }
                { caseRecordRole==='doctorOrPharmacist' && lockedStatus && !completedOrCompletedPrescriptionStatus && <button onClick={() => handleComplete()}>Complete</button> }
                { caseRecordRole==='doctorOrPharmacist' && completedOrCompletedPrescriptionStatus && <button onClick={() => handleDopReqPrescriptionAgain()}>Require prescription again</button> }
                { orderStatus && !orderMedication && <button onClick={() => handleOrder()}>Order</button> }
                { orderMedication && <p>Medications of this page is order</p> }
            </div>
        </div>
    )
}

export default CaseRecordPage;