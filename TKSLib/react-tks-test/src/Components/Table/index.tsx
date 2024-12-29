import React, { FC, useRef, useMemo, useState, useEffect } from 'react';
import './styles.css';

import { ContextTable } from './contextTable';

import { useFollowState } from 'src/myHooks';
import { FollowState_Config_RegisterState_Props } from 'src/myHooks/interface';

import { 
    RowProps,
    TableProps, 
    Table_Config_Props,
    ContextTableProps,
    CellProps,
} from 'src/define';

import { WARNING_COLOR, LOAD_STATE } from 'src/const';

import Row from './components/Row';
import Control from './components/Control';

const Table: FC<{
        table?: TableProps
    }> = ({ 
        table
    }) => {

    const config: Table_Config_Props = {...table?.config};

    const isRender = table?.config?.columnsInfor ? true : false;
  
    const data: {[key: string]: any}[] | undefined = table?.data?.values;

    const resizableStatus: React.MutableRefObject<boolean> = useRef(false);
    const cellWidth: React.MutableRefObject<number> = useRef(0);
    const cellX: React.MutableRefObject<number> = useRef(0);
    const selectedColumn: React.MutableRefObject<number | undefined> = useRef(undefined);
    const columnAmount: React.MutableRefObject<number> = useRef(0);
    const rowAmount: React.MutableRefObject<number> = useRef(0);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [loadDataState, setLoadDataState] = useState<string | undefined>(undefined);
    const totalRow: React.MutableRefObject<RowProps[]> = useRef([]);

    let isControl_pageIndex_defaultFunction = useRef<boolean>(true);
    let isControl_loadDataState_defaultFunction = useRef<boolean>(true);

    const default_pageSize: number = 10;
    const default_maxRow: number = 50;
    const pageSize: number | undefined = table?.config?.pageSize;
    const maxRow: number | undefined = table?.config?.maxRow;

    const registedStates: FollowState_Config_RegisterState_Props[] | undefined = [
        {
            descrition: 'When load data',
            state: LOAD_STATE.LOADING
        },
        {
            descrition: 'When load success',
            state: LOAD_STATE.SUCCESS
        },
        {
            descrition: 'When load failure',
            state: LOAD_STATE.FAILURE
        },
        {
            descrition: 'When load ready',
            state: LOAD_STATE.READY
        }
    ]
    const follow_loadingState = useFollowState({
        config: {
            registerState: registedStates
        }
    });

    useEffect(() => {
        if (table?.control?.pageIndex!==undefined && table?.control?.pageIndex!==null && table?.control?.pageIndex < 1) {
            console.warn({
                message: 'pageIndex must is a number > 0',
                pageIndex: table?.control?.pageIndex
            })
        }
        if (table?.control?.pageIndex) {
            setPageIndex(table.control.pageIndex);
            isControl_pageIndex_defaultFunction.current = false;
        }
    }, [table?.control?.pageIndex])
    useEffect(() => {
        if (table?.control?.loadDataState) {
            setLoadDataState(table.control.loadDataState);
            isControl_loadDataState_defaultFunction.current = false;
        }
    }, [table?.control?.loadDataState, loadDataState])

    useEffect(() => {
        if (loadDataState && follow_loadingState.setData?.addState) {
            follow_loadingState.setData?.addState(loadDataState);
        }
    }, [loadDataState, follow_loadingState.setData])

    // cell
    const cellElements = useRef<(HTMLDivElement | null)[]>([]);

    if (data) {
        rowAmount.current = data.length + 1;

        if (data.length > default_pageSize) {
            console.warn({
                message: 'Data more than default size (is 10). Data can lose',
                dataSize: data.length,
                defaultSize: default_pageSize
            });
        }

        if (pageSize===undefined) {
            console.warn({
                message: 'You should pass a value for "pageSize"',
                default_pageSize: default_pageSize
            });
        }

        if (maxRow===undefined) {
            console.warn({
                message: 'You should pass a value for "maxRow"',
                default_maxRow: default_maxRow
            });
        }
    }
    
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

    const handleControlPos = (): string => {
        if (config.controlPos==="bottom") {
            return 'bottom';
        } else {
            return 'top';
        }
    };
      
    const list_row: React.ReactNode = totalRow.current.map((data: RowProps, index: number) => {
        return (
            <Row data={data} rowIndex={ index } key={index} />
        )
    })

    const contextValue: ContextTableProps = useMemo(() => ({
        table,
        cellElements,
        resizableStatus, 
        cellWidth, 
        cellX, 
        selectedColumn, 
        columnAmount, 
        rowAmount,
        pageIndex,
        setPageIndex,
        default_pageSize,
        default_maxRow,
        loadDataState,
        setLoadDataState,
        isControl_pageIndex_defaultFunction,
        isControl_loadDataState_defaultFunction,
        follow_loadingState
    }), [table, pageIndex, setPageIndex, loadDataState, follow_loadingState]);

    return <ContextTable.Provider value={contextValue}>
        {isRender && <div className="TKS-Table">
            { handleControlPos()!=='bottom' && <div className='TKS-Table--Control'><Control /></div>}
            <div className='TKS-Table--Row'>{ list_row }</div>
            { handleControlPos()==='bottom' && <div className='TKS-Table--Control'><Control /></div>}
            {/* <button onClick={() => follow_loadingState.getData?.getAllState && console.log(follow_loadingState.getData?.getAllState())}>Click</button> */}
        </div>}
    </ContextTable.Provider>
};

export default React.memo(Table);