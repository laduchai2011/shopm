import React, { FC } from 'react';
import './styles.css';

import Table from 'Components/Table';

import { ColumnsInforProps } from 'define';

const TableScreen: FC<{}> = () => {

    const columnsInfor: ColumnsInforProps[] = [
        { columnName: 'Name', fieldName: 'name'},
        { columnName: 'Age', fieldName: 'age'},
        { columnName: 'Address', fieldName: 'address'}
    ]

    const data = [
        {
            name: 'name 1',
            age: '1',
            address: 'address 1'
        },
        {
            name: 'name 2',
            age: '2',
            address: 'address 2'
        },
        {
            name: 'name 3',
            age: '3',
            address: 'address 3'
        },
        {
            name: 'name 4',
            age: '4',
            address: 'address 4'
        }
    ]

    return <div className="TKS-screen-Table">
        <div style={{marginLeft: '20px', width: '800px'}}>
            <Table table={{
                data: {values: data},
                config: {columnsInfor: columnsInfor, pageSize: 10, maxRow: 100}
            }} />
        </div>
    </div>;
};

export default TableScreen;