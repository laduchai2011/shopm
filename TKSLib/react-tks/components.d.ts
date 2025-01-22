import React from 'react';

interface TKSProps {
    name?: string;
    id?: string;
    data?: any;
    event?: {
        defaultEvent?: React.MouseEvent;
    };
    removeDefaultFunction: () => void;
    [key: string]: any;
}
interface TableProps {
    config?: Table_Config_Props;
    data?: Table_Data_Props;
    control?: Table_Control_Props;
    event?: Table_Event_Props;
}
interface Table_Config_Props {
    name?: string;
    id?: string;
    columnsInfor?: ColumnsInforProps[];
    pageSize?: number;
    maxRow?: number;
    controlPos?: string;
    customColumn?: Table_Config_CustomColumn_Props;
    cell?: CellProps;
}
interface Table_Config_CustomColumn_Props {
    type?: 'add-sub' | 'get-data' | 'calculateMoney';
}
interface Table_Data_Props {
    values?: {
        [key: string]: any;
    }[];
    all_values?: {
        [key: string]: any;
    }[];
}
interface Table_Control_Props {
    pageIndex?: number;
    loadDataState?: string;
}
interface Table_Event_Props {
    onSelectedPage: (TKS: TKSProps) => void;
}
interface CellProps {
    fieldName?: string;
    content?: string;
    width?: string;
    height?: string;
    textColor?: string;
    textWeight?: string;
}
interface ColumnsInforProps {
    columnName: string;
    fieldName: string;
}
interface LoadProps {
    type: string;
    infor: DotCircleLoadProps | LineCircleLoadProps | SkeletonLoadProps;
}
interface DotCircleLoadProps {
    dotSize: string;
    dotBackgroundColor: string;
    dotAmount: string;
    circleSize: string;
}
interface LineCircleLoadProps {
    lineSize: number;
    lineBackgroundColor: string;
    circleSize: number;
}
interface SkeletonLoadProps {
    width: number;
    maxminWidth?: 'max' | 'min';
    height: number;
    maxminHeight?: 'max' | 'min';
}
interface WarnTriangleProps {
    size?: number;
    background?: string;
    fill?: string;
    stroke?: string;
    animation_time?: number;
    stroke_width?: number;
}
interface ErrorCircleProps {
    size?: number;
    background?: string;
    fill?: string;
    stroke?: string;
    animation_time?: number;
    stroke_width?: number;
}
interface TickSymbolProps {
    size?: number;
    background?: string;
    fill?: string;
    stroke?: string;
    animation_time?: number;
    stroke_width?: number;
}
interface DeleteCircleProps {
    size?: number;
    background?: string;
    fill?: string;
    stroke?: string;
    animation_time?: number;
    stroke_width?: number;
}
interface AddCircleProps {
    size?: number;
    background?: string;
    fill?: string;
    stroke?: string;
    animation_time?: number;
    stroke_width?: number;
}
interface SubCircleProps {
    size?: number;
    background?: string;
    fill?: string;
    stroke?: string;
    animation_time?: number;
    stroke_width?: number;
}
interface BigLeftArrowProps {
    fill?: string;
    stroke?: string;
    stroke_width?: number;
}
interface BigRightArrowProps {
    fill?: string;
    stroke?: string;
    stroke_width?: number;
}
interface ToastMessageProps {
    config?: ToastMessage_Config_Props;
    data?: ToastMessage_Data_Props;
    control?: ToastMessage_Control_Props;
    event?: ToastMessage_Event_Props;
}
interface ToastMessage_Config_Props {
    name?: string;
    id?: string;
    max_message?: number;
}
interface ToastMessage_Data_Props {
    type?: string;
    message?: string;
}
interface ToastMessage_Control_Props {
}
interface ToastMessage_Event_Props {
    onData?: (TKS: TKSProps) => void;
}
interface OverlayProps {
    config?: Overlay_Config_Props;
    data?: Overlay_Data_Props;
    control?: Overlay_Control_Props;
    event?: Overlay_Event_Props;
}
interface Overlay_Config_Props {
    name?: string;
    id?: string;
    zIndex?: number;
    show_type?: string;
    opacity_time?: number;
    show_time?: number;
    blear_rate?: number;
}
interface Overlay_Data_Props {
}
interface Overlay_Control_Props {
    isShow?: boolean;
    isCenter?: boolean;
}
interface Overlay_Event_Props {
    onClose?: (TKS: TKSProps) => void;
}
interface DialogProps {
    config?: Dialog_Config_Props;
    data?: Dialog_Data_Props;
    control?: Dialog_Control_Props;
    event?: Dialog_Event_Props;
}
interface Dialog_Config_Props {
    name?: string;
    id?: string;
    activate_button_1?: boolean;
    activate_button_2?: boolean;
    activate_button_3?: boolean;
    button_1_name?: string;
    button_2_name?: string;
    button_3_name?: string;
    opacity_time?: number;
    show_time?: number;
    button_font_size?: number;
    button_min_width?: number;
}
interface Dialog_Data_Props {
    message?: string;
    message_type?: string;
    message_color?: string;
}
interface Dialog_Control_Props {
    isShow?: boolean;
}
interface Dialog_Event_Props {
    onClose?: (TKS: TKSProps) => void;
    onClickButton1?: (TKS: TKSProps) => void;
    onClickButton2?: (TKS: TKSProps) => void;
    onClickButton3?: (TKS: TKSProps) => void;
}

