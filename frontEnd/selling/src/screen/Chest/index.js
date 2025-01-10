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
    const [pageIndex, setPageIndex] = useState(1);
    const pageSize = 5;
    const [chestList, setChestList] = useState(undefined);

    const columnsInfor = [
        { columnName: 'Name', fieldName: 'name'},
        { columnName: 'Title', fieldName: 'title'},
        { columnName: 'Type', fieldName: 'type'},
        { columnName: 'Note', fieldName: 'note'},
        { columnName: 'Size', fieldName: 'size'},
        { columnName: 'Max Amount', fieldName: 'maxAmount'}
    ]

    const selectedProvider_cookie = getCookie(PROVIDER_CONST.SELECTED_PROVIDER);
    const uuid_provider_current = JSON.parse(selectedProvider_cookie).uuid_provider;

    const {
        data: data_chestList, 
        // isFetching: isFetching_chestList, 
        isError: isError_chestList, 
        error: error_chestList
    } = useGetChestListQuery({uuid_provider: uuid_provider_current, pageIndex: pageIndex, pageSize: pageSize});
    useEffect(() => {
        isError_chestList && console.error(error_chestList);
    }, [isError_chestList, error_chestList])
    useEffect(() => {
        const resData = data_chestList;
        if (resData?.success) {
            setChestList(resData.chestList)
        }
    }, [data_chestList])

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
                    { chestList && <Table table={{
                        data: {values: chestList?.rows},
                        config: {columnsInfor: columnsInfor, pageSize: pageSize, maxRow: chestList?.count},
                        control: {loadDataState: loadDataState, pageIndex: pageIndex},
                        event: {onSelectedPage(TKS) {
                            setLoadDataState(LOAD_STATE.LOADING);
                            const interval = setInterval(() => {
                                const pageIndex_m = TKS.data.selectedPage;
                                setPageIndex(pageIndex_m)
                                setLoadDataState(LOAD_STATE.SUCCESS);
                                clearInterval(interval)
                            }, 2000)
                        },}
                    }} /> }
                </div>
            </div>
            <ToastMessage toastMessage={toastMessage} />
        </div>
    )
}

export default Chest;