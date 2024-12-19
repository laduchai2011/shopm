import React, { FC, useState } from 'react';
import './styles.css';

import Table from 'components/Table';

import { ColumnsInforProps } from 'define';
import { LOAD_STATE } from 'const';

const TableScreen: FC<{}> = () => {

    const [loadDataState, setLoadDataState] = useState<string | undefined>(undefined);
    const [page, setPage] = useState<number>(1)

    const columnsInfor: ColumnsInforProps[] = [
        { columnName: 'Name', fieldName: 'name'},
        { columnName: 'Age', fieldName: 'age'},
        { columnName: 'Address', fieldName: 'address'},
        { columnName: 'Page', fieldName: 'page'}
    ]

    const data = (page: number) => {
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

    return <div className="TKS-screen-Table">
        <button onClick={() => setPage(x => x + 1)}>Plus page</button>
        <button onClick={() => setPage(0)}>click</button>
        <div style={{marginLeft: '20px', width: '800px'}}>
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
    </div>;
};

export default TableScreen;