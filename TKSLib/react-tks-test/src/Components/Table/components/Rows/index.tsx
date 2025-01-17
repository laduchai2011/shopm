import React, { FC, useContext, useRef, useEffect } from 'react';
import './styles.css';

import { ContextTable } from 'src/components/Table/contextTable';

import { 
    Table_Config_Props,
    RowProps,
    CellProps 
} from 'src/define';

import { 
    WARNING_COLOR, 
    // LOAD_STATE 
} from 'src/const';

import Row from '../Row';
import CalculateMoney from './components/customColumns/CalculateMoney';

const Rows: FC<{}> = () => {

    const context = useContext(ContextTable);
    
    if (!context) {
        throw new Error('Context in row is undefined');
    }

    const { 
        table, 
        // default_pageSize, 
        // default_maxRow, 
        // cellElements, 
        // resizableStatus, 
        // cellWidth, 
        // cellX, 
        // selectedColumn, 
        // columnAmount, 
        // rowAmount, 
        // pageIndex 
    } = context;

    const config: Table_Config_Props = {...table?.config};
    const data: {[key: string]: any}[] | undefined = table?.data?.values;
    // const pageSize = useRef<number>(default_pageSize);

    const totalRow: React.MutableRefObject<RowProps[]> = useRef([]);

    const rowForm: RowProps = {
        cells: []
    };

    // set-up header oncly one time
    const cellHeader = (fieldName?: string, content?: string, textColor?: string, textWeight?: string): CellProps => {
        return {
            fieldName: fieldName,
            content: content,
            textColor: textColor,
            textWeight: textWeight
        }
    }
    const rowHeader: RowProps = {
        cells: []
    }
    if (config?.columnsInfor && rowHeader?.cells && rowForm?.cells) {
        for (let i: number = 0; i < config.columnsInfor.length; i++) {
            // if (config.columnsInfor[i]!==undefined) {
            //     rowHeader.cells.push(cellHeader(config.columnsInfor[i].fieldName, config.columnsInfor[i].columnName, 'black', '700'));
            //     rowForm.cells.push(cellHeader(config.columnsInfor[i].fieldName, '', 'black', '300'));
            // } else {
            //     rowHeader.cells.push(cellHeader('', `column ${i}`, 'black', '700'));
            //     rowForm.cells.push(cellHeader('', '', WARNING_COLOR, '300'));
            // }
            rowHeader.cells.push(cellHeader(config.columnsInfor[i].fieldName, config.columnsInfor[i].columnName, 'black', '700'));
            rowForm.cells.push(cellHeader(config.columnsInfor[i].fieldName, '', 'black', '300'));
        }
    }
    
    const totalRow_m: RowProps[] = []
    if (data) {
        for (let key: number = 0; key < data.length; key++) {
            // if (data.hasOwnProperty(key)) { 
            //     console.log(`log: ${key}: ${Object.keys(data[key])}`, data[key]);
            // }   
            // const rowData = { ...rowForm.current };
            const rowData: RowProps = JSON.parse(JSON.stringify(rowForm));
            if (rowData?.cells?.length) {
                for (let i: number = 0; i < rowData.cells.length; i++) {
                    const keyIndexInRow = Object.keys(data[key]).indexOf(rowData.cells[i]?.fieldName!);
                    if (keyIndexInRow!==-1) {
                        const selectedKey: string = rowData.cells[i]?.fieldName!;
                        rowData.cells[i].content = data[key][selectedKey];
                    } else {
                        rowData.cells[i].content = 'Empty';
                        rowData.cells[i].textColor = WARNING_COLOR;
                    }
                }
                totalRow_m.push(rowData)
            }
        }
    }

    totalRow_m.unshift(rowHeader);

    totalRow.current = totalRow_m;

    const list_row: React.ReactNode = totalRow.current.map((data: RowProps, index: number) => {
        return (
            <Row data={data} rowIndex={ index } key={index} />
        )
    })

    const list_index: React.ReactNode = totalRow.current.map((data: RowProps, index: number) => {
        if (index === 0) {
            return (
                <div key={index}>STT</div>
            )
        }
        return (
            <div key={index}>{ index }</div>
        )
    })

    const list_button: React.ReactNode = totalRow.current.map((data: RowProps, index: number) => {
        if (index === 0) {
            return (
                <div key={index}><strong>Calculation</strong></div>
            )
        }
        return (
            <div key={index}><CalculateMoney /></div>
        )
    })

    const centerElement = useRef<HTMLDivElement | null>(null);
    const rightElement = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        
        if (centerElement.current && rightElement.current) {
            // console.log(centerElement, rightElement)
            const width_rightElement = rightElement.current.offsetWidth;
            // console.log(11111111111, width_rightElement)
            centerElement.current.style.paddingRight = `${width_rightElement}px`;
        }
    }, [centerElement, rightElement])
    

    return <div className="TKS-Rows">
        <div className='TKS-Rows-left'>
            { list_index }
        </div>
        <div className='TKS-Rows-center' ref={centerElement}>
            { list_row }
        </div>
        <div className='TKS-Rows-right' ref={rightElement}>
            { list_button }
        </div>
    </div>
};

export default React.memo(Rows);