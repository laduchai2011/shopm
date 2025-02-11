import React, { useState, useEffect, useRef } from "react";
import './styles.css';

import { useParams } from "react-router-dom";

import { Table, Table1 } from 'react-tks/components';
import { moneyString } from 'react-tks/utils';

import { useMedicationScreen_getList_departmentsQuery } from "reduxStore/RTKQuery/departmentRTKQuery";


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

const MedicationDepartment = () => { 

    const {id: uuid_medication} = useParams();
    const thisElement = useRef(null);
   
    const [loadDataState, setLoadDataState] = useState(undefined);
    const pageSize = 10;
    const [pageIndex, setPageIndex] = useState(1);
    /** @type {[department__Options | undefined, React.Dispatch<React.SetStateAction<department__Options | undefined>>]} */
    const [departmentList, setDepartmentList] = useState();
    const columnsInfor = [
        { columnName: 'Name', fieldName: 'name'},
        { columnName: 'Title', fieldName: 'title'},
        { columnName: 'Amount', fieldName: 'amount'},
        { columnName: 'Sold', fieldName: 'sole'},
        { columnName: 'Remain', fieldName: 'remain'},
        { columnName: 'Recover', fieldName: 'recover'},
        { columnName: 'Return', fieldName: 'return'},
        { columnName: 'Consultant Cost', fieldName: 'consultantCost'},
        { columnName: 'Price', fieldName: 'price'},
        { columnName: 'Discount', fieldName: 'discount'},
        { columnName: 'Note', fieldName: 'note'}
    ]

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

    const [orderMoney, setOrderMoney] = useState({
        price: 0,
        cost: 0,
        sale: 0,
        vat: 0
    });
    const [shipCost, setShipCost] = useState(0);
    const [total, setTotal] = useState(0);

    const moneyString_ = (numberString) => {
        return moneyString({
            numberString: numberString,
            money_type: 'VND',
            alias_list: ['K', 'TR', 'T', 'KT'],
            isLog: true
        })
    } 
    /** @type {[selected_department_toBuy__Options[], React.Dispatch<React.SetStateAction<selected_department_toBuy__Options[]>>]} */
    const [selectedDepartment_List, setSelectedDepartment_List] = useState([]);
    const selectedDepartmentInfor = [
        { columnName: 'Name', fieldName: 'name'},
        { columnName: 'Amount To Buy', fieldName: 'amountToBuy'},
    ]
    useEffect(() => {
        
    }, [departmentList])

    const onAmountInput = (TKS) => {
        const data = TKS.data;
        console.log(11111111, data)

        /** @type {selected_department_toBuy__Options} */
        const selectedDepartment_List_ = {
            ...data.rowData,
            amountToBuy: Number(data.inputValue)
        };

        setSelectedDepartment_List(pre => [...pre, selectedDepartment_List_]);
    }


    return (
        <div className="MedicationDepartment" ref={thisElement}>
            <div className="MedicationDepartment-header">Department List</div>
            <div className="MedicationDepartment-body">
                <div>
                    { departmentList && <Table className="MedicationDepartment-table" table={{
                        data: {values: departmentList.rows},
                        config: {
                            columnsInfor: columnsInfor, 
                            pageSize: pageSize, maxRow: 
                            departmentList.count,
                            customColumn: {
                                type: 'calculateMoney',
                                fields: ['PRICE', 'COST', 'SALE', 'VAT'],
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
                <div>
                    {selectedDepartment_List.length>0 && <Table1 table1={{
                        config: {
                            columnInfor: selectedDepartmentInfor
                        },
                        data: {values: selectedDepartment_List},
                    }}/> }
                    {/* <Table1 table1={{
                        config: {
                            columnInfor: selectedDepartmentInfor
                        }
                    }}/> */}
                </div>
                <div className="MedicationDepartment-total">
                    <div>
                        <div><strong>Order:</strong></div>
                        <div>{`${moneyString_(orderMoney.price.toString()).full_with_round} - ${moneyString_(orderMoney.cost.toString()).full_with_round} - ${moneyString_(orderMoney.sale.toString()).full_with_round} - ${moneyString_(orderMoney.vat.toString()).full_with_round}`}</div>
                    </div>
                    <div>
                        <div><strong>Ship:</strong></div>
                        <div>{moneyString_(shipCost.toString()).full_with_round}</div>
                    </div>
                    <div>
                        <div><strong>Total:</strong></div>
                        <div>{moneyString_(total.toString()).full_with_round}</div>
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