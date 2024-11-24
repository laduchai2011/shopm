import React, { useEffect, useRef } from 'react';
import './styles.css';

import ReactDOM from 'react-dom/client';

import Header from 'screen/Header';

import { Table, OverLay, ToastMessage } from 'react-tks';

const Chest = () => {

    const toastMessageContainerElement = useRef(null);

    useEffect(() => {
        const element = React.createElement(OverLay, { isShow: true })
        const newNode = document.createElement('div');
        newNode.style.width = '300px';
        ReactDOM.createRoot(newNode).render(element); 
        toastMessageContainerElement.current?.insertBefore(newNode, toastMessageContainerElement.current.firstChild);
    }, [])

    const tableConfig = {
        columnAmount: 5,
        columnsInfor: [{columnName: 'Name', fieldName: 'name'}, {columnName: 'Title', fieldName: 'title'}, {columnName: 'Note', fieldName: 'note'}],
        pageIndex: 1,
        pageSize: 2,
        maxRow: 80,
        controlPos: 'bottom'
    }

    const data = [
        {
            name: 'name 1',
            title: 'title 1'
        },
        {
            title: 'title 2',
            name: 'name 2',
            note: 'note 2'
        },
        {
            name: 'name 3',
            title: 'title 3'
        },
        {
            name: 'name 4',
            title: 'title 4'
        }
    ]

    const handleSelectPage = (pageIndex) => {
        console.log('handleSelectPage', pageIndex)
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
                    <Table config={tableConfig} data={data} onSelectPage={handleSelectPage} />
                </div>
            </div>
            <ToastMessage toastMessage={toastMessage} />
            <div ref={toastMessageContainerElement}></div>
            {/* <OverLay isShow={false} /> */}
        </div>
    )
}

export default Chest;