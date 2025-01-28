import React, { FC, useState, useEffect } from 'react';
import './styles.css';

import Table from 'src/components/Table';

import { 
    ColumnsInforProps,
    Table_Data_CustomColumn_DataIn_Type 
} from 'src/define';
import { LOAD_STATE } from 'src/const';



const TableScreen: FC<{}> = () => {

    const [loadDataState, setLoadDataState] = useState<string | undefined>(undefined);
    const [page, setPage] = useState<number>(1);
    // const [customColumnData, setCustomColumnData] = useState<Table_Data_CustomColumn_DataIn_Type>({field: 'test', data: ''});
    const [customColumnDatas, setCustomColumnDatas] = useState<Table_Data_CustomColumn_DataIn_Type[]>([]);

    useEffect(() => {
        // let i: number = 0; 
        // const interval = setInterval(() => {
        //     setCustomColumnData(pre => {
        //         return {
        //             ...pre,
        //             data: i.toString()
        //         }
        //     })
        //     // i++
        //     clearInterval(interval)
        // }, 1000)
    }, [])

    const columnsInfor: ColumnsInforProps[] = [
        { columnName: 'Name', fieldName: 'name'},
        { columnName: 'Age', fieldName: 'age'},
        { columnName: 'Address', fieldName: 'address'},
        { columnName: 'Page', fieldName: 'page'},
        { columnName: 'Phone', fieldName: 'phone'}
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
                phone: '0789860854',
                page: page
            }
        ]
    } 

    return <div className="TKS-screen-Table">
        <button onClick={() => setPage(x => x + 1)}>Plus page</button>
        <button onClick={() => setPage(0)}>click</button>
        <div style={{marginLeft: '20px', width: '800px'}}>
            <Table table={{
                data: {
                    values: data(page),
                    customColumn: {
                        values: customColumnDatas
                    }
                },
                config: {
                    columnsInfor: columnsInfor, 
                    pageSize: 4, 
                    maxRow: 4*20, 
                    cell: {width: '250px', height: '30px'},
                    customColumn: {
                        type: 'calculateMoney',
                        fields: ['COST', 'VAT', 'SALE']
                    }
                },
                control: {loadDataState: loadDataState, pageIndex: page},
                event: {
                    onSelectedPage(TKS) {
                        setLoadDataState(LOAD_STATE.LOADING);
                        const interval = setInterval(() => {
                            const pageIndex_m = TKS.data.selectedPage;
                            setPage(pageIndex_m)
                            setLoadDataState(LOAD_STATE.SUCCESS);
                            clearInterval(interval)
                        }, 2000)
                    },
                    customColumn: {
                        onInputChange(e) {
                            setCustomColumnDatas([
                                {field: 'COST', data: e.target.value},
                                {field: 'VAT', data: e.target.value},
                                {field: 'SALE', data: e.target.value}
                            ])
                        },
                        onInput(TKS) {
                            console.log(111, TKS.data)
                        },
                    }
                }
            }} />
        </div>
    </div>;
};

export default TableScreen;