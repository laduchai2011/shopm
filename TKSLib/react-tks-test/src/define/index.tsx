import React from 'react';

export interface ContextTableProps {
    resizableStatus: React.MutableRefObject<boolean>,
    cellWidth: React.MutableRefObject<number>,
    cellX: React.MutableRefObject<number>
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

export interface TableProps {
    rows: RowProps[]
}

