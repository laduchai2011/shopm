import React from "react";
import './styles.css';

import { TiDelete } from 'react-icons/ti';

const OverlayDoctorPharmacist = () => {

    const closeOverlayOverlayDoctorPharmacist = () => {
        const overlay = document.querySelector('.Overlay'); 
        const overlayMedicine = document.querySelector('.OverlayDoctorPharmacist');
        overlay.classList.remove('show');
        overlayMedicine.classList.remove('show');
    }


    return (
        <div className="OverlayDoctorPharmacist">
            <div className="OverlayDoctorPharmacist-top">
                <div><TiDelete size={25} onClick={() => closeOverlayOverlayDoctorPharmacist()} /></div>
                <h3>name:asdfasgffdg</h3>
            </div>
            <p className="OverlayDoctorPharmacist-p">Type:</p>
            <img src="https://tse2.mm.bing.net/th?id=OIP.HgVWPMGxqTDp5nvc617YVAAAAA&pid=Api&P=0&h=180" alt=""/>
            <p className="OverlayDoctorPharmacist-p">Object:</p>
            <p className="OverlayDoctorPharmacist-p">Major:</p>
            <p className="OverlayDoctorPharmacist-p1">Describe:</p>
            {/* <iframe src="http://38.45.67.12/api/text/Product/6853b9b0-02c4-465f-862e-7a68c721491e-Sat May 27 2023-fc4c4da8-4b86-4a7b-9333-0972a806fd6b.txt" title="Iframe Example" /> */}
            <p className="OverlayDoctorPharmacist-p1">Information:</p>
            {/* <iframe src="http://38.45.67.12/api/text/Product/d7b1a554-c365-43ef-a488-f28e71604111-Sat%20May%2027%202023-fc4c4da8-4b86-4a7b-9333-0972a806fd6b.txt" title="Iframe Example" /> */}
            <div className="OverlayDoctorPharmacist-bottom">
                <h5>Price:23423235</h5>
                <div>
                    <button>
                        <a href="./doctorPharmacist/sdfsdhjfb" target="_blank" rel="noopener noreferrer">
                        Detail
                        </a>
                    </button>
                    <button>AddCart</button>
                </div>
            </div>
        </div>
    )
}

export default OverlayDoctorPharmacist;