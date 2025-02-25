import React, { FC, useRef, useMemo, useState, useEffect } from 'react';
import './styles.css';

import { ContextTable } from './contextTable';

import { useFollowState } from 'src/myHooks';
import { FollowState_Config_RegisterState_Props } from 'src/myHooks/interface';

import { 
    // RowProps,
    TableProps, 
    Table_Config_Props,
    ContextTableProps,
    Table_Element_Props,
    Table_Resizable_Props
    // CellProps,
} from 'src/define';

import { 
    // WARNING_COLOR, 
    LOAD_STATE 
} from 'src/const';

// import Row from './components/Row';
import Rows from './components/Rows';
import Control from './components/Control';


interface MyTableProps extends React.HTMLProps<HTMLDivElement> {
    table?: TableProps,
    [key: string]: any
}

const Table: FC<MyTableProps> = ({table, className, ...props}) => {

    const row_hoverColor: string = 'rgb(233, 233, 233)';

    const config: Table_Config_Props = {...table?.config};

    const isRender = table?.config?.columnsInfor ? true : false;
  
    const data: {[key: string]: any}[] | undefined = table?.data?.values;

    const columnAmount: React.MutableRefObject<number> = useRef(0);
    const rowAmount: React.MutableRefObject<number> = useRef(0);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [loadDataState, setLoadDataState] = useState<string | undefined>(undefined);

    let isControl_pageIndex_defaultFunction = useRef<boolean>(true);
    let isControl_loadDataState_defaultFunction = useRef<boolean>(true);

    const element_rowsOfIndex = useRef<(HTMLDivElement | null)[]>([]);
    const element_rows = useRef<(HTMLDivElement | null)[]>([]);
    const element_rowsOfCalculate = useRef<(HTMLDivElement | null)[]>([]);
    const element_cells = useRef<(HTMLDivElement | null)[]>([]);
    const elements = useRef<Table_Element_Props>({
        rowsOfIndex: element_rowsOfIndex,
        rows: element_rows,
        rowsOfCalculate: element_rowsOfCalculate,
        cells: element_cells
    })

    // resizable
    const cell_X: React.MutableRefObject<number> = useRef(0);
    const cell_Y: React.MutableRefObject<number> = useRef(0);
    const cellWidth: React.MutableRefObject<number> = useRef(0);
    const cellHeight: React.MutableRefObject<number> = useRef(0);
    const isResizable_X: React.MutableRefObject<boolean> = useRef(false);
    const isResizable_Y: React.MutableRefObject<boolean> = useRef(false);
    const selectedColumn: React.MutableRefObject<number | undefined> = useRef(undefined);
    const selectedRow: React.MutableRefObject<number | undefined> = useRef(undefined);
    const resizable = useRef<Table_Resizable_Props>({
        cell_X: cell_X,
        cell_Y: cell_Y,
        isResizable_X: isResizable_X,
        isResizable_Y: isResizable_Y,
        cellWidth: cellWidth,
        cellHeight: cellHeight,
        selectedColumn: selectedColumn,
        selectedRow: selectedRow
    })

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

    const handleControlPos = (): string => {
        if (config.controlPos==="bottom") {
            return 'bottom';
        } else {
            return 'top';
        }
    };

    const contextValue: ContextTableProps = useMemo(() => ({
        table,
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
        follow_loadingState,
        elements,
        row_hoverColor,
        resizable
    }), [table, pageIndex, loadDataState, follow_loadingState, elements]);

    return <ContextTable.Provider value={contextValue}>
        {isRender && <div 
            className={`TKS-Table ${className || ''}`}
            {...props}
        >
            { handleControlPos()!=='bottom' && <div className='TKS-Table--Control'><Control /></div>}
            <div className='TKS-Table--Row'><Rows /></div>
            { handleControlPos()==='bottom' && <div className='TKS-Table--Control'><Control /></div>}
        </div>}
    </ContextTable.Provider>
};

export default React.memo(Table);