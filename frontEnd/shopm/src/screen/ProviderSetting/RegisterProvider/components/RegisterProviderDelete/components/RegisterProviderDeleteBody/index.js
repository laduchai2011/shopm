import React, { useEffect, useState } from 'react';
import './styles.css';

import axios from 'axios';

import { 
    SERVER_ADDRESS_GET_PROVIDERLIST,
    SERVER_ADDRESS_DEL_PROVIDER
} from 'config/server';

import { $$ } from 'utilize/Tricks';

const RegisterProviderDeleteBody = () => {

    const [providers, setProviders] = useState([]);
    const [selectedProvider, setSelectedProvider] = useState();

    useEffect(() => {
        axios({
            method: 'get',
            url: `${SERVER_ADDRESS_GET_PROVIDERLIST}`,
            withCredentials: true
        }).then(res => {
            const resData = res.data;
            if (resData.exist) {
                setProviders(resData.providers);
                // console.log(resData)
            }
        }).catch(error => console.error(error))
    }, [])

    const handleChooseProvider = (index) => {
        const q_providers = $$('.RegisterProviderDeleteBody-providers');

        for (let i = 0; i < q_providers.length; i++) {
            q_providers[i].classList.remove('selected');
        }

        q_providers[index].classList.add('selected');

        setSelectedProvider(providers[index]);
    }

    const handleDelleteProvider = () => {
        axios({
            method: 'patch',
            url: `${SERVER_ADDRESS_DEL_PROVIDER}`,
            withCredentials: true,
            data: {
                uuid_provider: selectedProvider.uuid_provider
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            const resData = res.data;
            console.log('RegisterProviderDeleteBody', resData)
        }).catch(error => console.error(error))
    }

    const list_provider = providers.map((data, index) => {
        return (
            <div 
                className='RegisterProviderDeleteBody-providers'
                key={index} 
                value={data.uuid_provider}
                onClick={() => handleChooseProvider(index)}
            >
                {data.name}
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
                    <div>String: <strong>{selectedProvider?.name}</strong></div>
                    <div>
                        <input />
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