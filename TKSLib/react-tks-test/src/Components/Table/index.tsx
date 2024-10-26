import React, { FC, useRef, useState, useMemo, useEffect } from 'react';
import './styles.css';

import { ContextTable } from './contextTable';

import { 
    RowProps,
    TableProps, 
    ContextTableProps,
    TableConfigProps
} from 'define';

import Row from './components/Row';
import Control from './components/Control';

const Table: FC<{
        data: RowProps[], 
        config: TableConfigProps,
        onSelectPage: (number: number) => void
    }> = ({ 
        data: rows, 
        config, 
        onSelectPage 
    }) => {
    const resizableStatus: React.MutableRefObject<boolean> = useRef(false);
    const cellWidth: React.MutableRefObject<number> = useRef(0);
    const cellX: React.MutableRefObject<number> = useRef(0);
    const selectedColumn: React.MutableRefObject<number | undefined> = useRef(undefined);
    const columnAmount: React.MutableRefObject<number> = useRef(0);
    const rowAmount: React.MutableRefObject<number> = useRef(0);

    rowAmount.current = rows.length;

    const tableControlData = {
        pageIndex: config.pageIndex,
        pageSize: config.pageSize, 
        maxRow: config.maxRow
    }

    const tableProps: TableProps = {
        tableControl: tableControlData,
        rows: rows
    }

    const list_row: React.ReactNode = rows.map((data: RowProps, index: number) => {
        return (
            <Row data={data} index={index} key={index} />
        )
    })

    useEffect(() => {
        onSelectPage(1)
    }, [onSelectPage])

    const contextValue: ContextTableProps = useMemo(() => ({
        resizableStatus, 
        cellWidth, 
        cellX, 
        selectedColumn, 
        columnAmount, 
        rowAmount
    }), []);

    return <ContextTable.Provider value={contextValue}>
        <div className="TKS-Table">
            <div><Control data={tableProps.tableControl} /></div>
            <div>{ list_row }</div>
        </div>;
    </ContextTable.Provider>
};

export default Table;