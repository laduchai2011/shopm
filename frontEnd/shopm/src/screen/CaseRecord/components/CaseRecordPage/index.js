import React, { useState, useEffect, useContext } from "react";
import './styles.css';

import axios from "axios";
import { useParams } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { 
    setCurrent_caseRecordMedication,
    setCaseRecordLockRd 
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
    SERVER_ADDRESS_GET_VIDEO, 
    SERVER_ADDRESS_GETIMAGE, 
    SERVER_ADDRESS_UPLOADIMAGE,
    SERVER_ADDRESS_PATCH_CASERECORDPAGE
} from "config/server";
import myEvents from "utilize/myEvents";

import { 
    useGetCaseRecordLockQuery,
    useGetCaseRecordDescriptionQuery,
    useGetCaseRecordImageQuery,
    useGetCaseRecordImageAllQuery,
    useGetCaseRecordPrescriptionQuery,
    usePostCaseRecordLockMutation,
    // usePatchCaseRecordDescriptionMutation,
    usePatchCaseRecordImagesMutation,
    usePatchCaseRecordPrescriptionMutation,
    useGetCaseRecordMedicationsAllQuery,
    useDeleteCaseRecordLockMutation
} from "reduxStore/RTKQuery/caseRecordRTKQuery";
import { usePatchCurrentCartMutation } from "reduxStore/RTKQuery/currentCartRTKQuery";
import { useLazyGetMedicationQuery } from "reduxStore/RTKQuery/medicationRTKQuery";
import { useCreateNotificationMutation } from 'reduxStore/RTKQuery/notificationRTKQuery';
import { 
    useGetDoctorOrPharmacistFromCaseRecordQuery
} from "reduxStore/RTKQuery/doctorOrPharmacistRTKQuery";

/**
*@typedef {
*title: string,
*priceTotal: integer,
*pageTotal: integer,
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
*caseRecord: caseRecord,
*caseRecordRole: string, doctorOrPharmacist or patient
*isLock: boolean,
*pageNumber: string
*} caseRecordLockOptions
*/ 

