import React, { useState, useEffect, useRef } from "react";
import './styles.css';

// import axios from "axios";

import HomeBottomMedication from "./components/HomeBottomMedication";
import HomeBottomDoctorPharmacist from "./components/HomeBottomDotorPharmacist";

// import { SERVER_ADDRESS_GET_MEDICATION_HOME } from "config/server";

import { useLazyGetMedicationListFromHomeQuery } from "reduxStore/RTKQuery/medicationRTKQuery";

const HomeBottom = () => {
    const [select, setSelect] = useState(0);
    const [medications, setMedications] = useState([]);

    const pageSize = 20;
    const pageIndex = useRef(1);

    const [getMedicationListFromHome] = useLazyGetMedicationListFromHomeQuery();
    

    useEffect(() => {
        if (select === 0) {
            // axios({
            //     method: 'get',
            //     url: `${SERVER_ADDRESS_GET_MEDICATION_HOME}?pageIndex=${pageIndex.current}&pageSize=${pageSize}`
            // }).then(res => {
            //     const resData = res.data;
            //     if (resData.success) {
            //         setMedications(resData.medications.rows)
            //     } else {
            //         alert(resData.message);
            //     }
            // }).catch(error => console.error(error))   
            
            getMedicationListFromHome({
                pageIndex: pageIndex.current,
                pageSize: pageSize
            }).then(res => {
                const resData = res.data;
                if (resData.success) {
                    setMedications(resData.medications.rows)
                } else {
                    alert(resData.message);
                }
            }).catch(error => console.error(error))
        }
    }, [getMedicationListFromHome, select])

    const medication_list = medications.map((data, index) => {
        return (
            <div key={index}>
                <HomeBottomMedication onData={data} />
            </div>
        )
    })

    const doctorPharmacist_list = [
        1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30
    ].map((index, data) => {
        return (
            <div key={index}>
                <HomeBottomDoctorPharmacist />
            </div>
        )
    })
    return (
        <div className="HomeBottom">
            <div className="HomeBottom-header">
                <input type="radio" checked={select===0} onChange={() => setSelect(0)} />
                <input type="radio" checked={select===1} onChange={() => setSelect(1)} />
                <span>Medication or Doctor/Pharmacist ? Default is Medication</span>
            </div>      
            <div className="HomeBottom-list">
                { select === 0 ? medication_list : doctorPharmacist_list}
            </div>
        </div>
    )
}

export default HomeBottom;