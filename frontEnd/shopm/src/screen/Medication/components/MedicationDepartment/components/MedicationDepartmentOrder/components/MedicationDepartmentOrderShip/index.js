import React, { useRef, useState } from "react";
import './styles.css';

import * as ReactTKS from 'react-tks';

import { setCookie } from "auth/cookie";

const MedicationDepartmentOrderShip = ({type, ship_type, onSelected}) => { 

    const [textSet, setTextSet] = useState('Set selecte default'); 

    const settingDialogElement = useRef(null);

    const handleShipType = (type) => {
        onSelected(type, 5000)
    }

    const handleShowSetting = () => {
        if (settingDialogElement.current) {
            settingDialogElement.current.classList.toggle('show');
        }
    }

    const handleDefault = () => {
        setCookie('ship_type_default', type, 365);
        setTextSet('Set selected default successly');
    }

    return (
        <div className="MedicationDepartmentOrderShip">
            <div>
                <input type="checkbox" checked={ship_type===type} onChange={() => handleShipType(type)} />
                <p>{`Ship ${type}`}</p>
            </div>
            <div>
                <ReactTKS.Components.ThreeDotHorizontal onClick={() => handleShowSetting()} />
                <div ref={settingDialogElement} onClick={() => handleDefault()}>
                    { textSet }
                </div>
            </div>
        </div>
    )
}

export default MedicationDepartmentOrderShip;