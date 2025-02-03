import React, { FC, useContext, useEffect } from 'react';
import './styles.css';

import { Table1Context } from 'src/components/Table1/Table1Context';

import { 
    Table1_Config_Props,
    Table1_CCCell_Props,
    Table1_CCCell_Data_Props,
    Table1_CCCell_Config_Props 
} from 'src/define';


const Cell: FC<{table1_CCCell?: Table1_CCCell_Props}> = ({table1_CCCell}) => {
    
    const context = useContext(Table1Context);
    
    if (!context) {
        throw new Error('Cell component cant undefined ! (Table1)');
    }

    const {
        table1, 
        elements
    } = context;
 
    const config: Table1_Config_Props | undefined = table1?.config;
    const config_cell: Table1_CCCell_Config_Props | undefined = table1_CCCell?.config;
    const cell_element: React.MutableRefObject<(HTMLDivElement | null)[]> = elements.current.cell_element;

    const index_in_table: number | undefined = table1_CCCell?.config?.index_in_table;
    if (index_in_table===undefined) {
        console.warn('This cell have NOT index_in_table');
    }

    useEffect(() => {
        if (index_in_table!==undefined && cell_element.current[index_in_table]) {
            config?.cell_maxWidth && (cell_element.current[index_in_table]!).style.setProperty('--maxWidth', config.cell_maxWidth);

            config_cell?.text_color && (cell_element.current[index_in_table]!).style.setProperty('--text-color', config_cell.text_color);
            config_cell?.text_weight && (cell_element.current[index_in_table]!).style.setProperty('--text-weight', config_cell.text_weight);
            config_cell?.width && (cell_element.current[index_in_table]!).style.setProperty('--width', config_cell.width);
            config_cell?.height && (cell_element.current[index_in_table]!).style.setProperty('--height', config_cell.height);
        }
    }, [cell_element, index_in_table, config?.cell_maxWidth, config_cell])

    const data_cell: Table1_CCCell_Data_Props | undefined = table1_CCCell?.data;
    const content: string |undefined = data_cell?.content;

    return index_in_table!==undefined ? <div
        className="TKS-Table1-Row-Cell"
        ref={(el) => (cell_element.current[index_in_table] = el)}
    >
        <div>{ content }</div> 
       <div className='TKS-Table1-Row-Cell-borderBottom' />
    </div> : null
};

export default Cell;