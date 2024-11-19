import React from 'react';

import { TOAST_MESSAGE_CONST } from 'const';

// define table
export interface ContextTableProps {
    resizableStatus: React.MutableRefObject<boolean>,
    cellWidth: React.MutableRefObject<number>,
    cellX: React.MutableRefObject<number>,
    selectedColumn: React.MutableRefObject<number | undefined>,
    columnAmount: React.MutableRefObject<number>,
    rowAmount: React.MutableRefObject<number>,
    config: TableConfigProps,
    pageIndex: number,
    setPageIndex: React.Dispatch<React.SetStateAction<number>>,
    onSelectPage: (number: number) => void,
    loadDataState: string | undefined
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

// define icon
export interface WarnTriangleProps {
    size?: number,
    background?: string,
    fill?: string,
    stroke?: string,
    animation_time?: number,
    stroke_width?: number
}

export interface ErrorCircleProps {
    size?: number,
    background?: string,
    fill?: string,
    stroke?: string,
    animation_time?: number,
    stroke_width?: number
}

export interface TickSymbolProps {
    size?: number,
    background?: string,
    fill?: string,
    stroke?: string,
    animation_time?: number,
    stroke_width?: number
}

export interface DeleteCircleProps {
    size?: number,
    background?: string,
    fill?: string,
    stroke?: string,
    animation_time?: number,
    stroke_width?: number
}

// message
export interface ToastMessageProps {
    type: string,
    message: string
}

// overlay
export interface OverlayProps {
    zIndex?: number,
    show_type?: string,
    opacity_time?: number,
    show_time?: number,
    blear_rate?: number
}