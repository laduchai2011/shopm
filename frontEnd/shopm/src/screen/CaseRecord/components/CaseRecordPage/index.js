import React, { useState, useEffect } from "react";
import './styles.css';

import axios from "axios";
import { useParams } from "react-router-dom";

import { AiFillEdit } from 'react-icons/ai';
import { CiCircleRemove, CiEdit } from 'react-icons/ci';
import { GrAdd } from 'react-icons/gr';
import { BsFillFileEarmarkImageFill, BsPersonVideo2 } from 'react-icons/bs';
import { IoCheckmark } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

import TextEditor from "TextEditor";
import { TEGetContent, TESetContent } from "TextEditor/utilize";
import { $, $$ } from "utilize/Tricks";

import MedicationTableDelete from "./components/MedicationTable/MedicationTableDelete";
import MedicationTableEdit from "./components/MedicationTable/MedicationTableEdit";

import { 
    SERVER_ADDRESS_GET_VIDEO, 
    SERVER_ADDRESS_GETIMAGE, 
    SERVER_ADDRESS_UPLOADIMAGE,
    SERVER_ADDRESS_PATCH_CASERECORDPAGE 
} from "config/server";
import { getCookie } from "auth/cookie";
import myEvents from "utilize/myEvents";

import { 
    useGetCaseRecordDescriptionQuery,
    useGetCaseRecordImageQuery 
} from "reduxStore/RTKQuery/caseRecordRTKQuery";

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
*images: text,
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

const CaseRecordPage = () => {
    const { id: uuid_caseRecord } = useParams();
    const index = 0;

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

    useEffect(() => {
        isError_description && console.log(error_description);
    }, [isError_description, error_description])
    useEffect(() => {
        const resData = data_description;
        setDescription(resData?.caseRecordDescription?.description);
    }, [data_description])

    useEffect(() => {
        isError_image && console.log(error_image);
    }, [isError_image, error_image])
    useEffect(() => {
        const resData = data_image;
        if (resData?.success) {
            if (resData?.caseRecordImage!==null) {
                setImages(JSON.parse(resData.caseRecordImage.images).images);
            }
        }
    }, [data_image])

    const [newImages, setNewImages] = useState([]); // [{file: '', blob: ''}]
    const [removeImages, setRemoveImages] = useState([]);
    const [editBoolD, setEditBoolD] = useState(false);
    const [editBoolP, setEditBoolP] = useState(false);
    const [dataP, setDataP] = useState('');

    useEffect(() => {
        if (!editBoolP) {
            const q_prescription = $$('.CaseRecordPage-prescription-content')[index];
            q_prescription.children[0].innerHTML = dataP;
        } else {
            TESetContent({content: dataP})
        }
    }, [dataP, editBoolP])

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
            setDataP(TEGetContent());
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
                pageNumber: index + 1,
                description: description,
                status: 'editting',
                uuid_caseRecord: uuid_caseRecord
            }

            const caseRecordImageOptions = {
                pageNumber: index + 1,
                images: JSON.stringify({images: finalImages}),
                status: 'editting',
                uuid_caseRecord: uuid_caseRecord
            }

            const caseRecordVideoOptions = {
                pageNumber: index + 1,
                videos: JSON.stringify({videos: 'videos'}),
                status: 'editting',
                uuid_caseRecord: uuid_caseRecord
            }

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

    }, [newImages, removeImages, description, uuid_caseRecord])

    const handleSaveD = () => {
        if (editBoolD) {
            myEvents.on('updateDB-finally', ({data, err}) => {
                if (err) console.error(err);
                console.log(data);
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

    const handleUnRemoveImages = (data) => {
        const cpRemoveImages = [...removeImages];
        cpRemoveImages.splice(cpRemoveImages.indexOf(data), 1);
        setRemoveImages(cpRemoveImages);
    }

    const handleAddImages = (e) => {
        const files = e.target.files;
        const newImagePaths = [];
        const newImages_m = []; // [{file: '', blob: ''}]
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
        console.log('handleAddMedication')
    }

    const showTableDeleteMedication = () => {
        const q_medicationDelete = $('.MedicationTableDelete');
        q_medicationDelete.classList.add('show');
    }

    const showTableEditMedication = () => {
        const q_medicationEdit = $('.MedicationTableEdit');
        q_medicationEdit.classList.add('show');
    }

    const list_image = images.map((data, index) => {
        return (
            <div key={index}>
                { editBoolD && 
                    <>
                        { 
                            removeImages.indexOf(data) < 0 ?  
                            <CiCircleRemove onClick={() => setRemoveImages(pre => [...pre, data])} size={25} /> : 
                            <div onClick={() => handleUnRemoveImages(data)}>Un-Remove</div>
                        }
                    </>
                }
                <img src={data} alt="" />
            </div>
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

    const medication_list = [1,2,3,4,5,6,7,8,9,10].map((data, index) => {
        return (
            <div className="CaseRecordPage-prescription-medicationList-table list" key={ index }>
                <div>
                    <div><span>Index</span><div>{ data }</div></div>
                    <div><span>Uid</span><div>sdfff45634thf</div></div>
                    <div><span>Name</span><div>laduchai</div></div>
                    <div><span>Amount</span>43</div>
                    <div><span>Note</span>dfgf dsfsdkfh sdfk sdif</div>
                    <div><span>Price</span>222.222.132</div>
                    <div><span>Cost</span>465.123.213</div>
                </div>
                <div className="CaseRecordPage-prescription-medicationList-table-icon">
                    <IoCheckmark title="Check medication amount" color="blue" size={ 20 } />
                    { getCookie('caseRecordRole')==='doctorOrPharmacist' && <CiEdit onClick={() => showTableEditMedication()} title="Edit a medication" color="green" size={ 20 } /> }
                    { getCookie('caseRecordRole')==='doctorOrPharmacist' && <MdDelete onClick={() => showTableDeleteMedication()} title="Delete a medication" color="red" size={ 20 } /> }
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
                    { getCookie('caseRecordRole')==='patient' && <>
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
                    { getCookie('caseRecordRole')!=='patient' &&
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
                            <IoCheckmark title="Check all medication amount" color="blue" size={ 20 } />
                            { getCookie('caseRecordRole')==='doctorOrPharmacist' && <CiEdit title="Edit all medications" color="green" size={ 20 } /> }
                            { getCookie('caseRecordRole')==='doctorOrPharmacist' && <MdDelete title="Delete all medications" color="red" size={ 20 } /> }
                        </div>
                    </div>
                    { medication_list }
                </div>
            </div>
            <div className="CaseRecordPage-buttonContainer">
                { getCookie('caseRecordRole')!=='patient' && 
                    <>{ editBoolP && <button onClick={() => handleSaveP()}>Save Prescription</button> }</> 
                }
                { getCookie('caseRecordRole')==='patient' && 
                    <>{ editBoolD && <button onClick={() => handleSaveD()}>Save Description</button> }</> 
                }
                <button>Lock</button>
                <button>Un-Lock</button>
            </div>
            <MedicationTableDelete />
            <MedicationTableEdit />
        </div>
    )
}

export default CaseRecordPage;