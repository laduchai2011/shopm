import React, { useState, useEffect, useRef } from "react";
import './styles.css';

import axios from "axios";
import { useParams } from "react-router-dom";

import { FcImageFile } from 'react-icons/fc';
import { MdOutlineAddBox } from 'react-icons/md';
import { GrSubtractCircle } from 'react-icons/gr';
import { TbRefresh } from 'react-icons/tb'; 
import { TiDeleteOutline } from 'react-icons/ti';

import MedicationAddToastMessage from "./components/MedicationAddToastMessage";

import Header from "screen/Header";
import TextEditor from "TextEditor";
import { TEGetContent } from "TextEditor/utilize";
import { 
    SERVER_ADDRESS_CREATE_MEDICATION, 
    SERVER_ADDRESS_UPLOADIMAGE, 
    SERVER_ADDRESS_GETIMAGE 
} from "config/server";
import { $, $$ } from "utilize/Tricks";

/**
*@typedef {
*name: string,
*title: string,
*avatar: string,
*subject: string,
*object: string,
*symptom: string,
*type: string,
*price: float,
*note: string,
*catalog: text,
*information: text,
*amount: integer,
*sold: integer,
*discount: float,
*averageRating: float,
*rateCount: integer,
*status: string
*uuid_provider: uuid
*} medicateOptions
*/ 

/**
*@typedef {
*url: string,
*status: string,
*uuid_medication: uuid
*} medicationImageOptions
*/

/**
*@typedef {
*url: string,
*status: string,
*uuid_medication: uuid
*} medicationVideoOptions
*/

/**
 * @typedef {import('define/medication').medicateOptions} medicateOptions
*/

