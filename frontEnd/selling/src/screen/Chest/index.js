import React, { useState } from 'react';
import './styles.css';


import Header from 'screen/Header';

import { Table } from 'react-tks/components';
// const components = require('react-tks/components');


const Chest = () => {

    const [loadDataState, setLoadDataState] = useState(undefined);
    const [page, setPage] = useState(1)

    const columnsInfor = [
        { columnName: 'Name', fieldName: 'name'},
        { columnName: 'Age', fieldName: 'age'},
        { columnName: 'Address', fieldName: 'address'},
        { columnName: 'Page', fieldName: 'page'}
    ]

    console.log(Table)

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
            }
        ]
    } 

    const LOAD_STATE = {
        LOADING: 'LOADING',
        SUCCESS: 'SUCCESS',
        FAILURE: 'FAILURE',
        READY: 'READY'
    }

    // const toastMessage = {
    //     type: 'SUCCESS',
    //     message: 'toastMessage'
    // }

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
            {/* <ToastMessage toastMessage={toastMessage} /> */}
            {/* <div ref={toastMessageContainerElement}></div> */}
            {/* <OverLay isShow={false} /> */}
        </div>
    )
}

export default Chest;