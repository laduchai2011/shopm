import React, { useState, useEffect, useRef, useCallback } from "react";
import './styles.css';

import { useParams } from "react-router-dom";

import { 
    Table,
    // BigDownArrow,
    // BigUpArrow
} from 'react-tks/components';
import { moneyString } from 'react-tks/utils';

import { useMedicationScreen_getList_departmentsQuery } from "reduxStore/RTKQuery/departmentRTKQuery";

import MedicationDepartmentOrder from "./components/MedicationDepartmentOrder";
import MedicationDepartmentPay from "./components/MedicationDepartmentPay";

const LOAD_STATE = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
    READY: 'READY'
}

/**
 * @typedef {import('define/medication').selected_medication_toBuy} medselected_medication_toBuyicateOptions
*/
/**
 * @typedef {import('define/department').department__Options} department__Options
*/
/**
 * @typedef {import('define/department').selected_department_toBuy__Options} selected_department_toBuy__Options
*/
/**
 * @typedef {import('define/department').selectedDepartments_toBuy_subGroup__Options} selectedDepartments_toBuy_subGroup__Options
*/
/**
 * @typedef {import('define/department').calculate_money__Options} calculate_money__Options
*/
/**
 * @typedef {import('./type').Table_Data_CustomColumn_DataIn_Type} Table_Data_CustomColumn_DataIn_Type
*/