const CaseRecordPage = ({caseRecord, caseRecordRole}) => {
    const { id: uuid_caseRecord } = useParams();
    const index = 0;
    const dispatch = useDispatch();
    const { loginInfor } = useContext(ThemeContextApp); 

    const [createNotification] = useCreateNotificationMutation();

    const [newImages, setNewImages] = useState([]); // [{file: '', blob: ''}]
    const [removeImages, setRemoveImages] = useState([]);
    const [editBoolD, setEditBoolD] = useState(false);
    const [editBoolP, setEditBoolP] = useState(false);

    const [postCaseRecordLock] = usePostCaseRecordLockMutation();
    // const [patchCaseRecordDescription] = usePatchCaseRecordDescriptionMutation();
    const [patchCaseRecordImages] = usePatchCaseRecordImagesMutation();
    const [patchCaseRecordPrescription] = usePatchCaseRecordPrescriptionMutation();
    const [patchCurrentCart] = usePatchCurrentCartMutation();
    const [getMedication] = useLazyGetMedicationQuery();
    const [deleteCaseRecordLock] = useDeleteCaseRecordLockMutation();

    const {
        data: data_description, 
        // isFetching: isFetching_description, 
        isError: isError_description,
        error: error_description
    } = useGetCaseRecordDescriptionQuery({uuid_caseRecord: uuid_caseRecord, pageNumber: index + 1});
    const [description, setDescription] = useState();

    const {
        data: data_image, 
        // isFetching: isFetching_image, 
        isError: isError_image,
        error: error_image
    } = useGetCaseRecordImageQuery({uuid_caseRecord: uuid_caseRecord, pageNumber: index + 1});
    const [images, setImages] = useState([]);

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

    // description
    useEffect(() => {
        isError_description && console.log(error_description);
    }, [isError_description, error_description])
    useEffect(() => {
        const resData = data_description;
        setDescription(resData?.caseRecordDescription?.description);
    }, [data_description])

    // image
    useEffect(() => {
        isError_image && console.log(error_image);
    }, [isError_image, error_image])
    useEffect(() => {
        // const resData = data_image;
        // if (resData?.success) {
        //     if (resData?.caseRecordImage !== null) {
        //         setImages(JSON.parse(resData.caseRecordImage.images).images);
        //     }
        // }
    }, [data_image])

    useEffect(() => {
        isError_imageAll && console.log(error_imageAll);
    }, [isError_imageAll, error_imageAll])
    useEffect(() => {
        const resData = data_imageAll;
        console.log('imageAll', resData)
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
        setCaseRecordLock(data_caseRecordLock?.caseRecordLock);
    }, [data_caseRecordLock])

    useEffect(() => {
        return () => {
            for (let i = 0; i < newImages.length; i++) {
                URL.revokeObjectURL(newImages.blob);
            }
        }
        // eslint-disable-next-line
    }, [])

    const handleSaveP = () => {
        if (editBoolP) {
            setEditBoolP(false);
            patchCaseRecordPrescription({
                caseRecord: caseRecord,
                uuid_caseRecordPrescription: data_prescription?.caseRecordPrescription?.uuid_caseRecordPrescription,
                prescription: TEGetContent(index),
                pageNumber: (index + 1).toString()
            }).then(res => {
                const resData = res.data
                if (!resData.success) {
                    dispatch(setCaseRecordLockRd({caseRecordLockOptions: resData.caseRecordLockOptions}));
                }
            }).catch(err => console.error(err))
        }
    }

    // update with patient
    useEffect(() => {
        // filter images removed
        myEvents.on('filterRemovedImages-start', ({cpNewImages, cpImages}) => {
            const filterNewImages = cpNewImages.filter(image => removeImages.indexOf(image.blob) === -1);
            const filterImages = cpImages.filter(image => (removeImages.indexOf(image) === -1) && (image.indexOf('blob') === -1));

            myEvents.emit('filterRemovedImages-success', ({filterNewImages, filterImages}));
        })

        // upload new Images
        myEvents.on('uploadNewImages-start', ({filterNewImages, filterImages}) => {
            if (filterNewImages.length > 0) {
                const formData = new FormData();
                filterNewImages.forEach(image => formData.append("file", image.file));
                axios.post(
                    SERVER_ADDRESS_UPLOADIMAGE,
                    formData,
                    {
                        withCredentials: true, 
                    }
                ).then(res => {
                    const resData= res.data;
                    if (resData.success) {
                        const paths = res.data.paths;
                        const imageUrls = [];
                        paths.forEach(path => imageUrls.push(`${SERVER_ADDRESS_GETIMAGE}/${path}`));
                        const imageUrls_filterNewImages = imageUrls;
                        myEvents.emit('uploadNewImages-success', ({imageUrls_filterNewImages, filterImages}));
                    } else {
                        alert(resData.message);
                    }
                }).catch(err => console.error(err));
            } else {
                const imageUrls_filterNewImages = [];
                myEvents.emit('uploadNewImages-success', ({imageUrls_filterNewImages, filterImages}));
            }
        })

        // add new image Urls to description in dataPage
        myEvents.on('concatImageUrls-start', ({imageUrls_filterNewImages, filterImages}) => {
            const finalImages = filterImages.concat(imageUrls_filterNewImages);
            myEvents.emit('concatImageUrls-success', finalImages);
        })

        // update database
        myEvents.on('updateDB-start', finalImages => {
            let data;
            let err;

            const caseRecordDescriptionOptions = {
                pageNumber: (index + 1).toString(),
                description: description,
                status: 'editting',
                uuid_caseRecord: uuid_caseRecord
            }

            const caseRecordImageOptions = {
                pageNumber: (index + 1).toString(),
                images: JSON.stringify({images: finalImages}),
                status: 'editting',
                uuid_caseRecord: uuid_caseRecord
            }

            const caseRecordVideoOptions = {
                pageNumber: (index + 1).toString(),
                videos: JSON.stringify({videos: 'videos'}),
                status: 'editting',
                uuid_caseRecord: uuid_caseRecord
            }

            patchCaseRecordImages({
                caseRecord: caseRecord,
                uuid_caseRecordImage: data_image?.caseRecordImage?.uuid_caseRecordImage,
                images: JSON.stringify({images: finalImages}),
                pageNumber: (index + 1).toString()
            }).then(res => {
                const resData = res.data
                if (!resData.success) {
                    dispatch(setCaseRecordLockRd({caseRecordLockOptions: resData.caseRecordLockOptions}));
                }
            }).catch(err => console.error(err))

            axios({
                method: 'patch',
                url: SERVER_ADDRESS_PATCH_CASERECORDPAGE,
                withCredentials: true,
                data: {
                    caseRecordDescriptionOptions,
                    caseRecordImageOptions,
                    caseRecordVideoOptions
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                const resData = res.data;
                data = resData;
            }).catch(error => {
                err = error;
            }).finally(() => {
                myEvents.emit('updateDB-finally', ({data, err}));
            })
        })

    }, [newImages, removeImages, description, uuid_caseRecord, caseRecord, data_image?.caseRecordImage?.uuid_caseRecordImage, dispatch, patchCaseRecordImages])

    const handleSaveD = () => {
        if (editBoolD) {
            myEvents.on('updateDB-finally', ({data, err}) => {
                if (err) console.error(err);
                // console.log(data);
                setEditBoolD(false);
            })

            myEvents.on('concatImageUrls-success', finalImages => {
                // console.log('concatImageUrls-success')
                myEvents.emit('updateDB-start', finalImages)
            })

            myEvents.on('uploadNewImages-success', ({imageUrls_filterNewImages, filterImages}) => {
                // console.log('uploadNewImages-success')
                myEvents.emit('concatImageUrls-start', ({imageUrls_filterNewImages, filterImages}))
            })

            myEvents.on('filterRemovedImages-success', ({filterNewImages, filterImages}) => {
                // console.log('filterRemovedImages-success')
                myEvents.emit('uploadNewImages-start', ({filterNewImages, filterImages}))
            })

            const cpNewImages = [...newImages];
            const cpImages = [...images];
            myEvents.emit('filterRemovedImages-start', ({cpNewImages, cpImages}));
        
            // patchCaseRecordDescription({
            //     caseRecord: caseRecord,
            //     uuid_caseRecordDescription: data_description?.caseRecordDescription?.uuid_caseRecordDescription,
            //     prescription: TEGetContent(index),
            //     pageNumber: (index + 1).toString()
            // }).then(res => {
            //     const resData = res.data
            //     if (!resData.success) {
            //         dispatch(setCaseRecordLockRd({caseRecordLockOptions: resData.caseRecordLockOptions}));
            //     }
            // }).catch(err => console.error(err))
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

    // const handleUnRemoveImages = (data) => {
    //     const cpRemoveImages = [...removeImages];
    //     cpRemoveImages.splice(cpRemoveImages.indexOf(data), 1);
    //     setRemoveImages(cpRemoveImages);
    // }

    const handleAddImages = (e) => {
        const files = e.target.files;
        const newImagePaths = [];
        const newImages_m = []; // [{title: '', file: '', blob: ''}]
        for (let i = 0; i < files.length; i++) {
            const blob = URL.createObjectURL(files[i]);
            newImagePaths.push(blob);
            newImages_m.push({
                file: files[i],
                blob: blob
            })
        }
        const cpImages = [...images];
        const finalImages = cpImages.concat(newImagePaths);
        setImages(finalImages);
        setNewImages(pre => pre.concat(newImages_m));
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
                pageIndex: index + 1,
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
                pageIndex: index + 1
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
            caseRecord: caseRecord,
            pageNumber: (index + 1).toString()
        }).then(res => {
            const resData = res.data
            if (!resData.success) {
                dispatch(setCaseRecordLockRd({caseRecordLockOptions: resData.caseRecordLockOptions}));
            }
        }).catch(err => console.error(err))
    }

    const handleUnLock = () => {
        deleteCaseRecordLock({
            caseRecord: caseRecord,
            pageNumber: (index + 1).toString()
        }).then(res => {
            console.log('deleteCaseRecordLock', res.data)
        })
    }

    // const handleEditImageTitle = (e) => {
    //     const value = e.target.value;
    // }

    // const list_image = imageAll.map((data, index) => {
    //     return (
    //         <div key={index}>
    //             { editBoolD && 
    //                 <>
    //                     { 
    //                         removeImages.indexOf(data) < 0 ?  
    //                         <CiCircleRemove onClick={() => setRemoveImages(pre => [...pre, data])} size={25} /> : 
    //                         <div onClick={() => handleUnRemoveImages(data)}>Un-Remove</div>
    //                     }
    //                 </>
    //             }
    //             <img src={ data.image } alt="" />
    //             { !editBoolD && <span>{ data.title }</span> }
    //             { editBoolD && <input value={ data.title } onChange={(e) => handleEditImageTitle(e)} />}
    //         </div>
    //     )
    // })

    const list_image = imageAll.map((data, index) => {
        return (
            <CaseRecordPageImage 
                key={ index }
                editBoolD={ editBoolD }
                onData={ data }
                removeImages={removeImages}
                setRemoveImages={ setRemoveImages }
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
                    { caseRecordRole==='patient' &&<IoSend onClick={() => handleRequireDoctorOrPharmacistCheck(caseRecordMedication)} title="Send require to doctor or Pharmacist" color="blue" /> }
                    <IoCheckmark onClick={() => handleCheckMedication(caseRecordMedication, index)} title="Check medication amount" color="blue" size={ 20 } />
                    { caseRecordRole==='doctorOrPharmacist' && <CiEdit onClick={() => showTableEditMedication(caseRecordMedication, index)} title="Edit a medication" color="green" size={ 20 } /> }
                    { caseRecordRole==='doctorOrPharmacist' && <MdDelete onClick={() => showTableDeleteMedication(caseRecordMedication, index)} title="Delete a medication" color="red" size={ 20 } /> }
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
                    { caseRecordRole==='patient' && <>
                        { editBoolD && <label className="CaseRecordPage-description-icon image" htmlFor='inputImg'>
                            <span>Image</span>
                            <BsFillFileEarmarkImageFill color="white" size={25} />
                            <input id='inputImg' type='file' hidden="hidden" accept="image/*" multiple onChange={(e) => handleAddImages(e)} />
                        </label> }
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
                    { caseRecordRole!=='patient' &&
                        <div className="CaseRecordPage-prescription-icon" onClick={() => handeleEditP()}>
                            <span>Edit</span>
                            <AiFillEdit color="green" size={25} />
                        </div>
                    }
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
                { caseRecordRole!=='patient' && 
                    <>{ editBoolP && <button onClick={() => handleSaveP()}>Save Prescription</button> }</> 
                }
                { caseRecordRole==='patient' && 
                    <>{ editBoolD && <button onClick={() => handleSaveD()}>Save Description</button> }</> 
                }
                { (caseRecordLock?.isLock && caseRecordLock?.caseRecordRole===caseRecordRole) 
                    ? <button onClick={() => handleUnLock()}>Un-Lock</button>
                    : <button onClick={() => handleLock()}>Lock</button>
                } 
            </div>
        </div>
    )
}

export default CaseRecordPage;