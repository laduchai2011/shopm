import React, { useEffect, useState } from 'react';
import './styles.css';

import { useNavigate } from 'react-router-dom';

import { 
    useGetProviderListQuery
} from 'reduxStore/RTKQuery/providerRTKQuery';

import { Timestamp } from 'utilize/Timestamp';


const BodyProviderSettingTop = () => {
    const navigate = useNavigate();

    const [providers, setProviders] = useState([]);

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

    const list_provider = providers.map((data, index) => {
        return (
            <div className='BodyProviderSettingTop-lineYContainer1' key={ index }>
                <div className='BodyProviderSettingTop-lineY'></div>
                <div className='BodyProviderSettingTop-lineYPoint'>{ index }</div>
                <div className='BodyProviderSettingTop-provider'>
                    <div>
                        <button>Provider demo</button>
                        <span><strong>Time:</strong> { Timestamp(data?.createdAt) }</span>
                        <span><strong>Follow:</strong> { data?.follow}</span>
                        <span><strong>Co-operation:</strong> true</span>
                    </div>
                </div>
            </div>
        )
    })
    
    return (
        <div className='BodyProviderSettingTop'>
            <div className='BodyProviderSettingTop-header'>++ Provider:</div>
            <div className='BodyProviderSettingTop-lineYContainer'>
                { list_provider }
                <div className='BodyProviderSettingTop-lineYBottom'>
                    <button onClick={() => navigate('/provider/setting/register')}>+ Add provider</button>
                </div>               
            </div>
            
        </div>
    )
}

export default BodyProviderSettingTop;