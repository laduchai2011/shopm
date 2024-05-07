import React, { useEffect, useState } from 'react';
import './styles.css';

import { useDispatch } from "react-redux";

import { 
    setToastMessageRT 
} from 'reduxStore/slice/registerProviderSlice';

import { 
    useGetProviderListQuery,
    useDeleteProviderMutation 
} from 'reduxStore/RTKQuery/providerRTKQuery';

import { $$ } from 'utilize/Tricks';

const RegisterProviderDeleteBody = () => {

    const dispatch = useDispatch();

    const [providers, setProviders] = useState([]);
    const [selectedProvider, setSelectedProvider] = useState();
    const [authString, setAuthString] = useState('DELETE YOUR PROVIDER');
    const [inputAuthString, setInputAuthString] = useState('');
    
    const [deleteProvider] = useDeleteProviderMutation();

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
            setProviders(resData.providers);
        }
    }, [data_providerList])

    const handleChooseProvider = (index) => {
        const q_providers = $$('.RegisterProviderDeleteBody-providers');

        for (let i = 0; i < q_providers.length; i++) {
            q_providers[i].classList.remove('selected');
        }

        q_providers[index].classList.add('selected');

        setSelectedProvider(providers[index]);
        setAuthString(`DELETE ${providers[index].name}`);
    }

    const handleInputAuthString = (e) => {
        const value = e.target.value;
        setInputAuthString(value);
    }

    const handleDelleteProvider = () => {
        if (authString === inputAuthString) {
            deleteProvider({
                uuid_provider: selectedProvider.uuid_provider
            }).then(res => {
                const resData = res.data;
                if (resData?.success) {
                    dispatch(setToastMessageRT({
                        type: 'success',
                        message: resData?.message,
                        show: true
                    }))
                    const q_providers = $$('.RegisterProviderDeleteBody-providers');
                    for (let i = 0; i < q_providers.length; i++) {
                        q_providers[i].classList.remove('selected');
                    }
                    setSelectedProvider(null);
                    setInputAuthString('');
                } else {
                    dispatch(setToastMessageRT({
                        type: 'error',
                        message: resData?.message,
                        show: true
                    }))
                }
            }).catch(err => console.error(err))
        } else {
            dispatch(setToastMessageRT({
                type: 'error',
                message: 'String is invalid !',
                show: true
            }))
        }
    }

    const list_provider = providers.map((data, index) => {
        return (
            <div 
                className='RegisterProviderDeleteBody-providers'
                key={index} 
                value={data.uuid_provider}
                onClick={() => handleChooseProvider(index)}
            >
                <strong>{ `${index} . ` }</strong>{data.name}
            </div> 
        )
    })

    return (
        <div className='RegisterProviderDeleteBody'>
            <div className='RegisterProviderDeleteBody-list'>
                <div className='RegisterProviderDeleteBody-list-header'><strong>List</strong></div>
                <div className='RegisterProviderDeleteBody-list-provider'>
                    { list_provider }
                </div>
            </div>
            <div className='RegisterProviderDeleteBody-authenticDelete'>
                <div className='RegisterProviderDeleteBody-authenticDelete-header'><strong>Authentic Delete</strong></div>
                <div className='RegisterProviderDeleteBody-authenticDelete-content'>
                    <div>Enter string to delete !</div>
                    <div>String: <strong>{ authString }</strong></div>
                    <div>
                        <input type="text" onChange={(e) => handleInputAuthString(e)} value={inputAuthString} />
                    </div>
                    <div>
                        <button onClick={() => handleDelleteProvider()}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterProviderDeleteBody;