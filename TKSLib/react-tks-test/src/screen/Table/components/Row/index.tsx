import React, { FC } from 'react';
import './styles.css';

import { 
    RowProps,
    CellProps 
} from 'define';

import Cell from './components/Cell';


const Row: FC<{data: RowProps}> = ({ data }) => {

    const list_cell: React.ReactNode = data.cells.map((data: CellProps, index: number) => {
        return (
            <Cell data={data} key={index} />
        )
    })

    return <div className="TKS-Row">
       { list_cell }
    </div>;
};

export default Row;