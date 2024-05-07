import React, { useEffect, useState } from 'react';
import './styles.css';

import { useNavigate } from "react-router-dom";

import { MdAdd } from 'react-icons/md';

import Header from 'screen/Header';
import ProviderListBox from './ProviderListBox';

import { useGetProviderListQuery } from 'reduxStore/RTKQuery/providerRTKQuery';

const ProviderList = () => {
    const navigate = useNavigate();

    const [providerList, setProviderList] = useState([]);

    const {
        data: data_providerList, 
        // isFetching: isFetching_providerList, 
        isError: isError_providerList, 
        error: error_providerList
    } = useGetProviderListQuery();

    useEffect(() => {
        isError_providerList && console.log(error_providerList);
    }, [isError_providerList, error_providerList])

    useEffect(() => {
        const resData = data_providerList;
        if (resData?.success) {
            setProviderList(resData.providers);
        }
    }, [data_providerList])

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