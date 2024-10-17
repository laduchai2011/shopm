import React, { FC } from 'react';
import './styles.css';

import { 
    RowProps,
    TableProps 
} from 'define';

import Row from './components/Row';

const Table: FC<{data: TableProps}> = ({ data }) => {
    const list_row: React.ReactNode = data.rows.map((data: RowProps, index: number) => {
        return (
            <Row data={data} key={index} />
        )
    })

    return <div className="Log-main">
        { list_row }
    </div>;
};

export default Table;