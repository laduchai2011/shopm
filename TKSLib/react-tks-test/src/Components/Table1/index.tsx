import React, { FC, useMemo, useRef } from 'react';
import './styles.css';

import { Table1_Props } from 'src/define';
import Row from './components/Row';

import { Table1Context } from './Table1Context';
import { 
    Table1_Context_Props,
    Table1_Element_Props 
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

    const contextValue: Table1_Context_Props =  useMemo(() => ({
        table1,
        elements
    }), [table1]);

    return <Table1Context.Provider value={contextValue}>
        <div
            className={`TKS-Table1 ${className || ''}`}
            {...props}
        >
            <div>
                <Row />
                <Row />
            </div>
        </div>
    </Table1Context.Provider>
};

export default React.memo(Table);