import React from "react";
import './styles.css';

const HomeBottomDoctorPharmacist = () => {

    const detailDoctorPharmacist = () => {
        const overlayDoctorPharmacist = document.querySelector('.OverlayDoctorPharmacist');
        const overlay = document.querySelector(".Overlay");
        overlay.classList.add('show');
        overlayDoctorPharmacist.classList.add('show');
    }

    return (
        <div className="HomeBottomDoctorPharmacist">
            <img src="https://tse2.mm.bing.net/th?id=OIP.HgVWPMGxqTDp5nvc617YVAAAAA&pid=Api&P=0&h=180" onClick={() => detailDoctorPharmacist()} alt=""/>
            <p>Object:</p>
            <p>Id:</p>
            <p>Name:</p>
            <p>Type:</p>
            <p>Major:</p>
            <p>Price:</p>
        </div>
    )
}

export default HomeBottomDoctorPharmacist;