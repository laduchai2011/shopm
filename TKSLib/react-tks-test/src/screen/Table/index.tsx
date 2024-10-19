import React, { FC, useRef } from 'react';
import './styles.css';

import { ContextTable } from './contextTable';

import { 
    RowProps,
    TableProps 
} from 'define';

import Row from './components/Row';

const Table: FC<{data: TableProps}> = ({ data }) => {
    const resizableStatus: React.MutableRefObject<boolean> = useRef(false);
    const cellWidth: React.MutableRefObject<number> = useRef(0);
    const cellX: React.MutableRefObject<number> = useRef(0);

    const list_row: React.ReactNode = data.rows.map((data: RowProps, index: number) => {
        return (
            <Row data={data} index={index} key={index} />
        )
    })

    return <ContextTable.Provider value={{resizableStatus, cellWidth, cellX}}>
        <div className="Log-main">
            { list_row }
        </div>;
    </ContextTable.Provider>
};

export default Table;