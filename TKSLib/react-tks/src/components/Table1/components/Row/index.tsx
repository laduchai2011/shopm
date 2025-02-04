import React, { FC, useContext, useEffect } from 'react';
import './styles.css';

import { Table1Context } from '../../Table1Context';

import { 
    Table1_Data_Props,
    Table1_Config_Props,
    Table1_Config_ColumnInfor_Props,
    Table1_CCRow_Props,
    Table1_CCCell_Props 
} from 'src/define';

import Cell from './components/Cell';

import { handleCutPXInString } from 'src/utils/string';


const Row: FC<{table1_CCRow?: Table1_CCRow_Props}> = ({table1_CCRow}) => {

    const context = useContext(Table1Context);
        
    if (!context) {
        throw new Error('Row component cant undefined ! (Table1)');
    }

    const {
        table1,
        elements
    } = context;

    const config: Table1_Config_Props | undefined = table1?.config;
    const columnInfor: Table1_Config_ColumnInfor_Props[] | undefined = config?.columnInfor;
    const cell_element: React.MutableRefObject<(HTMLDivElement | null)[]> = elements.current.cell_element;

    const data: Table1_Data_Props | undefined = table1?.data;
    const values: {[key: string]: any}[] | undefined = data?.values;

    let columnAmount: number = 0;
    let rowAmount: number = 0;
    let rowIndex: number = 0;
    let cellIndex = 0;
    

    if (columnInfor) {
        columnAmount = columnInfor.length + 1;
    }
    if (values) {
        rowAmount = values.length + 1;
    }

    if (table1_CCRow?.config?.index_in_table) {
        rowIndex = table1_CCRow.config.index_in_table;
    }

    const handleTableIndex = (columnAmount: number, rowIndex: number, cellIndex: number): number => {
        return columnAmount*rowIndex + cellIndex;
    }

    // sync height of all cells
    useEffect(() => {
        let list_index_of_cell_thisRow: number[] = [];
        for (let i: number = 0; i < columnAmount; i++) {
            list_index_of_cell_thisRow.push(handleTableIndex(columnAmount, rowIndex, i))
        }
        let mostheight: number = 0;
        for (let i: number = 0; i < cell_element.current.length; i++) {
            if (list_index_of_cell_thisRow.indexOf(i)!==-1) {
                const height_: string | undefined = window.getComputedStyle(cell_element.current[i]!).height;
                const height_number: number = Number(handleCutPXInString(height_));
                if (mostheight < height_number) {
                    mostheight = height_number
                }
            }
        }
        for (let i: number = 0; i < cell_element.current.length; i++) {
            if (list_index_of_cell_thisRow.indexOf(i)!==-1) {
                cell_element.current[i]!.style.height = `${mostheight}px`;
            }
        }

        // sync index-column
        let list_index_of_cell_indexColumn: number[] =[];
        for (let i: number = 0; i < rowAmount; i++) {
            list_index_of_cell_indexColumn.push(handleTableIndex(columnAmount, i, 0))
        }
        let mostWidth_of_indexColumn: number = 0;
        for (let i: number = 0; i < cell_element.current.length; i++) {
            if (list_index_of_cell_indexColumn.indexOf(i)!==-1) {
                const width_: string | undefined = window.getComputedStyle(cell_element.current[i]!).width;
                const width_number: number = Number(handleCutPXInString(width_));
                if (mostWidth_of_indexColumn < width_number) {
                    mostWidth_of_indexColumn = width_number
                }
            }
        }
        for (let i: number = 0; i < cell_element.current.length; i++) {
            if (list_index_of_cell_indexColumn.indexOf(i)!==-1) {
                cell_element.current[i]!.style.width = `${mostWidth_of_indexColumn}px`;
            }
        }
    }, [cell_element, rowIndex, columnAmount, rowAmount])

    const list_cell: React.ReactNode = table1_CCRow?.data?.cells.map((data: Table1_CCCell_Props, index: number) => {
        cellIndex = index;
        const data_cp: Table1_CCCell_Props = {
            ...data,
            data: {
                content: (rowIndex!==0&&index===0) ? rowIndex.toString() : data.data?.content
            },
            config: {
                ...data.config,
                index_in_table: handleTableIndex(columnAmount, rowIndex, cellIndex),
                index_in_row: index,
                width: index===0 ? 'max-content' : '300px'
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