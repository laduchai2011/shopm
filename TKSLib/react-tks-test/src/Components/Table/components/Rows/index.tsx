import React, { FC, useContext, useRef, useEffect, useState } from 'react';
import './styles.css';

import { ContextTable } from 'src/components/Table/contextTable';

import { 
    Table_Config_Props,
    RowProps,
    CellProps,
    Table_Config_CustomColumn_Props,
    SkeletonLoadProps,
    LoadProps 
} from 'src/define';

import { 
    WARNING_COLOR, 
    LOAD_STATE,
    LOAD_COMPONENTS_CONST 
} from 'src/const';

import { 
    rowHoverIn,
    rowHoverOut,
    rowToggle 
} from '../utils';

import { clickStatus_of_row_Types } from '../utils/type';
import { CLICK_STATUS_TYPE } from '../utils/const';

import Row from '../Row';
import BigLeftArrow from 'src/components/Icon/BigLeftArrow';
import BigRightArrow from 'src/components/Icon/BigRightArrow';
import Loading from 'src/components/Loading';

import CalculateMoney from './components/customColumns/CalculateMoney';

const Rows: FC<{}> = () => {

    const context = useContext(ContextTable);
    
    if (!context) {
        throw new Error('Context in Rows component cant undefined !');
    }

    const { 
        table,
        elements,
        row_hoverColor
    } = context;

    const config: Table_Config_Props = {...table?.config};
    const loadDataState: string | undefined = table?.control?.loadDataState;
    const customColumn: Table_Config_CustomColumn_Props | undefined = config.customColumn;
    const data: {[key: string]: any}[] | undefined = table?.data?.values;

    const element_rowsOfIndex: React.MutableRefObject<(HTMLDivElement | null)[]> = elements.current.rowsOfIndex;
    const element_rows: React.MutableRefObject<(HTMLDivElement | null)[]> = elements.current.rows;
    const element_rowsOfCalculate: React.MutableRefObject<(HTMLDivElement | null)[]> = elements.current.rowsOfCalculate;

    const clickStatus_of_row = useRef<clickStatus_of_row_Types>(CLICK_STATUS_TYPE.READY);

    const totalRow: React.MutableRefObject<RowProps[]> = useRef([]);
    
    const cellWidth: string | undefined = config.cell?.width;
    const cellHeight: string | undefined = config.cell?.height;
    const customColumn_maxWidth: string | undefined = config.customColumn?.max_width;

    const elementRows = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (elementRows.current) {
            cellWidth && elementRows.current.style.setProperty('--Cell-width', cellWidth);
            cellHeight && elementRows.current.style.setProperty('--Cell-height', cellHeight);
            customColumn_maxWidth && elementRows.current.style.setProperty('--customColumn-maxWidth', customColumn_maxWidth);
        }
    }, [cellWidth, cellHeight, customColumn_maxWidth])

    useEffect(() => {
        const total_row = totalRow.current.length;
        for (let i: number = 0; i < total_row; i++) {
            if (element_rowsOfCalculate.current[i] && i > 0) {
                (element_rowsOfCalculate.current[i]!).style.setProperty('--background-color', row_hoverColor);
            }
            if (element_rowsOfIndex.current[i] && i > 0) {
                (element_rowsOfIndex.current[i]!).style.setProperty('--background-color', row_hoverColor);
            }
        }
        
    }, [totalRow, row_hoverColor, element_rowsOfCalculate, element_rowsOfIndex])

    const rowForm: RowProps = {
        cells: []
    };

    // set-up header oncly one time
    const cellHeader = (fieldName?: string, content?: string, textColor?: string, textWeight?: string): CellProps => {
        return {
            fieldName: fieldName,
            content: content,
            textColor: textColor,
            textWeight: textWeight,
            width: cellWidth,
            height: cellHeight
        }
    }
    const rowHeader: RowProps = {
        cells: []
    }
    if (config?.columnsInfor && rowHeader?.cells && rowForm?.cells) {
        for (let i: number = 0; i < config.columnsInfor.length; i++) {
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
                    rowData.cells[i].width = cellWidth;
                    rowData.cells[i].height = cellHeight;
                }
                totalRow_m.push(rowData)
            }
        }
    }

    totalRow_m.unshift(rowHeader);

    totalRow.current = totalRow_m;

    // handle position for custom column
    const [isCustomColumn, setIsCustomColumn] = useState<boolean>(true);
    const centerElement = useRef<HTMLDivElement | null>(null);
    const rightElement = useRef<HTMLDivElement | null>(null);
    useEffect(() => {  
        if (centerElement.current && rightElement.current) {
            const width_rightElement = rightElement.current.offsetWidth;
            centerElement.current.style.paddingRight = `${width_rightElement}px`;
            rightElement.current.style.width = `${width_rightElement}px`;
        }
    }, [centerElement, rightElement])

    const list_row: React.ReactNode = totalRow.current.map((data: RowProps, index: number) => {
        return (
            <Row data={data} rowIndex={ index } key={index} />
        )
    })

    const list_index: React.ReactNode = totalRow.current.map((data: RowProps, index: number) => {
        if (index === 0) {
            return (
                <div 
                    className='TKS-Rows-left-row' 
                    key={index} 
                    ref={(el) => element_rowsOfIndex.current[index] = el}
                >STT</div>
            )
        }
        return (
            <div 
                className='TKS-Rows-left-row' 
                key={index} 
                ref={(el) => element_rowsOfIndex.current[index] = el}
                onMouseOver={e => handleHoverIn_row(e, index)}
                onMouseOut={e => handleHoverOut_row(e, index)}
                onClick={e => handleClick_row(e, index)}
                onMouseDown={(e)=> handleMouseDown_row(e)}
            >{ index }</div>
        )
    })

    // custom width of custom-column
    const rightElementWidth = useRef<string>('');
    if (rightElement.current && rightElementWidth.current==='') {
        rightElementWidth.current = window.getComputedStyle(rightElement.current).width;
        if (element_rowsOfCalculate.current[0]) {
            element_rowsOfCalculate.current[0].style.width = rightElementWidth.current;
        }
    }

    const handleClickRight = () => {
        if (centerElement.current && rightElement.current) {
            rightElement.current.style.width = '20px';
            centerElement.current.style.paddingRight = '20px';
            setTimeout(() => {
                if (rightElement.current) {
                    rightElement.current.style.backgroundColor = 'rgb(235, 235, 235)';
                    setIsCustomColumn(false);
                }
            }, 1000)
        }
    }

    const handleClickLeft = () => {
        if (centerElement.current && rightElement.current) {
            // const rightElementWidth = window.getComputedStyle(rightElement.current).width;
            // console.log(rightElementWidth)
            rightElement.current.style.width = rightElementWidth.current;
            centerElement.current.style.paddingRight = rightElementWidth.current;
            setTimeout(() => {
                if (rightElement.current) {
                    rightElement.current.style.backgroundColor = '';
                    setIsCustomColumn(true);
                }
            }, 1000)
        }
    }

    const handleHoverIn_row = (e: React.MouseEvent, rowIndex: number) => {
        if (rowIndex > 0) {
            rowHoverIn(rowIndex, element_rowsOfIndex, element_rows, element_rowsOfCalculate)
        }
    }
    const handleHoverOut_row = (e: React.MouseEvent, rowIndex: number) => {
        if (rowIndex > 0) {
            rowHoverOut(rowIndex, element_rowsOfIndex, element_rows, element_rowsOfCalculate)
        }
    }
    const handleClick_row = (e: React.MouseEvent, rowIndex: number) => {
        if ((rowIndex > 0) && (clickStatus_of_row.current===CLICK_STATUS_TYPE.READY)) {
            rowToggle(rowIndex, element_rowsOfIndex, element_rows, element_rowsOfCalculate)
        }
    }
    const handleMouseDown_row = (e: React.MouseEvent) => {
        clickStatus_of_row.current = CLICK_STATUS_TYPE.READY;
        setTimeout(() => {
            clickStatus_of_row.current = CLICK_STATUS_TYPE.LOCKED;
        }, 200)
    }

    const skeletonLoad: SkeletonLoadProps = {
        maxminHeight: 'max',
        maxminWidth: 'max'
    }

    const load: LoadProps = {
        type: LOAD_COMPONENTS_CONST.LOADING_TYPE.SKELETON,
        infor: skeletonLoad
    }

    const fields: string[] | undefined = config.customColumn?.fields;
    let title_calculationMoney: string = '';
    if (fields) {
        title_calculationMoney = title_calculationMoney + '( ';
        for (let i: number = 0; i < fields?.length; i++) {
            if (i===fields.length-1) {
                title_calculationMoney = title_calculationMoney + `${fields[i]} `;
            } else {
                title_calculationMoney = title_calculationMoney + `${fields[i]} + `;
            }
        }
        title_calculationMoney = title_calculationMoney + ')';
    }

    const list_customRow: React.ReactNode = customColumn?.type==="calculateMoney" && totalRow.current.map((data: RowProps, index: number) => {
        if (index === 0) {
            return (
                <div 
                    key={index} 
                    className='TKS-Rows-right-header TKS-Rows-right-row' 
                    ref={(el) => element_rowsOfCalculate.current[index] = el}
                >
                    { isCustomColumn && <BigRightArrow className='TKS-Rows-right-header-svg1' onClick={() => handleClickRight()} /> }
                    { !isCustomColumn && <BigLeftArrow className='TKS-Rows-right-header-svg2' onClick={() => handleClickLeft()} /> }
                    <strong>{`Calculation ${title_calculationMoney}`}</strong>
                </div>
            )
        }
        return (
            <div 
                key={index} className='TKS-Rows-right-row' 
                ref={(el) => element_rowsOfCalculate.current[index] = el}
                onMouseOver={e => handleHoverIn_row(e, index)}
                onMouseOut={e => handleHoverOut_row(e, index)}
                onClick={e => handleClick_row(e, index)}
                onMouseDown={(e)=> handleMouseDown_row(e)}
            >
                <div>
                    { loadDataState===LOAD_STATE.LOADING && <Loading load={ load } /> }
                </div>
                <div>{isCustomColumn && <CalculateMoney rowIndex={index} />}</div>
            </div>
        )
    })
    

    return <div className="TKS-Rows" ref={elementRows}>
        <div className='TKS-Rows-left'>
            { list_index }
        </div>
        <div className='TKS-Rows-center' ref={centerElement}>
            { list_row }
        </div>
        { customColumn?.type!==undefined && <div className='TKS-Rows-right' ref={rightElement}>
            { list_customRow }
        </div> }
    </div>
};

export default React.memo(Rows);