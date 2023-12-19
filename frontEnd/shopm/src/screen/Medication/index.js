import React, { useState, useEffect } from "react";
import './styles.css';

import { useParams } from "react-router-dom";

import Header from "../Header";
import MedicationCommonInfor from "./components/MedicationCommonInfor";
import MedicationCatalog from "./components/MedicationCatalog";
import MedicationProvider from "./components/MedicationProvider";
import MedicationInformation from "./components/MedicationInformation";
import MedicationPay from "./components/MedicationPay";

import { MedicationContext } from './MedicationContext';
import { useGetMedicationQuery } from "reduxStore/RTKQuery/medicationRTKQuery";


/**
*@typedef {
*name: string,
*image: text,
*subject: string,
*object: string,
*symptom: string,
*type: string,
*price: float,
*note: string,
*catalog: text,
*information: text,
*amount: integer,
*sold: integer,
*discount: float,
*averageRating: float,
*rateCount: integer,
*status: string
*uuid_provider: uuid
*} medicateOptions
*/ 

const Medication = () => {
    const [medicationSate, setMedicationState] = useState();
    const [buyNow, setBuyNow] = useState({
        priceTotal: 0,
        status: false
    })
    const {id: uuid_medication} = useParams();

    const {
        data: data_medicationSate, 
        // isFetching: isFetching_medicationSate, 
        isError: isError_medicationSate, 
        error: error_medicationSate
    } = useGetMedicationQuery({uuid_medication: uuid_medication});

    useEffect(() => {
        isError_medicationSate && console.log(error_medicationSate);
    }, [isError_medicationSate, error_medicationSate])
    useEffect(() => {
        const resData = data_medicationSate;
        if (resData?.success) {
            setMedicationState(resData?.medication);
        } else {
            resData?.message && console.log(resData?.message);
        }
    }, [data_medicationSate])

    return (
        <div className="Medication">
            <Header />
            {medicationSate && <MedicationContext.Provider value={{ medicationSate, buyNow, setBuyNow }}>
                <div className="Medication-main">
                    <MedicationCommonInfor />
                    <MedicationCatalog />
                    <MedicationProvider />
                    <MedicationInformation />
                    <MedicationPay />
                </div>
            </MedicationContext.Provider>}
        </div>
    )
}

export default Medication;