const MedicationAdd = () => {

    const { id: uuid_provider } = useParams();

    const [images, setImages] = useState([]); // [{file: '', blob: ''}]
     /** @type {[medicateOptions, React.Dispatch<React.SetStateAction<medicateOptions>>]} */
    const [inputs, setInputs] = useState({
        id: undefined,
        uuid_medication: undefined,
        name: '',
        title: '',
        avatar: '',
        subject: '',
        object: '',
        type: '',
        symptom: '',
        price: 0,
        note: '',
        catalog: '',
        information: '',
        amount: 0,
        sold: 0,
        discount: 0,
        averageRating: 0,
        rateCount: 0,
        status: 'normal',
        uuid_provider: uuid_provider
    });

    const [catalogs, setCatalogs] = useState([{
        subject: '',
        content: ''
    }])

    const submit = useRef(false);

    useEffect(() => {
        return () => {
            for (let i = 0; i < images.length; i++) {
                URL.revokeObjectURL(images[i].blob);
            }
        }

        // eslint-disable-next-line
    }, [])

    const handleInput = (e, type) => {
        const value = e.target.value;
        const q_inputBlock = $$('.MedicationAdd-inputBlock');

        let new_input = {...inputs};

        switch(type) {
            case 'name':
                new_input.name = value;
                // q_inputBlock[0].children[1].classList.remove('showEmptyTitle');
                break;

            case 'title':
                new_input.title = value;
                // q_inputBlock[1].children[1].classList.remove('showEmptyTitle');
                break;
            
            case 'subject':
                new_input.subject = value;
                break;
            
            case 'object':
                new_input.object = value;
                break;

            case 'type':
                new_input.type = value;
                break;

            case 'symptom':
                new_input.symptom = value;
                break;

            case 'note':
                new_input.note = value;
                break;
            
            case 'price':
                if (isNaN(value)) {
                    new_input.price = value;
                    q_inputBlock[7].children[1].classList.add('showErrorPrice');
                } else {
                    new_input.price = Number(value);
                    q_inputBlock[7].children[1].classList.remove('showErrorPrice');
                }
                break;

            case 'amount':
                if (isNaN(value)) {
                    new_input.amount = value;
                    q_inputBlock[8].children[1].classList.add('showErrorAmount');
                } else {
                    new_input.amount = Number(value);
                    q_inputBlock[8].children[1].classList.remove('showErrorAmount');
                }
                break;

            case 'discount':
                if (isNaN(value)) {
                    new_input.discount = value;
                    q_inputBlock[9].children[1].classList.add('showErrorDiscount');
                } else {
                    new_input.discount = Number(value);
                    q_inputBlock[9].children[1].classList.remove('showErrorDiscount');
                }
                break;

            default:
                throw new Error('Invalid action.');
        }

        setInputs(new_input);
    }

    const handleImageInput = (e) => {
        const files = e.target.files;

        const newImages = [];

        for (let i = 0; i < files.length; i++) {
            const newImage = {
                file: files[i],
                blob: URL.createObjectURL(files[i])
            }

            newImages.push(newImage);
        }
        
        setImages(pre => pre.concat(newImages));
    }

    const handleDeleteImage = (index) => {
        const coppyImages = [...images];

        URL.revokeObjectURL(coppyImages[index].blob);
        coppyImages.splice(index, 1);

        setImages(coppyImages);
    }

    const uploadImage = (files, callback) => {
        if (files.length > 0) {
            const formData = new FormData();
            files.forEach(file => formData.append("file", file))
            axios.post(
                SERVER_ADDRESS_UPLOADIMAGE,
                formData,
                {
                    withCredentials: true, 
                }
            ).then(res => {
                if (res.data.status) {
                    const paths = res.data.paths;
                    const imageUrls = [];
                    paths.forEach(path => imageUrls.push(`${SERVER_ADDRESS_GETIMAGE}/${path}`))
                    callback(imageUrls);
                }
            }).catch(err => console.error(err));
        }  else {
            const imageUrls = [];
            callback(imageUrls);
        }
    }

    const handleSubmit = () => {
        const q_inputBlock = $$('.MedicationAdd-inputBlock');
        const q_toastMessage = $('.MedicationAddToastMessage');

        const inputsCoppy = {...inputs}

        if (inputsCoppy.title.length <= 0) {
            q_inputBlock[1].children[1].classList.add('showEmptyTitle');
            window.scrollTo(0, 0);
        } else {
            if (!submit.current) {
                submit.current = true;

                q_toastMessage.classList.add('active');
                q_toastMessage.classList.add('MedicationAddToastMessage-loading');

                // fillter empty catalog
                const newCatalogs = [];
                for (let i = 0; i < catalogs.length; i++) {
                    if (catalogs[i].subject.length > 0) {
                        newCatalogs.push(catalogs[i])
                    }
                }
                inputsCoppy.catalog = JSON.stringify({catalogs: newCatalogs})

                inputsCoppy.information = TEGetContent(0);

                const imageFiles = [];
                for (let i = 0; i < images.length; i++) {
                    imageFiles.push(images[i].file)
                }   

                setTimeout(() => {
                    uploadImage(imageFiles, (imageUrls) => {
                        if (imageUrls[0]) {
                            inputsCoppy.avatar = imageUrls[0]
                        }

                        const medicationImageOptionsArray = [];

                        for (let i = 0; i < imageUrls.length; i++) {
                            const medicationImageOptionsArray_c = {
                                url: imageUrls[i],
                                status: 'normal',
                                uuid_medication: ''
                            }
                            medicationImageOptionsArray.push(medicationImageOptionsArray_c);
                        }

                        const createMedicationOptions = {
                            medicationOptions: inputsCoppy,
                            medicationImageOptionsArray: medicationImageOptionsArray,
                            medicationVideoOptionsArray: []
                        }
            
                        axios({
                            method: 'post',
                            url: SERVER_ADDRESS_CREATE_MEDICATION,
                            withCredentials: true,
                            data: {
                                uuid_provider: uuid_provider,
                                createMedicationOptions: createMedicationOptions
                            },
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(res => {
                            const resData = res.data;
                            console.log(resData)
                            if (resData?.success) {
                                q_toastMessage.classList.remove('MedicationAddToastMessage-loading');
                                q_toastMessage.classList.add('MedicationAddToastMessage-success');
                            } else {
                                q_toastMessage.classList.remove('MedicationAddToastMessage-loading');
                                q_toastMessage.classList.add('MedicationAddToastMessage-failure');
                                alert(resData.message)
                            }
                        }).catch(error => {
                            console.error(error);
                            q_toastMessage.classList.remove('MedicationAddToastMessage-loading');
                            q_toastMessage.classList.add('MedicationAddToastMessage-failure');
                        }).finally(() => {
                            setTimeout(() => {
                                q_toastMessage.classList.remove('MedicationAddToastMessage-loading');
                                q_toastMessage.classList.remove('MedicationAddToastMessage-failure');
                                q_toastMessage.classList.remove('MedicationAddToastMessage-success');
                                q_toastMessage.classList.remove('active');
                                submit.current = false;
                            }, 3000)
                        })
                    })
                }, 1500)
            }
        }
    }

    const handleCatalog = (e, type, index) => {
        const value = e.target.value;
        const newCatalogs = [...catalogs];

        switch(type) {
            case 'subject':
                newCatalogs[index].subject = value;
                break;

            case 'content':
                newCatalogs[index].content = value;
                break;

            default:
                throw new Error('Invalid action.');
        }

        setCatalogs(newCatalogs);
    }

    const handleSetSelling = () => {
        const checkboxSelling = document.getElementById('MedicationAdd-sellingId');
        const checkedSelling = checkboxSelling.checked;
        if (checkedSelling) {
            setInputs({
                ...inputs,
                status: 'selling'
            })
        } else {
            setInputs({
                ...inputs,
                status: 'stop'
            })
        }
    }

    const list_catalog = catalogs.map((data, index) => {
        return (
            <div className="MedicationAdd-catalogBox" key={index}>
                <div>
                    <input maxLength={100} value={data.subject} onChange={(e) => handleCatalog(e, 'subject', index)} />
                    <span>subject</span>
                </div>
                <div>
                    <input maxLength={100} value={data.content} onChange={(e) => handleCatalog(e, 'content', index)} />
                    <span>content</span>
                </div>
            </div>
        )
    })

    const list_image = images.map((data, index) => {
        return (
            <div key={index}>
                <TiDeleteOutline onClick={() => handleDeleteImage(index)} size={25} />
                <img src={ data.blob } alt=""/>
            </div>
        )
    })

    return (
        <div className="MedicationAdd">
            <Header />
            <div className="MedicationAdd-main">
                <h1>Add Medication</h1>
                <div className="MedicationAdd-inputBlock">
                    <div>
                        <div>Name</div>
                        <input value={inputs.name} onChange={(e) => handleInput(e, 'name')} maxLength={25} />
                        <span>max 25</span> 
                    </div>
                    <div></div>
                </div>
                <div className="MedicationAdd-inputBlock">
                    <div>
                        <div>Title</div>
                        <input value={inputs.title} onChange={(e) => handleInput(e, 'title')} maxLength={50} />
                        <span>max 50</span> 
                    </div>
                    <div></div>
                </div>
                <div className="MedicationAdd-inputBlock">
                    <div>
                        <div>Subject</div>
                        <input value={inputs.subject} onChange={(e) => handleInput(e, 'subject')} maxLength={25} />
                        <span>max 25</span> 
                    </div>
                </div>
                <div className="MedicationAdd-inputBlock">
                    <div>
                        <div>Object</div>
                        <input value={inputs.object} onChange={(e) => handleInput(e, 'object')} maxLength={25} />
                        <span>max 25</span>
                    </div>
                </div>
                <div className="MedicationAdd-inputBlock">
                    <div>
                        <div>Symptom</div>
                        <input value={inputs.symptom} onChange={(e) => handleInput(e, 'symptom')} maxLength={125} />
                        <span>max 125</span>
                    </div>
                </div>
                <div className="MedicationAdd-inputBlock">
                    <div>
                        <div>Type</div>
                        <input value={inputs.type} onChange={(e) => handleInput(e, 'type')} maxLength={25} />
                        <span>max 25</span>
                    </div>
                </div>
                <div className="MedicationAdd-inputBlock">
                    <div>
                        <div>Note</div>
                        <input value={inputs.note} onChange={(e) => handleInput(e, 'note')} maxLength={125} />
                        <span>max 125</span>
                    </div>
                </div>
                <div className="MedicationAdd-inputBlock">
                    <div>
                        <div>Price</div>
                        <input value={inputs.price} onChange={(e) => handleInput(e, 'price')} maxLength={25} placeholder="$ / type" />
                        <span>$</span>
                    </div>
                    <div></div>
                </div>
                <div className="MedicationAdd-inputBlock">
                    <div>
                        <div>Amount</div>
                        <input value={inputs.amount} onChange={(e) => handleInput(e, 'amount')} maxLength={25} placeholder="amount" />
                        <span>Unit (Type)</span>
                    </div>
                    <div></div>
                </div>
                <div className="MedicationAdd-inputBlock">
                    <div>
                        <div>Discount</div>
                        <input value={inputs.discount} onChange={(e) => handleInput(e, 'discount')} maxLength={25} placeholder="discount" />
                        <span>%</span>
                    </div>
                    <div></div>
                </div>
                <div className="MedicationAdd-imageBlock">
                    <label className="MedicationAdd-imageIcon" htmlFor='inputImg'>
                        <span>Image</span>
                        <FcImageFile size={35} />
                        <input id='inputImg' type='file' hidden="hidden" accept="image/*" multiple onChange={(e) => handleImageInput(e)} />
                    </label>
                    <div className="MedicationAdd-imageBlock-imageContainer">
                        { list_image }
                    </div>
                </div>
                <div className="MedicationAdd-catalogBlock">
                    <div>Catalog</div>
                    <div className="MedicationAdd-catalogContainer">
                        { list_catalog }
                        <div className="MedicationAdd-catalogBtn">
                            <MdOutlineAddBox color="red" size={20} onClick={() => setCatalogs(pre => [...pre, {subject: '', content: ''}])} />
                            <GrSubtractCircle color="gray" size={20} onClick={() => {
                                const newCatalogs = [...catalogs]
                                newCatalogs.pop()
                                setCatalogs(newCatalogs)
                            }} />
                            <TbRefresh color="blue" size={20} onClick={() => setCatalogs([{subject: '', content: ''}])} />
                        </div>
                    </div>
                </div>
                <div className="MedicationAdd-inforBlock">
                    <div className="MedicationAdd-inforBlock-title">Information</div>
                    <TextEditor />
                </div>
                <div className="MedicationAdd-checkbox">
                    <div>Auto selling ?</div>
                    <input onChange={() => handleSetSelling()} id="MedicationAdd-sellingId" type="checkbox" />
                </div>
                <div className="MedicationAdd-submit">
                    <button className="MedicationAdd-submitBtn" onClick={() => handleSubmit()}>Submit</button>
                </div>
            </div>
            <MedicationAddToastMessage />
        </div>
    )
}

export default MedicationAdd;