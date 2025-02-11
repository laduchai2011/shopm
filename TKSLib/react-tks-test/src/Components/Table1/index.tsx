import React, { FC, useMemo, useRef } from 'react';
import './styles.css';

import { Table1_Props } from 'src/define';
import Row from './components/Row';

import { Table1Context } from './Table1Context';
import { 
    Table1_Context_Props,
    Table1_Element_Props,
    Table1_Config_Props,
    Table1_Config_ColumnInfor_Props,
    Table1_Data_Props,
    Table1_CCRow_Props,
    Table1_CCCell_Props 
} from 'src/define';


interface MyTable1Props extends React.HTMLProps<HTMLDivElement> {
    table1?: Table1_Props,
    [key: string]: any
}

const Table: FC<MyTable1Props> = ({table1, className, ...props}) => {

    const cell_element = useRef<(HTMLDivElement | null)[]>([]);
    const elements = useRef<Table1_Element_Props>({
        cell_element: cell_element
    })

    const contextValue: Table1_Context_Props = useMemo(() => ({
        table1,
        elements
    }), [table1]);

    const config: Table1_Config_Props | undefined = table1?.config;
    const data: Table1_Data_Props | undefined = table1?.data;

    //------------set-up information of column--------------------
    const columnInfor: Table1_Config_ColumnInfor_Props[] | undefined = config?.columnInfor;
    const rows: Table1_CCRow_Props[] = [];
    let rowForm: Table1_CCRow_Props = {
        config: {
            index_in_table: -1
        },
        data: {
            cells: []
        }
    };

    // row form setup and create header for table
    // const inputData: {[key: string]: any}[] | undefined = data?.values;
    if (columnInfor!==undefined) {
        const rowForm_cp:Table1_CCRow_Props = {...rowForm}; 
        //add index column
        const newCellIndex: Table1_CCCell_Props = {
            config: {
                text_color: 'black',
                text_weight: '800'
            },
            data: {
                fieldName: 'index',
                content: 'Index'
            }
        }
        rowForm_cp.data?.cells.push(newCellIndex);

        for (let i: number = 0; i < columnInfor.length; i++) {
            const newCell: Table1_CCCell_Props = {
                config: {
                    text_color: 'black',
                    text_weight: '800'
                },
                data: {
                    fieldName: columnInfor[i].fieldName,
                    content: columnInfor[i].columnName
                }
            }
            rowForm_cp.data?.cells.push(newCell);
        }
        rowForm = rowForm_cp;
        rows.push(rowForm_cp);
    }

    const values: {[key: string]: any}[] | undefined = data?.values;
    if (values) {
        for (let key: number = 0; key < values.length; key++) {
            const new_rowData: Table1_CCRow_Props = JSON.parse(JSON.stringify(rowForm));
            if (new_rowData.data?.cells) {
                const cells_: Table1_CCCell_Props[] = [...new_rowData.data?.cells];
                for (let i: number = 0; i < cells_.length; i++) {
                    const keyIndexInRow = Object.keys(values[key]).indexOf(cells_[i].data?.fieldName!);
                    if (keyIndexInRow!==-1 && cells_[i].data && cells_[i].config) {
                        const selectedKey: string = cells_[i].data?.fieldName!;
                        cells_[i].data!.content = values[key][selectedKey];
                        cells_[i].config!.text_color = 'black';
                    } else if (cells_[i].data && cells_[i].config) {
                        if (i===0) {
                            cells_[i].data!.content = '';
                            cells_[i].config!.text_color = 'black';
                        } else {
                            cells_[i].data!.content = 'Empty';
                            cells_[i].config!.text_color = '#e1ec32';
                        }
                    }
                    cells_[i].config!.text_weight = '300';
                }
                new_rowData.data.cells = cells_;
                rows.push(new_rowData);
            }
        }
    }

    const list_row: React.ReactNode = rows.map((data: Table1_CCRow_Props, index: number) => {
        const data_cp: Table1_CCRow_Props = {
            ...data,
            config: {
                index_in_table: index
            }
        };
        return (
            <Row table1_CCRow={data_cp} key={index} />
        )
    })

    return <Table1Context.Provider value={contextValue}>
        <div
            className={`TKS-Table1 ${className || ''}`}
            {...props}
        >
            <div>
                { list_row }
            </div>
        </div>
    </Table1Context.Provider>
};

export default React.memo(Table);