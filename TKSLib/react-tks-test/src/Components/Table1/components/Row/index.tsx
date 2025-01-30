import React, { FC } from 'react';
import './styles.css';

// import { Table1_CCRow_Props } from 'src/define';

import Cell from './components/Cell';


// interface MyTable1CCRowProps extends React.HTMLProps<HTMLDivElement> {
//     table1_CCRow?: Table1_CCRow_Props,
//     [key: string]: any
// }

const Row: FC<{}> = () => {

 

    return <div
        className='TKS-Table1-Row'
    >
        <div>
            <Cell cellIndex={0} />
        </div>
        <div>
            <Cell cellIndex={1} />
        </div>
    </div>
};

export default Row;