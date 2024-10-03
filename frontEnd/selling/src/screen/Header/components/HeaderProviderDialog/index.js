import React, { memo, useEffect, useState } from 'react';
import './styles.css';

import { useDispatch, useSelector } from 'react-redux';

import { CiCircleRemove } from "react-icons/ci";

import { setProviderStatus } from 'reduxStore/slice/headerSlice';
import { setSelectedProvider } from 'reduxStore/slice/providerSlice';
import { 
    useGetProviderListQuery
} from 'reduxStore/RTKQuery/providerRTKQuery';

import { $ } from 'utilize/Tricks';
import { avatarNull } from 'utilize/constant';

const HeaderProviderDialog = () => {
    const dispatch = useDispatch();

    const [providerList, setProviderList] = useState([]);
    // const [selectedProvider, setSelectedProvider] = useState();

    const providerStatus = useSelector(state => state.headerSlice.providerStatus);
    const selectedProvider = useSelector(state => state.providerSlice.selectedProvider);

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
        const q_HeaderMenu = $('.HeaderProviderDialog');
        if (providerStatus==='on') {
            q_HeaderMenu.classList.add('show');
        }
        if (providerStatus==='off') {
            q_HeaderMenu.classList.remove('show');
        }
    }, [providerStatus])

    const list_provider = providerList.map((data, index) => {
        return (
            <div className='HeaderProviderDialog-providerContainer' key={ index }>
                <input type='checkbox' checked={selectedProvider?.uuid_provider===data.uuid_provider} onChange={() => dispatch(setSelectedProvider({selectedProvider: data}))} />
                <img src={data?.avatar ? data.avatar : avatarNull} alt='' />
                <span>{ data.name }</span>
            </div>
        )
    })

    return (
        <div className='HeaderProviderDialog'>
            <div className='HeaderProviderDialog-top'>
                <strong>Provider</strong>
                <CiCircleRemove onClick={() => dispatch(setProviderStatus({providerStatus: 'off', overlayStatus: false}))} size={ 25 } />
            </div>
            <div className='HeaderProviderDialog-body'>
                { list_provider }
            </div>
        </div>
    )
}

export default memo(HeaderProviderDialog);