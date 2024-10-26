import React from 'react';

export interface ContextTableProps {
    resizableStatus: React.MutableRefObject<boolean>,
    cellWidth: React.MutableRefObject<number>,
    cellX: React.MutableRefObject<number>,
    selectedColumn: React.MutableRefObject<number | undefined>,
    columnAmount: React.MutableRefObject<number>,
    rowAmount: React.MutableRefObject<number>,
    pageIndex?: number,
    setpageIndex?: React.Dispatch<React.SetStateAction<number>>
}

export interface CellProps {
    content: string,
    width?: string,
    height?: string, 
    textColor?: string,
    textWeight?: string
}

export interface RowProps {
    children?: React.ReactNode,
    cells: CellProps[]
}

export interface TableControlProps {
    pageIndex: number,
    pageSize: number, 
    maxRow: number
}

export interface TableProps {
    tableControl: TableControlProps,
    rows: RowProps[]
}

export interface TableConfigProps {
    columnAmount: number,
    pageIndex: number,
    pageSize: number,
    maxRow: number
}