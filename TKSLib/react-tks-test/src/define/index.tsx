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

