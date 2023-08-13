import React from "react";
import './styles.css';

import Header from "screen/Header";
import ManageMedicationHeader from "./components/ManageMedicationHeader";
import ManageMedicationTable from "./components/ManageMedicationTable";
import ManageMedicationSearch from "./components/ManageMedicationSearch";

const ManageMedication = () => {
    window.scrollTo(0, 0);
    return (
        <div className="ManageMedication">
            <div className="ManageMedication-header">
                <Header />
            </div>
            <div className="ManageMedication-body">
                <ManageMedicationHeader />
                <ManageMedicationSearch />
                <ManageMedicationTable />
            </div>
        </div>
    )
}

export default ManageMedication;