import React from 'react';

export interface TKSProps {
    name?: string,
    id?: string,
    data?: any,
    event?: {
        defaultEvent?: React.MouseEvent
    }
}

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
    config?: ToastMessage_Config_Props
    data?: ToastMessage_Data_Props,
    control?: ToastMessage_Control_Props,
    event?: ToastMessage_Event_Props 
}
export interface ToastMessage_Config_Props {
    name?: string,
    id?: string,
    max_message?: number
}
export interface ToastMessage_Data_Props {
    type?: string,
    message?: string
}
export interface ToastMessage_Control_Props {
    
}
export interface ToastMessage_Event_Props {
    onData?: (TKS: TKSProps) => void
}

// overlay
export interface OverlayProps {
    zIndex?: number,
    show_type?: string,
    opacity_time?: number,
    show_time?: number,
    blear_rate?: number
}

// dialog
// export interface DialogProps {
//     message_type?: string,
//     message_color?: string,
//     activate_button_1?: boolean,
//     activate_button_2?: boolean,
//     activate_button_3?: boolean,
//     button_1_name?: string,
//     button_2_name?: string,
//     button_3_name?: string,
//     opacity_time?: number,
//     show_time?: number, 
//     button_font_size?: number
//     button_min_width?: number
// }
export interface DialogProps {
    config?: Dialog_Config_Props
    data?: Dialog_Data_Props,
    control?: Dialog_Control_Props,
    event?: Dialog_Event_Props
}
export interface Dialog_Config_Props {
    name?: string,
    id?: string,
    activate_button_1?: boolean,
    activate_button_2?: boolean,
    activate_button_3?: boolean,
    button_1_name?: string,
    button_2_name?: string,
    button_3_name?: string,
    opacity_time?: number,
    show_time?: number, 
    button_font_size?: number
    button_min_width?: number
}
export interface Dialog_Data_Props {
    message?: string,
    message_type?: string,
    message_color?: string
}
export interface Dialog_Control_Props {
    isShow?: boolean
}
export interface Dialog_Event_Props {
    onClose?: (TKS: TKSProps) => void
    onClickButton1?: (TKS: TKSProps) => void;
    onClickButton2?: (TKS: TKSProps) => void;
    onClickButton3?: (TKS: TKSProps) => void;
}