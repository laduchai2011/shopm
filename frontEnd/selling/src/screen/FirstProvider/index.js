import React, { useEffect, useState } from 'react';
import './styles.css';

import { useNavigate } from 'react-router-dom';

import { 
    useGetProviderListQuery
} from 'reduxStore/RTKQuery/providerRTKQuery';

import { setCookie, getCookie } from 'auth/cookie';

import { baseURL_shopm } from 'config/server';


const FirstProvider = () => {
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


    useEffect(() => {
        const selectedProviderCookie = getCookie('selectedProvider');
        if (selectedProviderCookie) {
            navigate('/');
        } else {
            navigate('/firstProvider');
        }
    }, [navigate])

    const handleSelectProvider = (provider) => {
        setCookie(
            'selectedProvider',
            JSON.stringify({ provider: provider }),
            365
        )
        window.location.reload();
    }

    const createProvider = () => {
        window.location.href = `${baseURL_shopm}/provider/setting/register`;
    }

    const list_provider = providerList.map((data, index) => {
        return (
            <div className='FirstProvider-provider' key={ index } onClick={() => handleSelectProvider(data)}>{ data.name }</div>
        )
    })

    return (
        <div className='FirstProvider'>
            <div>
                <span>Select a provider to begin. If you have NOT provider yet, let create now in here <button onClick={() => createProvider()}>Create a provider</button></span>
                <div>
                    <div>Your provider :</div>
                    <div>
                        { list_provider }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FirstProvider;