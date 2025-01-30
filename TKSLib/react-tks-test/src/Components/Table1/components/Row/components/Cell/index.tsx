import React, { FC, useContext, useEffect } from 'react';
import './styles.css';

import { Table1Context } from 'src/components/Table1/Table1Context';

import { 
    Table1_Config_Props 
} from 'src/define';


const Cell: FC<{cellIndex: number}> = ({cellIndex}) => {

    const text: string = 'text text text text text text text text text text text text text text text text text texttext text text text texttext text text text text text text text text text';
    
    const context = useContext(Table1Context);
    
    if (!context) {
        throw new Error('Cell component cant undefined ! (Table1)');
    }

    const {
        table1, 
        elements
    } = context;
 
    const config: Table1_Config_Props | undefined = table1?.config;
    const cell_element: React.MutableRefObject<(HTMLDivElement | null)[]> = elements.current.cell_element;

    useEffect(() => {
        if (cell_element.current[cellIndex]) {
            config?.cell_maxWidth && (cell_element.current[cellIndex]!).style.setProperty('--maxWidth', config.cell_maxWidth);
        }
    }, [cell_element, cellIndex, config?.cell_maxWidth])

    return <div
        className="TKS-Table1-Row-Cell"
        ref={(el) => (cell_element.current[cellIndex] = el)}
    >
        <div>{ text }</div> 
       <div className='TKS-Table1-Row-Cell-borderBottom' />
    </div>
};

export default Cell;