const MedicationDepartment = () => { 

    const {id: uuid_medication} = useParams();
    const thisElement = useRef(null);
   
    const [loadDataState, setLoadDataState] = useState(undefined);
    const pageSize = 10;
    const [pageIndex, setPageIndex] = useState(1);
    /** @type {[department__Options | undefined, React.Dispatch<React.SetStateAction<department__Options | undefined>>]} */
    const [departmentList, setDepartmentList] = useState(undefined);
    const columnsInfor = [
        { columnName: 'Name', fieldName: 'name'},
        { columnName: 'Title', fieldName: 'title'},
        { columnName: 'Amount', fieldName: 'amount'},
        { columnName: 'Sold', fieldName: 'sole'},
        { columnName: 'Remain', fieldName: 'remain'},
        { columnName: 'Recover', fieldName: 'recover'},
        { columnName: 'Return', fieldName: 'return'},
        // { columnName: 'Consultant Cost', fieldName: 'consultantCost'},
        { columnName: 'Price', fieldName: 'price'},
        { columnName: 'Discount', fieldName: 'discount'},
        { columnName: 'Note', fieldName: 'note'}
    ]

    const fields_customColumn = useRef(['PRICE', 'SALE', 'VAT']);
    /** @type {React.MutableRefObject<Table_Data_CustomColumn_DataIn_Type[][]>} */
    const datas_customColumn_full = useRef([]);
    /** @type {[Table_Data_CustomColumn_DataIn_Type[][], React.Dispatch<React.SetStateAction<Table_Data_CustomColumn_DataIn_Type[][]>>]} */
    const [datas_customColumn, set__datas_customColumn] = useState([]);
    // init datas_customColumn
    useEffect(() => {
        if (departmentList) {
            /** @type {Table_Data_CustomColumn_DataIn_Type[][]} */
            const datas_customColumn_ = [];
            for (let i = 0; i < departmentList.rows.length; i++) {
                /** @type {Table_Data_CustomColumn_DataIn_Type[]} */
                const data_customColumn = [];
                for (let j = 0; j < fields_customColumn.current.length; j++) { 
                    /** @type {Table_Data_CustomColumn_DataIn_Type} */
                    const table_Data_CustomColumn_DataIn = {field: fields_customColumn.current[j], data: '0'};
                    data_customColumn.push(table_Data_CustomColumn_DataIn);
                }
                datas_customColumn_.push(data_customColumn);
            }

            datas_customColumn_full.current = datas_customColumn_;
            set__datas_customColumn(datas_customColumn_);
        }
    }, [departmentList])

    const {
        data: data_departmentList, 
        // isFetching: isFetching_departmentList, 
        isError: isError_departmentList, 
        error: error_departmentList
    } = useMedicationScreen_getList_departmentsQuery({uuid_medication: uuid_medication, pageIndex: pageIndex, pageSize: pageSize});

    useEffect(() => {
        isError_departmentList && console.log(error_departmentList);
    }, [isError_departmentList, error_departmentList])
    useEffect(() => {
        const resData = data_departmentList;
        if (resData?.success) {
            setDepartmentList(resData.departmentList);
        } else {
            resData?.message && console.log(resData?.message);
        }
    }, [data_departmentList])


    // responsive
    const customColumn_max_width = useRef('');
    useEffect(() => {
        if (thisElement.current) {
            customColumn_max_width.current = getComputedStyle(thisElement.current).getPropertyValue('--customColumn-maxWidth');
        }
    }, [])

    const [total, setTotal] = useState(0);

    const moneyString_ = (numberString) => {
        return moneyString({
            numberString: numberString,
            money_type: 'VND',
            alias_list: ['K', 'TR', 'T', 'KT'],
            isLog: true
        })
    } 

    /** @type {[selectedDepartments_toBuy_subGroup__Options[], React.Dispatch<React.SetStateAction<selectedDepartments_toBuy_subGroup__Options[]>>]} */
    const [selectedDepartments_toBuy_subGroup, set_selectedDepartments_toBuy_subGroup] = useState([]);

    const onAmountInput = (TKS) => {
        const data = TKS.data;
        const amountToBuy = Number(data.inputValue);
        const rowIndex = data.rowIndex;
        /** @type {department__Options} */
        const rowData = data.rowData;

        //----------------set-up for Table 1----------------//
        /** @type {selected_department_toBuy__Options} */
        const selectedDepartment_List_new = {
            ...rowData,
            amountToBuy: amountToBuy
        };
        const price_new = amountToBuy * selectedDepartment_List_new.price;
        const sale_new = amountToBuy * selectedDepartment_List_new.price * selectedDepartment_List_new.discount * 0.01;
        const vat_new = (price_new - sale_new) * 10 * 0.01;
        const ship_new = 10000;
        /** @type {selectedDepartments_toBuy_subGroup__Options} */
        const selectedDepartment_toBuy_new = {
            selected_departments_toBuy: [selectedDepartment_List_new],
            be_long_to_departmentGroup: selectedDepartment_List_new.uuid_departmentGroup,
            calculate_money: {
                price: price_new,
                sale: sale_new,
                vat: vat_new,
                ship: ship_new,
                total: price_new + vat_new + ship_new
            }
        };

        //--------------------calculateMoney for row-----------------//
        const price_w_amount = rowData.price * amountToBuy;
        const sale_w_amount = rowData.price * rowData.discount * 0.01 * amountToBuy;
        const vat_w_amount = (price_w_amount - sale_w_amount) * 10 * 0.01;

        /** @type {Table_Data_CustomColumn_DataIn_Type[][]} */
        const datas_customColumn_cp = [...datas_customColumn];
        /** @type {Table_Data_CustomColumn_DataIn_Type[]} */
        const data_customColumn_cp = datas_customColumn_cp[rowIndex-1];
        for (let i = 0; i < data_customColumn_cp.length; i++) {
            if (i===0) {
                datas_customColumn_full.current[rowIndex-1][i].data = price_w_amount.toString();
                data_customColumn_cp[i].data = Math.round(price_w_amount).toString();
            }
            if (i===1) {
                datas_customColumn_full.current[rowIndex-1][i].data = sale_w_amount.toString();
                data_customColumn_cp[i].data = Math.round(sale_w_amount).toString();
            }
            if (i===2) {
                datas_customColumn_full.current[rowIndex-1][i].data = vat_w_amount.toString();
                data_customColumn_cp[i].data = Math.round(vat_w_amount).toString();
            }
        } 
        datas_customColumn_cp[rowIndex-1] = data_customColumn_cp;
        set__datas_customColumn(datas_customColumn_cp)
        //-----------------------------------------------------------//

        //---------------------------selectedDepartments__toBuy_subGroup--------------------------------//
        /** @type {selectedDepartments_toBuy_subGroup__Options[]} */
        const selectedDepartments_toBuy_subGroup_cp = [...selectedDepartments_toBuy_subGroup];
        let exist_selectedDepartment_toBuy_subGroup = false;
        let index_selectedDepartment_List_toBuy_subGroup;
        let offset_amountToBuy = 0;
        for (let i = 0; i < selectedDepartments_toBuy_subGroup_cp.length; i++) {
            if (selectedDepartment_List_new.uuid_departmentGroup===selectedDepartments_toBuy_subGroup_cp[i].be_long_to_departmentGroup) {
                /** @type {selected_department_toBuy__Options[]} */
                const selected_departments_toBuy_cp = [...selectedDepartments_toBuy_subGroup_cp[i].selected_departments_toBuy];
                /** @type {calculate_money__Options} */
                const calculate_money_cp = {...selectedDepartments_toBuy_subGroup_cp[i].calculate_money};
                let exist_selectedDepartment_toBuy = false;
                let index_selectedDepartment_List_toBuy;

                offset_amountToBuy = selectedDepartment_List_new.amountToBuy;

                for (let i1 = 0; i1 < selected_departments_toBuy_cp.length; i1++) {
                    if (selected_departments_toBuy_cp[i1].uuid_department===selectedDepartment_List_new.uuid_department) {
                        offset_amountToBuy = selectedDepartment_List_new.amountToBuy - selected_departments_toBuy_cp[i1].amountToBuy;
                        selected_departments_toBuy_cp[i1].amountToBuy = selectedDepartment_List_new.amountToBuy;
                        exist_selectedDepartment_toBuy = true;
                        index_selectedDepartment_List_toBuy = i;
                        break;
                    }
                }
                if (!exist_selectedDepartment_toBuy) {
                    selected_departments_toBuy_cp.push(selectedDepartment_List_new);
                } else {
                    if (selectedDepartment_List_new.amountToBuy===0) {
                        selected_departments_toBuy_cp.splice(index_selectedDepartment_List_toBuy, 1);
                    }
                }

                selectedDepartments_toBuy_subGroup_cp[i].selected_departments_toBuy = selected_departments_toBuy_cp;
                
                //-------------------begin calculate money--------------------------//
                const price_ = calculate_money_cp.price;
                const sale_ = calculate_money_cp.sale;
                // const vat_ = calculate_money_cp.vat;
                const ship_ = calculate_money_cp.ship;
                // const total_ = calculate_money_cp.total;
                const price_update = price_ + offset_amountToBuy * selectedDepartment_List_new.price;
                const sale_update = sale_ + offset_amountToBuy * selectedDepartment_List_new.price * selectedDepartment_List_new.discount * 0.01;
                const vat_update = (price_update - sale_update) * 10 * 0.01;
                const ship_update = ship_ + 0;
                const total_update = price_update + vat_update + ship_update;
                calculate_money_cp.price = price_update;
                calculate_money_cp.sale = sale_update;
                calculate_money_cp.vat = vat_update;
                calculate_money_cp.ship = ship_update;
                calculate_money_cp.total = total_update;
                selectedDepartments_toBuy_subGroup_cp[i].calculate_money = calculate_money_cp;
                //-------------------end calculate money--------------------------//
 
                exist_selectedDepartment_toBuy_subGroup = true;
                index_selectedDepartment_List_toBuy_subGroup = i;
                break;
            }
        }
        if (!exist_selectedDepartment_toBuy_subGroup) {
            selectedDepartments_toBuy_subGroup_cp.push(selectedDepartment_toBuy_new);
        } else {
            if (selectedDepartments_toBuy_subGroup_cp[index_selectedDepartment_List_toBuy_subGroup].selected_departments_toBuy.length===0) {
                selectedDepartments_toBuy_subGroup_cp.splice(index_selectedDepartment_List_toBuy_subGroup, 1);
            }
        }

        set_selectedDepartments_toBuy_subGroup(selectedDepartments_toBuy_subGroup_cp);
        //----------------------------------------------------------------------------------------------//
    }

    const set_ship_cost = useCallback((indexOfGroup, newShipCost) => { 
        const selectedDepartments_toBuy_subGroup_ = [...selectedDepartments_toBuy_subGroup];
        const oldShipCost = selectedDepartments_toBuy_subGroup_[indexOfGroup].calculate_money.ship
        const oldTotal = selectedDepartments_toBuy_subGroup_[indexOfGroup].calculate_money.total;
        const offsetShipCost = newShipCost - oldShipCost;
        selectedDepartments_toBuy_subGroup_[indexOfGroup].calculate_money.ship = newShipCost;
        selectedDepartments_toBuy_subGroup_[indexOfGroup].calculate_money.total = oldTotal + offsetShipCost;
        set_selectedDepartments_toBuy_subGroup(selectedDepartments_toBuy_subGroup_);
    }, [selectedDepartments_toBuy_subGroup])

    useEffect(() => {
        //---------------------total--------------------------//
        let total_ = 0;
        for (let i = 0; i < selectedDepartments_toBuy_subGroup.length; i++) {
            total_ = total_ + selectedDepartments_toBuy_subGroup[i].calculate_money.total;
        }
        setTotal(total_);
        //---------------------------------------------------=//
    }, [selectedDepartments_toBuy_subGroup])

    // const [isShow_methodPay, set_isShow_methodPay] = useState(false);
    // const show_pay_method_element = useRef(null);
    // const handleShow_payMethod = () => {
    //     let isShow = isShow_methodPay;
    //     if (show_pay_method_element.current) {
    //         if (show_pay_method_element.current.classList.contains('show')) {
    //             show_pay_method_element.current.classList.remove('show');
    //             isShow = false;
    //         } else {
    //             show_pay_method_element.current.classList.add('show');
    //             isShow = true;
    //         }
    //     }

    //     setTimeout(() => {
    //         set_isShow_methodPay(isShow);
    //     }, 300)
    // }

    const list_selectedDepartments_toBuy_subGroup = selectedDepartments_toBuy_subGroup.map((data, index) => {
        return (
            <MedicationDepartmentOrder key={index} index={index} data={data} onSetShipCost={set_ship_cost} />
        )
    })

    return (
        <div className="MedicationDepartment" ref={thisElement}>
            <div className="MedicationDepartment-header">Department List</div>
            <div className="MedicationDepartment-body">
                <div>
                    { departmentList && <Table className="MedicationDepartment-table" table={{
                        data: {
                            values: departmentList.rows,
                            customColumn_values: datas_customColumn
                        },
                        config: {
                            columnsInfor: columnsInfor, 
                            pageSize: pageSize, maxRow: 
                            departmentList.count,
                            customColumn: {
                                type: 'calculateMoney',
                                fields: fields_customColumn.current,
                                max_width: customColumn_max_width.current
                            }
                        },
                        control: {
                            loadDataState: loadDataState, 
                            pageIndex: pageIndex
                        },
                        event: {
                            onSelectedPage(TKS) {
                                setLoadDataState(LOAD_STATE.LOADING);
                                const interval = setInterval(() => {
                                    const pageIndex_m = TKS.data.selectedPage;
                                    setPageIndex(pageIndex_m)
                                    setLoadDataState(LOAD_STATE.SUCCESS);
                                    clearInterval(interval)
                                }, 2000)
                            },
                            customColumn: {
                                onInput: (TKS) => onAmountInput(TKS)
                            }
                        }
                    }} /> }
                </div>
                { list_selectedDepartments_toBuy_subGroup }
                <div className="MedicationDepartment-total">
                    <MedicationDepartmentPay />
                    {/* <div>
                        <div>
                            <div>Pay Method</div>
                            {
                                isShow_methodPay ?
                                <BigUpArrow onClick={() => handleShow_payMethod()} /> :
                                <BigDownArrow onClick={() => handleShow_payMethod()} />
                            }  
                        </div>
                        <div ref={show_pay_method_element}>
                            <div>Cash (default)</div>
                            <div></div>
                        </div>
                    </div> */}
                    <div>
                        <div><strong>Total:</strong></div>
                        <div title={total}>{moneyString_(Math.round(total).toString()).full_with_round}</div>
                    </div>
                </div>
                <div className="MedicationDepartment-buttom">
                   <div>
                        <button>Buy Now</button>
                        <button> Add Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MedicationDepartment;