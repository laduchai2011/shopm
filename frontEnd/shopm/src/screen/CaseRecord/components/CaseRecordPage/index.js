import React, { useState, useEffect } from "react";
import './styles.css';

import { useDispatch, useSelector } from 'react-redux';
import { AiFillEdit } from 'react-icons/ai';
import { CiCircleRemove } from 'react-icons/ci';
import { GrAdd } from 'react-icons/gr';
import { BsFillFileEarmarkImageFill, BsPersonVideo2 } from 'react-icons/bs';

import TextEditor from "TextEditor";
import { TEGetContent, TESetContent } from "TextEditor/utilize";
import { $$ } from "utilize/Tricks";

import { getCookie, setCookie, deleteCookie } from "auth/cookie";


/**
*@typedef {
*priceTotal: integer,
*status: string,
*description: {
*   note: string,
*   images: [],
*   videos: []
*},
*Prescription: {
*   note: text,
*   medicationList: []    
*}
*} dataPage
*/ 

const CaseRecordPage = () => {
    const KEY_CACHE_CUSTOM = 'caseRecordPageDataPage';
    const index = 0;
    const dispatch = useDispatch();
    const currentIndex = useSelector(state => state.caseRecord.currentIndex);
    const caseRecordPage = useSelector(state => {
        const caseRecordPages = state.caseRecord.caseRecords[currentIndex]?.caseRecordPages;
        if (caseRecordPages && caseRecordPages.length > 0) {
            return caseRecordPages[index];
        }
    });

    const [dataPage, setDataPage] = useState();
    const [editBoolD, setEditBoolD] = useState(false);
    const [editBoolP, setEditBoolP] = useState(false);
    const [dataP, setDataP] = useState('');
    const pageNumber = 0;

    useEffect(() => {
        if (currentIndex!==null) {
            dispatch({type: 'loadMoreCaseRecordPage', payload: 'caseRecordPageInit'});
        }   

        // eslint-disable-next-line
    }, [currentIndex])

    if (currentIndex!==null) {
        window.onscroll = function() {
            const scrollable = window.innerHeight + document.documentElement.scrollTop - document.documentElement.offsetHeight;
            if(scrollable > -10) {
                dispatch({type: 'loadMoreCaseRecordPage', payload: 'caseRecordPageLoadMore'});
            }
        } 
    }

    useEffect(() => {
        if (caseRecordPage) {
            const dataPage_m = JSON.parse(caseRecordPage.dataPage);
            setDataPage(dataPage_m);
        }

        // eslint-disable-next-line
    }, [caseRecordPage])

    useEffect(() => {
        if  (editBoolD || editBoolP) {
            setCookie(KEY_CACHE_CUSTOM, JSON.stringify(dataPage), 30);
        }
    }, [dataPage, editBoolD, editBoolP])

    useEffect(() => {
        if (!editBoolP) {
            const q_prescription = $$('.CaseRecordPage-prescription-content')[pageNumber];
            q_prescription.children[0].innerHTML = dataP;
        } else {
            TESetContent({content: dataP})
        }
    }, [dataP, editBoolP])

    const handleSaveP = () => {
        if (editBoolP) {
            setEditBoolP(false);
            setDataP(TEGetContent());
        }
    }

    const handleSaveD = () => {
        if (editBoolD) {
            deleteCookie(KEY_CACHE_CUSTOM);
            setEditBoolD(false);
        }
    }

    const handeleEditP = () => {
        if (!editBoolP) {
            setEditBoolP(true);
        }
    }

    const handleEditDesNote = (e) => {
        const value = e.target.value;
        setDataPage(pre => {
            return {
                ...pre,
                description: {
                    ...pre.description,
                    note: value
                }
            }
        })
    }

    const list_image = dataPage?.description.images.map((data, index) => {
        return (
            <div key={index}>
                { editBoolD && <CiCircleRemove size={25} /> }
                <img src={data} alt="" />
            </div>
        )
    })

    const list_video = [
        'http://localhost:4040/api/video/',
        'http://localhost:4040/api/video/',
        'http://localhost:4040/api/video/'
    ].map((data, index) => {
        return (
            <div key={index}>
                { editBoolD && <CiCircleRemove size={25} /> }
                <video src={data} muted controls />
            </div>
        )
    })

    // const des_m = 'Description of the disease Description of the disease Description of the disease Description of the disease Description of the disease Description of the disease Description of the disease Description of the disease Description of the disease Description of the disease Description of the disease Description of the disease Description of the disease Description of the disease Description of the disease';

    return (
        <div className="CaseRecordPage">
            <h2>Page { dataPage?.page }</h2>
            <div className="CaseRecordPage-description">
                <div className="CaseRecordPage-description-header">Description of the disease</div>
                <div className="CaseRecordPage-description-iconContainer">
                    { getCookie('caseRecordRole')==='patient' && <>
                        { editBoolD && <div className="CaseRecordPage-description-icon image">
                            <span>Image</span>
                            <BsFillFileEarmarkImageFill color="white" size={25} />
                        </div> }
                        { editBoolD && <div className="CaseRecordPage-description-icon video">
                            <span>Video</span>
                            <BsPersonVideo2 color="white" size={25} />
                        </div> }
                        <div className="CaseRecordPage-description-icon editor" onClick={() => setEditBoolD(true)}>
                            <span>Edit</span>
                            <AiFillEdit color="green" size={25} />
                        </div> 
                    </>}
                </div>
                <div className="CaseRecordPage-description-content">
                    { !editBoolD && <div>{ dataPage?.description.note }</div> }
                    { editBoolD && <textarea value={ dataPage?.description.note } onChange={(e) => handleEditDesNote(e)} /> }
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
                    { editBoolP && <div>
                        <GrAdd />
                        <span>Add</span>
                    </div> }
                </div>
            </div>
            <div className="CaseRecordPage-buttonContainer">
                { getCookie('caseRecordRole')!=='patient' && <button onClick={() => handleSaveP()}>Save Prescription</button> }
                { getCookie('caseRecordRole')==='patient' && <button onClick={() => handleSaveD()}>Save Description</button> }
                <button>Lock</button>
                <button>Un-Lock</button>
            </div>
        </div>
    )
}

export default CaseRecordPage;