import React, { memo } from "react";
import './styles.css';

import { CiCircleRemove } from 'react-icons/ci';
import { RiFileCopyFill } from 'react-icons/ri';

import { $ } from "utilize/Tricks";

const MedicationOrderImage = ({toastImage}) => {
    const handleRemove = () => {
        $('.MedicationOrderImage').classList.remove('active');
    }
    return (
        <div className="MedicationOrderImage">
            <div className="MedicationOrderImage-imageBox">
                <div className="MedicationOrderImage-imageBox-top">
                    <div className="MedicationOrderImage-imageBox-iconContainer">
                        <div>
                            <span>Copy</span>
                            <RiFileCopyFill size={25} />
                        </div>
                        <div onClick={() => handleRemove()}>
                            <span>Remove</span>
                            <CiCircleRemove size={25} />
                        </div>
                    </div>
                </div>
                <div className="MedicationOrderImage-imageBox-bottom">
                    <img src={toastImage} alt="" />
                </div>
            </div>
        </div>
    )
}

export default memo(MedicationOrderImage);