import React, { useState, useEffect } from 'react';
import './styles.css';

import axios from 'axios';
import { useLocation } from 'react-router-dom';

import { MdAdd } from 'react-icons/md';

import { $$, $ } from 'utilize/Tricks';
import { SERVER_ADDRESS_CREATEPROVIDERABOUT, SERVER_ADDRESS_GET_PROVIDERLIST } from 'config/server';

const ProviderAboutBody = () => {
    const { state: dataFromProvider } = useLocation();

    const [input, setInput] = useState([{subject: '', content: ''}]);
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: `${SERVER_ADDRESS_GET_PROVIDERLIST}`,
            withCredentials: true
        }).then(res => {
            const resData = res.data;
            if (resData.exist) {
                setProviders(resData.providers);
            }
        }).catch(error => console.error(error))
    }, [])

    const handleAddInput = () => { 
        setInput([...input, {subject: '', content: ''}]);
        setTimeout(() => {
            const index = input.length;
            const qInputBox = $$('.ProviderAboutBody-inputBox');
            qInputBox[index].classList.add('show');
        }, 0)
    }

    const handleRefresh = () => {
        const qInputBox = $$('.ProviderAboutBody-inputBox');
        const qNote = $('.ProviderAboutBody-note');

        qNote.classList.remove('success');
        qNote.classList.remove('failure');

        for (let i = 0; i < qInputBox.length; i++) {
            qInputBox[i].classList.remove('show');
        }
        setTimeout(() => {
            setInput([{subject: '', content: ''}]);
            qInputBox[0].classList.add('show');
        }, 500)
    }

    const handleInputChange = (e, type, index) => {
        const value = e.target.value;
        const copyInput = [...input];

        const qNote = $('.ProviderAboutBody-note');

        switch(type) {
            case 'subject':
                if (value.length > 0) {
                    qNote.classList.remove('emptySubject');
                }
                copyInput[index].subject = value;
                setInput(copyInput);
                break;
            case 'content':
                copyInput[index].content = value;
                setInput(copyInput);
                break;
            default:
                throw new Error('Invalid parameter.')
        }
    }

    const handleSubmit = () => {
        const e = document.getElementById("provider-select");
        const uuid_provider = e.value;

        const qNote = $('.ProviderAboutBody-note');

        const data = [...input];

        let emptySubject = true;
        for (let i = 0; i < data.length; i++) {
            if (data[i].subject.length > 0) {
                data[i].uuid_provider = uuid_provider;
                emptySubject = false;
            } else {
                qNote.classList.add('emptySubject');
                emptySubject = true;
                break;
            }
        }

        if (!emptySubject) {
            axios({
                method: 'post',
                url: `${SERVER_ADDRESS_CREATEPROVIDERABOUT}`,
                withCredentials: true,
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                const resData = res.data;
                if (!resData.exist) {
                    qNote.classList.add('success');
                    qNote.classList.remove('failure');
                } else {
                    qNote.classList.remove('success');
                    qNote.classList.add('failure');
                }
            }).catch(error => console.error(error))
        }
    }

    const list_input = input.map((data, index) => {
        let init_show = index === 0 ? 'show' : '';
        return (
            <div className={`ProviderAboutBody-inputBox ${init_show}`} key={index}>
                <input value={data.subject} onChange={(e) => handleInputChange(e, 'subject', index)} placeholder='Subject' />
                <input value={data.content} onChange={(e) => handleInputChange(e, 'content', index)} placeholder='Content' />
            </div>
        )
    })

    const list_provider = providers.map((data, index) => {
        return <option key={index} value={data.uuid_provider}>{data.name}</option> 
    })

    return (
        <div className='ProviderAboutBody'>
            <div className='ProviderAboutBody-main'>
                <div className='ProviderAboutBody-selectProvider'>
                    <label htmlFor="provider-select">Choose a Provider:</label>
                    { 
                        providers.length > 0 ? 
                        <select name="providers" id="provider-select" value={ dataFromProvider?.uuid_provider }>
                            <option value="">Select Provider:</option>
                            { list_provider }
                        </select>:
                        <select name="providers" id="provider-select">
                            <option value="">Select Provider:</option>
                            { list_provider }
                        </select>
                    }
                </div>
                { list_input }
                <div className='ProviderAboutBody-btnContainer'>
                    <div className='ProviderAboutBody-btn1'>
                        <button onClick={() => handleRefresh()}>Refresh</button>
                        <MdAdd onClick={() => handleAddInput()} size={30} />
                    </div>
                    <button className='ProviderAboutBody-submit' onClick={() => handleSubmit()}>Submit</button>
                </div>
                <div className='ProviderAboutBody-note'></div>
            </div>
        </div>
    )
}

export default ProviderAboutBody;