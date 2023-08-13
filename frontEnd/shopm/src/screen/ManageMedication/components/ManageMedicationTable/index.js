import React, { useState } from "react";
import './styles.css';

import ManageMedicationTableTop from "./components/ManageMedicationTableTop";
import ManageMedicationTableBottom from "./components/ManageMedicationTableBottom";

const ManageMedicationTable = () => {
    const [changeTop, setChangeTop] = useState({
        pageIndex: 1, 
        filter: 'all'
    });
    const [changeBottom, setChangBottom] = useState({
        pageNumber: '1'
    });
    return (
        <div className="ManageMedicationTable">
            <ManageMedicationTableTop changeTop={changeTop} setChangeTop={setChangeTop} changeBottom={changeBottom} />
            <ManageMedicationTableBottom changeTop={changeTop} setChangBottom={setChangBottom} />
        </div>
    )
}

export default ManageMedicationTable;