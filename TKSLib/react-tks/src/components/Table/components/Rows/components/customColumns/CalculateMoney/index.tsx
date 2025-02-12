import React, { FC, useRef, useEffect, useContext, useState, useId } from 'react';
import './styles.css';

import { ContextTable } from 'src/components/Table/contextTable';

import AddCircle from 'src/components/Icon/AddCircle';
import SubCircle from 'src/components/Icon/SubCircle';

import { 
    Table_Config_Props,
    Table_Data_Props,
    Table_Event_Props,
    TKSProps, TKS_Init,
    Table_Data_CustomColumn_DataIn_Type
} from 'src/define';

import { 
    isNumberString,
    cluster_for_string,
    isFloat 
} from 'src/utils/string';

import moneyString from 'src/utils/moneyString';

const ADD_COLOR = 'rgb(0, 255, 232)';
const SUB_COLOR = 'rgb(255, 240, 0)';



const CalculateMoney: FC<{rowIndex: number}> = ({rowIndex}) => {

    const id = useRef<string>(`CalculateMoney__T: ${useId()}`);

    const context = useContext(ContextTable);

    if (!context) {
        throw new Error('Context in Table component cant undefined !');
    }

    const { 
        table
    } = context;

    const config: Table_Config_Props = {...table?.config};
    const event: Table_Event_Props = {...table?.event};
    const data: Table_Data_Props = {...table?.data};

    const dataTable: {[key: string]: any}[] | undefined = table?.data?.values;

    const is_amount_input_negative_default: boolean = false;
    const is_amount_input_negative: boolean = config.customColumn?.is_amount_input_negative ? config.customColumn?.is_amount_input_negative : is_amount_input_negative_default;

    const amount_input_max: number | undefined = config.customColumn?.amount_input_max;
    if (amount_input_max) {
        if (amount_input_max < 0) {
            console.error('amount_input_max field must is a positive interger');
        }
        if (isFloat(amount_input_max)) {
            console.error('amount_input_max field must is a float');
        }
    }

    const addSubElement = useRef<HTMLDivElement | null>(null);

    if (addSubElement.current) {
        addSubElement.current.style.setProperty('--add-color', ADD_COLOR);
        addSubElement.current.style.setProperty('--sub-color', SUB_COLOR);
    }

    const [input, setInput] = useState<string>('0');
    const [title, setTitle] = useState<string>('');
    const isNumberStringRef = useRef<boolean>(true);

    const customColumn_values: Table_Data_CustomColumn_DataIn_Type[][] | undefined = data.customColumn_values;

    const beforeInput = useRef<string>('0');
    useEffect(() => {
        if ((dataTable!==undefined) && (dataTable[rowIndex-1]!==undefined) && (beforeInput.current!==input)) {
            const TKS: TKSProps = {
                ...TKS_Init,
                name: undefined,
                id: id.current,
                data: {
                    inputValue: input,
                    rowData: dataTable[rowIndex-1],
                    rowIndex: rowIndex
                }
            }
            event.customColumn?.onInput && event.customColumn.onInput(TKS);
            beforeInput.current = input;
        }
    }, [input, event.customColumn, rowIndex, dataTable])

    const input_change = (e: React.ChangeEvent<HTMLInputElement>) => {
        if ((dataTable!==undefined) && (dataTable[rowIndex-1]!==undefined)) {
            const TKS: TKSProps = {
                ...TKS_Init,
                name: undefined,
                id: id.current,
                data: {
                    inputValue: e.target.value,
                    rowData: dataTable[rowIndex-1],
                    rowIndex: rowIndex
                }
            }
            event.customColumn?.onInputChange && event.customColumn?.onInputChange(TKS)
            const value = e.target.value;
            setInput(value);
            setTitle(cluster_for_string({string: value}));
            isNumberStringRef.current = isNumberString({string: input, isLog: true});
        }
    }

    const input_click = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.stopPropagation();
    }

    const handleSub = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation();
        let isRemoveDefaultFunction = false;
        if ((dataTable!==undefined) && (dataTable[rowIndex-1]!==undefined)) {
            const TKS: TKSProps = {
                ...TKS_Init,
                name: undefined,
                id: id.current,
                event: {
                    defaultEvent: e
                },
                data: {
                    inputValue: input,
                    rowData: dataTable[rowIndex-1],
                    rowIndex: rowIndex
                },
                removeDefaultFunction(): void {
                    isRemoveDefaultFunction = true;
                },
            }
            event.customColumn?.onSubButton && event.customColumn.onSubButton(TKS);
            if (!isRemoveDefaultFunction) {
                if (isNumberStringRef.current) {
                    const input_ = Number(input);
                    if (!is_amount_input_negative) { // input can't is a negative number
                        if (input_ >= 1) {
                            setInput((input_ - 1).toString());
                        }
                    } else {
                        setInput((input_ - 1).toString());
                    }
                } else {
                    console.warn('Your input is NOT string number !');
                }
            }
        }
        
    }

    const handleAdd = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation();
        let isRemoveDefaultFunction = false;
        if ((dataTable!==undefined) && (dataTable[rowIndex-1]!==undefined)) {
            const TKS: TKSProps = {
                ...TKS_Init,
                name: undefined,
                id: id.current,
                event: {
                    defaultEvent: e
                },
                data: {
                    inputValue: input,
                    rowData: dataTable[rowIndex-1],
                    rowIndex: rowIndex
                },
                removeDefaultFunction(): void {
                    isRemoveDefaultFunction = true;
                },
            }
            event.customColumn?.onAddButton && event.customColumn.onAddButton(TKS);
            if (!isRemoveDefaultFunction) {
                if (isNumberStringRef.current) {
                    const input_ = Number(input);
                    if (amount_input_max) {
                        if (input_ < amount_input_max - 1) {
                            setInput((input_ + 1).toString());
                        }
                    } else {
                        setInput((input_ + 1).toString());
                    }
                } else {
                    console.warn('Your input is NOT string number !');
                }
            }
        }
    }

    const fields: string[] | undefined = config.customColumn?.fields;

    const list_fields = fields && fields.map((field: string, index: number) => {
        let value: Table_Data_CustomColumn_DataIn_Type = {
            field: field,
            data: '0'
        };
        if (customColumn_values && customColumn_values[rowIndex-1]) {
            const customColumn_values_thisRow: Table_Data_CustomColumn_DataIn_Type[] = customColumn_values[rowIndex-1];
            for (let i: number = 0; i < customColumn_values_thisRow.length; i++) {
                if (value.field===customColumn_values_thisRow[i].field) {
                    value.data = customColumn_values_thisRow[i].data;
                }
            }
        }

        const moneyString_ = moneyString({
            numberString: value.data,
            money_type: 'VND',
            alias_list: ['K', 'TR', 'T', 'KT'],
            isLog: true
        })
        
        return (
            <div key={index}>
                <div className='TKS-CalculateMoney--'><strong>-</strong></div>
                <div className='TKS-CalculateMoney-text' title={moneyString_.clusted_string}>{moneyString_.full_with_round}</div>
            </div>
        )
    })
    
    return <div className="TKS-CalculateMoney" ref={addSubElement}>
        <div>
            <SubCircle subCircle={{size: 23, background: SUB_COLOR}} onClick={(e) => handleSub(e)} />
            <input 
                // value={moneyString_.clusted_rounded_numberString} 
                value={input}
                // onKeyDown={(e) => input_keyDown(e)}
                title={title} 
                onChange={(e) => input_change(e)}
                onClick={(e) => input_click(e)}
            />
            <div className='TKS-CalculateMoney-fieldContainer'>
                { list_fields }
            </div>
            <AddCircle addCircle={{size: 23, background: ADD_COLOR}} onClick={(e) => handleAdd(e)} />
        </div>
    </div>
};

export default CalculateMoney;