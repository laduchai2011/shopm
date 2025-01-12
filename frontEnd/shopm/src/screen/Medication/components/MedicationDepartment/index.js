import React, { useState, useEffect } from "react";
import './styles.css';

import { useParams } from "react-router-dom";

import { Table } from 'react-tks/components';

import { useMedicationScreen_getList_departmentsQuery } from "reduxStore/RTKQuery/departmentRTKQuery";


const LOAD_STATE = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
    READY: 'READY'
}

const MedicationDepartment = () => { 

    const {id: uuid_medication} = useParams();
   
    const [loadDataState, setLoadDataState] = useState(undefined);
    const pageSize = 10;
    const [pageIndex, setPageIndex] = useState(1);
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

    return (
        <div className="MedicationDepartment">
             <div className="MedicationDepartment-header">Department List</div>
            <div className="MedicationDepartment-body">
                <div>
                    { departmentList && <Table className="MedicationDepartment-table" table={{
                        data: {values: departmentList.rows},
                        config: {columnsInfor: columnsInfor, pageSize: pageSize, maxRow: departmentList.count},
                        control: {loadDataState: loadDataState, pageIndex: pageIndex},
                        event: {onSelectedPage(TKS) {
                            setLoadDataState(LOAD_STATE.LOADING);
                            const interval = setInterval(() => {
                                const pageIndex_m = TKS.data.selectedPage;
                                setPageIndex(pageIndex_m)
                                setLoadDataState(LOAD_STATE.SUCCESS);
                                clearInterval(interval)
                            }, 2000)
                        },}
                    }} /> }
                </div>
            </div>
        </div>
    )
}

export default MedicationDepartment;