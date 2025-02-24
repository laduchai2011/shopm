import React from 'react';
import { FollowStateProps } from 'src/myHooks/interface';

export interface TKSProps {
    name?: string,
    id?: string,
    data?: any,
    event?: {
        defaultEvent?: React.MouseEvent
    },
    removeDefaultFunction: () => void,
    [key: string]: any
}
export const TKS_Init: TKSProps = {
    removeDefaultFunction() {
        
    },
}

// define table
export interface TableProps {
    config?: Table_Config_Props,
    data?: Table_Data_Props,
    control?: Table_Control_Props,
    event?: Table_Event_Props
}
export interface Table_Config_Props {
    name?: string,
    id?: string,
    columnsInfor?: ColumnsInforProps[],
    pageSize?: number,
    maxRow?: number,
    controlPos?: string,
    customColumn?: Table_Config_CustomColumn_Props,
    cell?: CellProps
}
export interface Table_Config_CustomColumn_Props {
    type?: 'add-sub' | 'get-data' | 'calculateMoney',
    fields?: string[],
    max_width?: string,
    is_amount_input_negative?: boolean,
    amount_input_max?: number
}
export interface Table_Data_Props {
    values?: {[key: string]: any}[],
    all_values?: {[key: string]: any}[],
    customColumn_values?: Table_Data_CustomColumn_DataIn_Type[][]
}
// export interface Table_Data_CustomColumn_Props { 
//     values?: Table_Data_CustomColumn_DataIn_Type
//     rowIndex?: number
// }
export type Table_Data_CustomColumn_DataIn_Type = {
    field: string,
    data: string
}
export interface Table_Control_Props {
    pageIndex?: number,
    loadDataState?: string
}
export interface Table_Event_Props {
    onSelectedPage?: (TKS: TKSProps) => void,
    customColumn?: Table_Event_CustomColumn_Props
}
// type Table_Event_CustomColumn_DataOut_Type = {
//     field: string,
//     data: string
// }
export interface Table_Event_CustomColumn_Props {
    // onData?: (Table_Data_CustomColumn_DataOut: Table_Event_CustomColumn_DataOut_Type) => void,
    onInputChange?: (TKS: TKSProps) => void,
    onAddButton?: (TKS: TKSProps) => void,
    onSubButton?: (TKS: TKSProps) => void,
    onInput?: (TKS: TKSProps) => void
}
export interface Table_Element_Props {
    rowsOfIndex: React.MutableRefObject<(HTMLDivElement | null)[]>,
    rows: React.MutableRefObject<(HTMLDivElement | null)[]>,
    rowsOfCalculate: React.MutableRefObject<(HTMLDivElement | null)[]>,
    cells: React.MutableRefObject<(HTMLDivElement | null)[]>
}
export interface Table_Resizable_Props {
    cell_X: React.MutableRefObject<number>,
    cell_Y: React.MutableRefObject<number>,
    isResizable_X: React.MutableRefObject<boolean>,
    isResizable_Y: React.MutableRefObject<boolean>,
    cellWidth: React.MutableRefObject<number>,
    cellHeight: React.MutableRefObject<number>,
    selectedColumn: React.MutableRefObject<number | undefined>,
    selectedRow: React.MutableRefObject<number | undefined>
}
export interface ContextTableProps {
    table?: TableProps,
    columnAmount: React.MutableRefObject<number>,
    rowAmount: React.MutableRefObject<number>,
    pageIndex: number,
    default_pageSize: number,
    default_maxRow: number
    setPageIndex: React.Dispatch<React.SetStateAction<number>>,
    loadDataState: string | undefined,
    setLoadDataState: React.Dispatch<React.SetStateAction<string | undefined>>,
    isControl_pageIndex_defaultFunction: React.MutableRefObject<boolean>,
    isControl_loadDataState_defaultFunction: React.MutableRefObject<boolean>,
    follow_loadingState?: FollowStateProps,
    elements: React.MutableRefObject<Table_Element_Props>,
    row_hoverColor: string,
    resizable: React.MutableRefObject<Table_Resizable_Props>
}
export interface CellProps {
    fieldName?: string,
    content?: string,
    width?: string,
    height?: string, 
    textColor?: string,
    textWeight?: string
}
export interface RowProps {
    children?: React.ReactNode,
    cells?: CellProps[]
}
export interface TableControlProps {
    pageIndex: number,
    pageSize: number, 
    maxRow: number
}
export interface TableConfigProps {
    columnAmount?: number,
    columnsInfor?: ColumnsInforProps[],
    pageSize?: number,
    maxRow?: number,
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
    width?: number,
    maxminWidth?: 'max' | 'min',
    height?: number,
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

export interface AddCircleProps {
    size?: number,
    background?: string,
    fill?: string,
    stroke?: string,
    animation_time?: number,
    stroke_width?: number
}

export interface SubCircleProps {
    size?: number,
    background?: string,
    fill?: string,
    stroke?: string,
    animation_time?: number,
    stroke_width?: number
}

export interface BigLeftArrowProps {
    fill?: string,
    stroke?: string,
    stroke_width?: number
}

export interface BigRightArrowProps {
    fill?: string,
    stroke?: string,
    stroke_width?: number
}

export interface BigDownArrowProps {
    fill?: string,
    stroke?: string,
    stroke_width?: number
}

export interface BigUpArrowProps {
    fill?: string,
    stroke?: string,
    stroke_width?: number
}

export interface ThreeDotHorizontalProps {
    // fill?: string,
    // stroke?: string,
    // stroke_width?: number
}

export interface ThreeDotVerticalProps {
    // fill?: string,
    // stroke?: string,
    // stroke_width?: number
}

// message
export interface ToastMessageProps {
    config?: ToastMessage_Config_Props,
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
    config?: Overlay_Config_Props,
    data?: Overlay_Data_Props,
    control?: Overlay_Control_Props,
    event?: Overlay_Event_Props
}
export interface Overlay_Config_Props {
    name?: string,
    id?: string,
    zIndex?: number,
    show_type?: string,
    opacity_time?: number,
    show_time?: number,
    blear_rate?: number
}
export interface Overlay_Data_Props {

}
export interface Overlay_Control_Props {
    isShow?: boolean,
    isCenter?: boolean
}
export interface Overlay_Event_Props {
    onClose?: (TKS: TKSProps) => void,
}

// dialog
export interface DialogProps {
    config?: Dialog_Config_Props,
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
    button_font_size?: number,
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
    onClose?: (TKS: TKSProps) => void,
    onClickButton1?: (TKS: TKSProps) => void,
    onClickButton2?: (TKS: TKSProps) => void,
    onClickButton3?: (TKS: TKSProps) => void,
}









/////////////////// table1 ///////////////////////////
export interface Table1_Props {
    config?: Table1_Config_Props,
    data?: Table1_Data_Props,
    control?: Table1_Control_Props,
    event?: Table1_Event_Props
}
export interface Table1_Config_Props {
    cell_width?: string,
    cell_maxWidth?: string,
    columnInfor?: Table1_Config_ColumnInfor_Props[]
}
export interface Table1_Config_ColumnInfor_Props {
    columnName: string,
    fieldName: string  // fieldName of data
}
export interface Table1_Data_Props {
    values?: {[key: string]: any}[]
}
export interface Table1_Control_Props {
    
}
export interface Table1_Event_Props {
    
}

export interface Table1_CCRow_Props {
    config?: Table1_CCRow_Config_Props,
    data?: Table1_CCRow_Data_Props,
    control?: Table1_CCRow_Control_Props,
    event?: Table1_CCRow_Event_Props
}
export interface Table1_CCRow_Config_Props {
    // height?: string,
    // maxHeight?: string
    index_in_table?: number
}
export interface Table1_CCRow_Data_Props {
    cells: Table1_CCCell_Props[]
}
export interface Table1_CCRow_Control_Props {
    
}
export interface Table1_CCRow_Event_Props {
    
}

export interface Table1_CCCell_Props {
    config?: Table1_CCCell_Config_Props,
    data?: Table1_CCCell_Data_Props,
    control?: Table1_CCCell_Control_Props,
    event?: Table1_CCCell_Event_Props
}
export interface Table1_CCCell_Config_Props {
    index_in_table?: number,
    index_in_row?: number,
    text_color?: string,
    text_weight?: string
    width?: string,
    height?: string
}
export interface Table1_CCCell_Data_Props {
    fieldName?: string,
    content?: string,
}
export interface Table1_CCCell_Control_Props {
    
}
export interface Table1_CCCell_Event_Props {
    
}

export interface Table1_Context_Props {
    table1?: Table1_Props,
    elements: React.MutableRefObject<Table1_Element_Props>
}

export interface Table1_Element_Props {
    cell_element: React.MutableRefObject<(HTMLDivElement | null)[]>
}