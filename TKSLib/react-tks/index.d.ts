import React from 'react';

interface FollowStateProps {
    config?: FollowState_Config_Props;
    getData?: FollowState_GetData_Props;
    setData?: FollowState_SetData_Props;
    event?: FollowState_Event_Props;
}
interface FollowState_Config_Props {
    registerState?: FollowState_Config_RegisterState_Props[];
}
interface FollowState_SetData_Props {
    addState?: (newState: string) => void;
    clearStates?: () => void;
}
interface FollowState_GetData_Props {
    getRegistedStateConst?: <T_states>() => FollowState_CONST_STATE_Props<T_states>;
    getCurrrentState?: () => string | undefined;
    getBeforeState?: (index: number) => string | undefined;
    getAllState?: () => (string | undefined)[];
}
interface FollowState_Event_Props {
    isBeforCurrent?: (beforeState: string, currentState: string) => boolean;
}
interface FollowState_Config_RegisterState_Props {
    descrition?: string;
    state?: string;
}
type FollowState_CONST_STATE_Props<T_states> = {
    [key in keyof T_states]?: string;
};

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
    fields?: string[];
    max_width?: string;
    is_amount_input_negative?: boolean;
    amount_input_max?: number;
}
interface Table_Data_Props {
    values?: {
        [key: string]: any;
    }[];
    all_values?: {
        [key: string]: any;
    }[];
    customColumn_values?: Table_Data_CustomColumn_DataIn_Type[][];
}
type Table_Data_CustomColumn_DataIn_Type = {
    field: string;
    data: string;
};
interface Table_Control_Props {
    pageIndex?: number;
    loadDataState?: string;
}
interface Table_Event_Props {
    onSelectedPage?: (TKS: TKSProps) => void;
    customColumn?: Table_Event_CustomColumn_Props;
}
interface Table_Event_CustomColumn_Props {
    onInputChange?: (TKS: TKSProps) => void;
    onAddButton?: (TKS: TKSProps) => void;
    onSubButton?: (TKS: TKSProps) => void;
    onInput?: (TKS: TKSProps) => void;
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
    width?: number;
    maxminWidth?: 'max' | 'min';
    height?: number;
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
interface BigDownArrowProps {
    fill?: string;
    stroke?: string;
    stroke_width?: number;
}
interface BigUpArrowProps {
    fill?: string;
    stroke?: string;
    stroke_width?: number;
}
interface ThreeDotHorizontalProps {
}
interface ThreeDotVerticalProps {
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
interface Table1_Props {
    config?: Table1_Config_Props;
    data?: Table1_Data_Props;
    control?: Table1_Control_Props;
    event?: Table1_Event_Props;
}
interface Table1_Config_Props {
    cell_width?: string;
    cell_maxWidth?: string;
    columnInfor?: Table1_Config_ColumnInfor_Props[];
}
interface Table1_Config_ColumnInfor_Props {
    columnName: string;
    fieldName: string;
}
interface Table1_Data_Props {
    values?: {
        [key: string]: any;
    }[];
}
interface Table1_Control_Props {
}
interface Table1_Event_Props {
}

interface MyTableProps extends React.HTMLProps<HTMLDivElement> {
    table?: TableProps;
    [key: string]: any;
}
declare const _default$h: React.NamedExoticComponent<MyTableProps>;

interface MyTable1Props extends React.HTMLProps<HTMLDivElement> {
    table1?: Table1_Props;
    [key: string]: any;
}
declare const _default$g: React.NamedExoticComponent<MyTable1Props>;

interface MyDialogProps extends React.HTMLProps<HTMLDivElement> {
    dialog?: DialogProps;
    [key: string]: any;
}
declare const _default$f: React.NamedExoticComponent<MyDialogProps>;

interface MyLoadProps extends React.HTMLProps<HTMLDivElement> {
    load: LoadProps;
    [key: string]: any;
}
declare const _default$e: React.NamedExoticComponent<MyLoadProps>;

interface MyOverlayProps extends React.HTMLProps<HTMLDivElement> {
    overlay?: OverlayProps;
    [key: string]: any;
}
declare const _default$d: React.NamedExoticComponent<MyOverlayProps>;

interface MyToastMessageProps extends React.HTMLProps<HTMLDivElement> {
    toastMessage?: ToastMessageProps;
    [key: string]: any;
}
declare const _default$c: React.NamedExoticComponent<MyToastMessageProps>;

interface MyTickSymbolProps extends React.HTMLProps<SVGSVGElement> {
    tickSymbol?: TickSymbolProps;
    [key: string]: any;
}
declare const _default$b: React.NamedExoticComponent<MyTickSymbolProps>;

interface MyWarnTriangleProps extends React.HTMLProps<SVGSVGElement> {
    warnTriangle?: WarnTriangleProps;
    [key: string]: any;
}
declare const _default$a: React.NamedExoticComponent<MyWarnTriangleProps>;

interface MyErrorCircleProps extends React.HTMLProps<SVGSVGElement> {
    errorCircle?: ErrorCircleProps;
    [key: string]: any;
}
declare const _default$9: React.NamedExoticComponent<MyErrorCircleProps>;

interface MyDeleteCircleProps extends React.HTMLProps<SVGSVGElement> {
    deleteCircle?: DeleteCircleProps;
    [key: string]: any;
}
declare const _default$8: React.NamedExoticComponent<MyDeleteCircleProps>;

interface MyBigLeftArrowProps extends React.HTMLProps<SVGSVGElement> {
    bigLeftArrow?: BigLeftArrowProps;
    [key: string]: any;
}
declare const _default$7: React.NamedExoticComponent<MyBigLeftArrowProps>;

interface MyBigRightArrowProps extends React.HTMLProps<SVGSVGElement> {
    bigRightArrow?: BigRightArrowProps;
    [key: string]: any;
}
declare const _default$6: React.NamedExoticComponent<MyBigRightArrowProps>;

interface MyBigDownArrowProps extends React.HTMLProps<SVGSVGElement> {
    bigDownArrow?: BigDownArrowProps;
    [key: string]: any;
}
declare const _default$5: React.NamedExoticComponent<MyBigDownArrowProps>;

interface MyBigUpArrowProps extends React.HTMLProps<SVGSVGElement> {
    bigUpArrow?: BigUpArrowProps;
    [key: string]: any;
}
declare const _default$4: React.NamedExoticComponent<MyBigUpArrowProps>;

interface MyAddCircleProps extends React.HTMLProps<SVGSVGElement> {
    addCircle?: AddCircleProps;
    [key: string]: any;
}
declare const _default$3: React.NamedExoticComponent<MyAddCircleProps>;

interface MySubCircleProps extends React.HTMLProps<SVGSVGElement> {
    subCircle?: SubCircleProps;
    [key: string]: any;
}
declare const _default$2: React.NamedExoticComponent<MySubCircleProps>;

interface MyThreeDotHorizontalProps$1 extends React.HTMLProps<SVGSVGElement> {
    threeDotHorizontal?: ThreeDotHorizontalProps;
    [key: string]: any;
}
declare const _default$1: React.NamedExoticComponent<MyThreeDotHorizontalProps$1>;

interface MyThreeDotHorizontalProps extends React.HTMLProps<SVGSVGElement> {
    threeDotVertical?: ThreeDotVerticalProps;
    [key: string]: any;
}
declare const _default: React.NamedExoticComponent<MyThreeDotHorizontalProps>;

declare namespace components {
  export { _default$3 as AddCircle, _default$5 as BigDownArrow, _default$7 as BigLeftArrow, _default$6 as BigRightArrow, _default$4 as BigUpArrow, _default$8 as DeleteCircle, _default$f as Dialog, _default$9 as ErrorCircle, _default$e as Loading, _default$d as Overlay, _default$2 as SubCircle, _default$h as Table, _default$g as Table1, _default$1 as ThreeDotHorizontal, _default as ThreeDotVertical, _default$b as TickSymbol, _default$c as ToastMessage, _default$a as WarnTriangle };
}

type inputProps = {
    initialValue?: string;
    config?: FollowState_Config_Props;
};
declare function useFollowState(input?: inputProps): FollowStateProps;

declare namespace hooks {
  export { useFollowState as FollowState };
}

declare function handleNext<T>(...args: ((data: T | undefined, next: () => void) => void)[]): void;

declare namespace handles {
  export { handleNext as Next };
}

type cluster_for_string_Props = {
    string: string;
    amount_of_a_cluster?: number;
    isStringTrim?: boolean;
};
type isNumberString_Props = {
    string: string;
    isLog?: boolean | false;
};
type alias_for_string_Props = {
    string: string;
    alias_list: alias_for_string_alias_list_Props[];
    skip_with_amount_of_fullChar?: boolean;
};
type alias_for_string_alias_list_Props = {
    alias: string;
    amount_of_char: number;
};
type round_numberString_Props = {
    numberString: string;
    fromIndex?: number;
    toIndex?: number;
};

type money_string_Props = {
    numberString: string;
    money_type: string;
    alias_list: string[];
    isLog?: boolean;
};
type return_money_string_Props = {
    numberString: string;
    isNumberString: boolean;
    clusted_string: string;
    alias_string: alias_for_string_alias_list_Props;
    rounded_numberString: string;
    clusted_rounded_numberString: string;
    full: string;
    full_with_round: string;
    money_type: string;
};

declare const moneyString: (money_string_parameter: money_string_Props) => return_money_string_Props;

declare const cluster_for_string: (cluster_for_string_parameter: cluster_for_string_Props) => string;
declare const isNumberString: (isNumberStringProps: isNumberString_Props) => boolean;
declare const alias_for_string: (alias_for_string_parameter: alias_for_string_Props) => alias_for_string_alias_list_Props;
declare const round_numberString: (round_numberString_parameter: round_numberString_Props) => string;

declare const utils_alias_for_string: typeof alias_for_string;
declare const utils_cluster_for_string: typeof cluster_for_string;
declare const utils_isNumberString: typeof isNumberString;
declare const utils_moneyString: typeof moneyString;
declare const utils_round_numberString: typeof round_numberString;
declare namespace utils {
  export { utils_alias_for_string as alias_for_string, utils_cluster_for_string as cluster_for_string, utils_isNumberString as isNumberString, utils_moneyString as moneyString, utils_round_numberString as round_numberString };
}

export { components as Components, handles as Handles, hooks as Hooks, utils as Utils };
