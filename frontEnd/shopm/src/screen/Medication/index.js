import React, { useState, useEffect } from "react";
import './styles.css';

import axios from "axios";
import { useParams } from "react-router-dom";

import Header from "../Header";
import MedicationCommonInfor from "./components/MedicationCommonInfor";
import MedicationCatalog from "./components/MedicationCatalog";
import MedicationProvider from "./components/MedicationProvider";
import MedicationInformation from "./components/MedicationInformation";
import MedicationPay from "./components/MedicationPay";

import { MedicationContext } from './MedicationContext';
import { SERVER_ADDRESS_GET_MEDICATION } from "config/server";


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

    useEffect(() => {
        axios({
            method: 'get',
            url: `${SERVER_ADDRESS_GET_MEDICATION}/${uuid_medication}`,
        }).then(res => {
            const resData = res.data;
            if (resData.success) {
                setMedicationState(resData.medication);
            } else {
                alert(resData.message)
            }
        }).catch(error => console.error(error))
    }, [uuid_medication])
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