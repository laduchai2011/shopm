import React, { FC, useContext } from 'react';
import './styles.css';

import { Table1Context } from '../../Table1Context';

import { 
    Table1_Config_Props,
    Table1_Config_ColumnInfor_Props,
    Table1_CCRow_Props,
    Table1_CCCell_Props 
} from 'src/define';

import Cell from './components/Cell';


const Row: FC<{table1_CCRow?: Table1_CCRow_Props}> = ({table1_CCRow}) => {

    const context = useContext(Table1Context);
        
    if (!context) {
        throw new Error('Row component cant undefined ! (Table1)');
    }

    const {
        table1
    } = context;

    const config: Table1_Config_Props | undefined = table1?.config;
    const columnInfor: Table1_Config_ColumnInfor_Props[] | undefined = config?.columnInfor;

    let columnAmount: number = 0;
    let rowIndex: number = 0;
    let cellIndex: number = 0;

    if (columnInfor) {
        columnAmount = columnInfor.length;
    }

    if (table1_CCRow?.config?.index_in_table) {
        rowIndex = table1_CCRow.config.index_in_table;
    }

    const handleTableIndex = (columnAmount: number, rowIndex: number, cellIndex: number): number => {
        return columnAmount*rowIndex + cellIndex;
    }

    const list_cell: React.ReactNode = table1_CCRow?.data?.cells.map((data: Table1_CCCell_Props, index: number) => {
        cellIndex = index;
        const data_cp: Table1_CCCell_Props = {
            ...data,
            config: {
                ...data.config,
                index_in_table: handleTableIndex(columnAmount, rowIndex, cellIndex),
                index_in_row: index
            }
        };
        return (
            <div key={index}>
                <Cell table1_CCCell={data_cp} />
            </div>
        )
    })

    return <div
        className='TKS-Table1-Row'
    >
        { list_cell }
    </div>
};

export default Row;