import React, { useState, useEffect } from "react";
import './styles.css';

// import { useSelector, useDispatch } from 'react-redux';
import { AiFillEdit } from 'react-icons/ai';
import { CiCircleRemove } from 'react-icons/ci';
import { GrAdd } from 'react-icons/gr';

import TextEditor from "TextEditor";
import { TEGetContent, TESetContent } from "TextEditor/utilize";
import { $$ } from "utilize/Tricks";



const CaseRecordPage = () => {
    // const count = useSelector((state) => state.counter.value);
    // const dispatch = useDispatch();

    const [editBoolD, setEditBoolD] = useState(false);
    const [editBoolP, setEditBoolP] = useState(false);
    const [dataP, setDataP] = useState('');
    const pageNumber = 0;

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

    const handeleEditP = () => {
        if (!editBoolP) {
            setEditBoolP(true);
        }
    }

    const list_image = [
        "https://tse4.mm.bing.net/th?id=OIP.dnIFStfOAP-S9CjvmIDM-wHaEH&pid=Api&P=0&h=180",
        "https://tse4.mm.bing.net/th?id=OIP.dnIFStfOAP-S9CjvmIDM-wHaEH&pid=Api&P=0&h=180",
        "https://tse4.mm.bing.net/th?id=OIP.dnIFStfOAP-S9CjvmIDM-wHaEH&pid=Api&P=0&h=180",
        "https://tse4.mm.bing.net/th?id=OIP.dnIFStfOAP-S9CjvmIDM-wHaEH&pid=Api&P=0&h=180",
        "https://tse4.mm.bing.net/th?id=OIP.dnIFStfOAP-S9CjvmIDM-wHaEH&pid=Api&P=0&h=180"
    ].map((data, index) => {
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

    const des_m = 'Description of the disease Description of the disease Description of the disease Description of the disease Description of the disease Description of the disease Description of the disease Description of the disease Description of the disease Description of the disease Description of the disease Description of the disease Description of the disease Description of the disease Description of the disease';

    return (
        <div className="CaseRecordPage">
            <h2>Page 1</h2>
            <div className="CaseRecordPage-description">
                <div className="CaseRecordPage-description-header">Description of the disease</div>
                <div className="CaseRecordPage-description-iconContainer">
                    <div className="CaseRecordPage-description-icon" onClick={() => setEditBoolD(true)}>
                        <span>Edit</span>
                        <AiFillEdit color="green" size={25} />
                    </div>
                </div>
                <div className="CaseRecordPage-description-content">
                    
                    { !editBoolD && <div>{ des_m }</div> }
                    { editBoolD && <textarea value={ des_m } /> }
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
                    <div className="CaseRecordPage-prescription-icon" onClick={() => handeleEditP()}>
                        <span>Edit</span>
                        <AiFillEdit color="green" size={25} />
                    </div>
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
                <button onClick={() => handleSaveP()}>Save Prescription</button>
                <button onClick={() => setEditBoolD(false)}>Save Description</button>
                <button>Lock</button>
                <button>Un-Lock</button>
            </div>
        </div>
    )
}

export default CaseRecordPage;