import React from "react";
import './styles.css';

import Header from "../Header";
import DoctorPharmacistGeneral from "./components/DoctorPharmacistGeneral";
import DoctorPharmacistReadyService from "./components/DoctorPharmacistReadyService";
import DoctorPharmacistAbout from "./components/DoctorPharmacistAbout";
import DoctorPharmacistInfor from "./components/DoctorPharmacistInfor";
import DoctorPharmacistFooter from "./components/DoctorPharmacistFooter";

const DoctorPharmacist = () => {
    return (
        <div className="DoctorPharmacist">
            <Header />
            <div className="DoctorPharmacist-main">
                <DoctorPharmacistGeneral />
                <DoctorPharmacistReadyService />
                <DoctorPharmacistAbout />
                <DoctorPharmacistInfor />
            </div>
            <DoctorPharmacistFooter />
        </div>
    )
}

export default DoctorPharmacist;