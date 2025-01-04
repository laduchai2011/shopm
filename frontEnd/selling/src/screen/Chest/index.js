import React, { useState, useEffect } from 'react';
import './styles.css';


import Header from 'screen/Header';

import { Table, ToastMessage } from 'react-tks/components';
// const components = require('react-tks/components');
import { useGetChestListQuery } from 'reduxStore/RTKQuery/chestRTKQuery';

import { getCookie } from 'auth/cookie';
import { PROVIDER_CONST } from 'utilize/constant';


const Chest = () => {

    const [loadDataState, setLoadDataState] = useState(undefined);
    const [page, setPage] = useState(1)

    const columnsInfor = [
        { columnName: 'Name', fieldName: 'name'},
        { columnName: 'Age', fieldName: 'age'},
        { columnName: 'Address', fieldName: 'address'},
        { columnName: 'Page', fieldName: 'page'}
    ]

    const selectedProvider_cookie = getCookie(PROVIDER_CONST.SELECTED_PROVIDER);
    const uuid_provider_current = JSON.parse(selectedProvider_cookie).uuid_provider;
    console.log(uuid_provider_current)

    const {
        data: data_chestList, 
        // isFetching: isFetching_chestList, 
        isError: isError_chestList, 
        error: error_chestList
    } = useGetChestListQuery({uuid_provider: uuid_provider_current, pageIndex: 1, pageSize: 5});
    useEffect(() => {
        isError_chestList && console.error(error_chestList);
    }, [isError_chestList, error_chestList])
    useEffect(() => {
        const resData = data_chestList;
        if (resData?.success) {
            // setProviderList(resData.providers);
            console.log(resData)
        }
    }, [data_chestList])

    const data = (page) => {
        return [
            {
                name: 'name 1',
                age: '1',
                address: 'address 1',
                page: page
            },
            {
                name: 'name 2',
                age: '2',
                address: 'address 2',
                page: page
            },
            {
                name: 'name 3',
                age: '3',
                address: 'address 3',
                page: page
            },
            {
                name: 'name 4',
                age: '4',
                address: 'address 4',
                page: page
            },
            {
                name: 'name 5',
                age: '5',
                address: 'address 5',
                page: page
            }
        ]
    } 

    const LOAD_STATE = {
        LOADING: 'LOADING',
        SUCCESS: 'SUCCESS',
        FAILURE: 'FAILURE',
        READY: 'READY'
    }

    const toastMessage = {
        type: 'SUCCESS',
        message: 'toastMessage'
    }

    return (
        <div className='Chest'>
            <Header />
            <div className='Chest-main'>
                <div className='Chest-center'>
                    <h3>Chest</h3>
                    <Table table={{
                        data: {values: data(page)},
                        config: {columnsInfor: columnsInfor, pageSize: 4, maxRow: 4*20},
                        control: {loadDataState: loadDataState, pageIndex: page},
                        event: {onSelectedPage(TKS) {
                            setLoadDataState(LOAD_STATE.LOADING);
                            const interval = setInterval(() => {
                                const pageIndex_m = TKS.data.selectedPage;
                                setPage(pageIndex_m)
                                setLoadDataState(LOAD_STATE.SUCCESS);
                                clearInterval(interval)
                            }, 2000)
                        },}
                    }} />
                </div>
            </div>
            <ToastMessage toastMessage={toastMessage} />
            {/* <div ref={toastMessageContainerElement}></div>
            <OverLay isShow={false} /> */}
        </div>
    )
}

export default Chest;