interface MyTableProps extends React.HTMLProps<HTMLDivElement> {
    table?: TableProps;
    [key: string]: any;
}
declare const _default$c: React.NamedExoticComponent<MyTableProps>;

interface MyDialogProps extends React.HTMLProps<HTMLDivElement> {
    dialog?: DialogProps;
    [key: string]: any;
}
declare const _default$b: React.NamedExoticComponent<MyDialogProps>;

interface MyLoadProps extends React.HTMLProps<HTMLDivElement> {
    load: LoadProps;
    [key: string]: any;
}
declare const _default$a: React.NamedExoticComponent<MyLoadProps>;

interface MyOverlayProps extends React.HTMLProps<HTMLDivElement> {
    overlay?: OverlayProps;
    [key: string]: any;
}
declare const _default$9: React.NamedExoticComponent<MyOverlayProps>;

interface MyToastMessageProps extends React.HTMLProps<HTMLDivElement> {
    toastMessage?: ToastMessageProps;
    [key: string]: any;
}
declare const _default$8: React.NamedExoticComponent<MyToastMessageProps>;

interface MyTickSymbolProps extends React.HTMLProps<SVGSVGElement> {
    tickSymbol?: TickSymbolProps;
    [key: string]: any;
}
declare const _default$7: React.NamedExoticComponent<MyTickSymbolProps>;

interface MyWarnTriangleProps extends React.HTMLProps<SVGSVGElement> {
    warnTriangle?: WarnTriangleProps;
    [key: string]: any;
}
declare const _default$6: React.NamedExoticComponent<MyWarnTriangleProps>;

interface MyErrorCircleProps extends React.HTMLProps<SVGSVGElement> {
    errorCircle?: ErrorCircleProps;
    [key: string]: any;
}
declare const _default$5: React.NamedExoticComponent<MyErrorCircleProps>;

interface MyDeleteCircleProps extends React.HTMLProps<SVGSVGElement> {
    deleteCircle?: DeleteCircleProps;
    [key: string]: any;
}
declare const _default$4: React.NamedExoticComponent<MyDeleteCircleProps>;

interface MyBigLeftArrowProps extends React.HTMLProps<SVGSVGElement> {
    bigLeftArrow?: BigLeftArrowProps;
    [key: string]: any;
}
declare const _default$3: React.NamedExoticComponent<MyBigLeftArrowProps>;

interface MyBigRightArrowProps extends React.HTMLProps<SVGSVGElement> {
    bigRightArrow?: BigRightArrowProps;
    [key: string]: any;
}
declare const _default$2: React.NamedExoticComponent<MyBigRightArrowProps>;

interface MyAddCircleProps extends React.HTMLProps<SVGSVGElement> {
    addCircle?: AddCircleProps;
    [key: string]: any;
}
declare const _default$1: React.NamedExoticComponent<MyAddCircleProps>;

interface MySubCircleProps extends React.HTMLProps<SVGSVGElement> {
    subCircle?: SubCircleProps;
    [key: string]: any;
}
declare const _default: React.NamedExoticComponent<MySubCircleProps>;

export { _default$1 as AddCircle, _default$3 as BigLeftArrow, _default$2 as BigRightArrow, _default$4 as DeleteCircle, _default$b as Dialog, _default$5 as ErrorCircle, _default$a as Loading, _default$9 as OverLay, _default as SubCircle, _default$c as Table, _default$7 as TickSymbol, _default$8 as ToastMessage, _default$6 as WarnTriangle };
