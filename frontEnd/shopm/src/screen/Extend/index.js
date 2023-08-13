import React from 'react';
import './styles.css';

import axios from 'axios';

import Header from 'screen/Header';

import { SERVER_ADDRESS_ADD_DOCTORORPHARMACIST } from 'config/server';

/**
*@typedef {
*name: string, 
*birthday: date,
*sex: boolean,
*avatar: text,
*image: text,
*type: string,
*information: text,
*uuid_user: uuid
*} doctorOrPharmacistOptions
*/ 

const Extend = () => {
    const handleSubmitPharmacist = () => {
        const doctorOrPharmacistOptions = {
            name: 'laduchai', 
            birthday: new Date("December 17, 1995"),
            sex: true,
            avatar: '',
            image: '',
            type: 'pharmacist',
            information: '',
            uuid_user: ''
        }
        axios({
            method: 'post',
            url: SERVER_ADDRESS_ADD_DOCTORORPHARMACIST,
            withCredentials: true,
            data: doctorOrPharmacistOptions,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            const resData = res.data;
            console.log(resData)
        }).catch(error => console.error(error))
    }
    
    return (
        <div className='Extend'>
            <Header />
            <div className='Extend-main'>
                <div className='Extend-main-pharmacist'>
                    <div>sdfgsdgsdg</div>
                    <button onClick={() => handleSubmitPharmacist()}>Register Pharmacist</button>
                </div>
            </div>
        </div>
    )
}

export default Extend;