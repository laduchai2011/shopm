import React from 'react';

// define table
export interface ContextTableProps {
    resizableStatus: React.MutableRefObject<boolean>,
    cellWidth: React.MutableRefObject<number>,
    cellX: React.MutableRefObject<number>,
    selectedColumn: React.MutableRefObject<number | undefined>,
    columnAmount: React.MutableRefObject<number>,
    rowAmount: React.MutableRefObject<number>,
    config: TableConfigProps,
    onSelectPage: (number: number) => void
}

export interface CellProps {
    fieldName: string,
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
    columnsInfor?: ColumnsInforProps[],
    pageSize: number,
    maxRow: number,
    controlPos?: string;
}

export interface ColumnsInforProps {
    columnName: string,
    fieldName: string  // fieldName of data
}

// define load
export interface LoadProps {
    type: string, 
    infor: DotCircleLoadProps | LineCircleLoadProps | SkeletonLoadProps
}

export interface DotCircleLoadProps {
    dotSize: string,
    dotBackgroundColor: string,
    dotAmount: string,
    circleSize: string
}

export interface LineCircleLoadProps {
    lineSize: number,
    lineBackgroundColor: string,
    circleSize: number
}

export interface SkeletonLoadProps {
    width: number,
    maxminWidth?: 'max' | 'min',
    height: number,
    maxminHeight?: 'max' | 'min'
}