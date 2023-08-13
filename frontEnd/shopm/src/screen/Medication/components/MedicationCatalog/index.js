import React, { useContext, memo } from "react";
import './styles.css';

import { MedicationContext } from "screen/Medication/MedicationContext";

const MedicationCatalog = () => {
    const { medicationSate } = useContext(MedicationContext);
    const catalogs = JSON.parse(medicationSate.catalog).catalogs;
    return (
        <div className="MedicationCatalog">
            <div className="MedicationCatalog-header">Catalog</div>
            <div className="MedicationCatalog-body">
                { catalogs.map((data, index) => {
                    return (
                        <div key={index} className="MedicationCatalog-catalogContainer">
                            <div><strong>{ data.subject }</strong></div>
                            <div>: { data.content }</div>
                        </div>
                    )
                }) }
            </div>
        </div>
    )
}

export default memo(MedicationCatalog);