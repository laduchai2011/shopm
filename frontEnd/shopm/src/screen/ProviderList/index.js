import React, { useEffect, useState } from 'react';
import './styles.css';

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { MdAdd } from 'react-icons/md';

import Header from 'screen/Header';
import ProviderListBox from './ProviderListBox';

import { SERVER_ADDRESS_GET_PROVIDERLIST } from "config/server";

const ProviderList = () => {
    const navigate = useNavigate();

    const [providerList, setProviderList] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: `${SERVER_ADDRESS_GET_PROVIDERLIST}`,
            withCredentials: true
        }).then(res => {
            const resData = res.data;
            if (resData.exist) {
                setProviderList(resData.providers);
            }
        }).catch(error => console.error(error))
    }, [])

    const list_provider = providerList.map((data, index) => {
        return <ProviderListBox key={ index } onData={ data } />
    })

    return (
        <div className='ProviderList'>
            <Header />
            <div className='ProviderList-body'>
                { list_provider }
                <div className='ProviderList-body-add'>
                    <MdAdd onClick={() => navigate('/provider/setting/register')} />
                </div>
            </div>
        </div>
    )
}

export default ProviderList;