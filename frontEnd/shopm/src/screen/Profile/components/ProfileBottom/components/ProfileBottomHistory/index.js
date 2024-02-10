import React, { memo, useState, useEffect, useContext } from "react";
import './styles.css';

import { useNavigate } from "react-router-dom";

import { ThemeContextApp } from 'utilize/ContextApp';

import { useLazyGetOrderMedicationsFromProfileQuery } from "reduxStore/RTKQuery/orderMedicationRTKQuery";

/**
*@typedef {
*title: string,
*type: string,
*pageNumber: string,
*status: string,
*uuid_caseRecord: uuid,
*uuid_orderMyself: uuid,
*uuid_user: uuid
*} orderMedicationOptions
*/ 

const ProfileBottomHistory = () => {
    const { loginInfor } = useContext(ThemeContextApp);
    const navigate = useNavigate();

    const pageIndex = 1;
    const pageSize = 10;

    const [getOrderMedications, {
        data: data_orderMedications, 
        // isFetching: isFetching_orderMedications, 
        isError: isError_orderMedications,
        error: error_orderMedications
    }] = useLazyGetOrderMedicationsFromProfileQuery();
    const [orderMedications, setOrderMedications] = useState([]);
    useEffect(() => {
        isError_orderMedications && console.log(error_orderMedications);
    }, [isError_orderMedications, error_orderMedications])
    useEffect(() => {
        const resData = data_orderMedications;
        console.log(resData)
        if (resData?.success) {
            setOrderMedications(resData?.orderMedications?.rows);
        }
    }, [data_orderMedications])

    useEffect(() => {
        getOrderMedications({
            uuid_user: loginInfor?.uuid, 
            pageIndex: pageIndex, 
            pageSize: pageSize
        })
    }, [getOrderMedications])

    const list_orderMedication = orderMedications.map((data, index) => {
        return (
            <div key={index} className="ProfileBottomHistory-medicate">
                <div>{ data?.type }</div>
                <div>{ data?.title }</div>
                <div>
                    <button onClick={() => navigate(`/medication/order/${ data.uuid_orderMedication }`)}>Detail</button>
                </div>
            </div>
        )
    })

    return (
        <div className="ProfileBottomHistory">
            <div className="ProfileBottomHistory-header">
                <div className="active">Medication</div>
                <div>Examine</div>
            </div>
            <div className="ProfileBottomHistory-medicateList">
                { list_orderMedication }
            </div>
        </div>
    )
}

export default memo(ProfileBottomHistory);