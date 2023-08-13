import React from "react";
import './styles.css';

import { AiFillStar } from 'react-icons/ai';

const DoctorPharmacistGeneral = () => {
    return (
        <div className="DoctorPharmacistGeneral">
            <div className="DoctorPharmacistGeneral-infors">
                <div className="DoctorPharmacistGeneral-avatarContainer">
                    <img src="https://tse2.mm.bing.net/th?id=OIP.HgVWPMGxqTDp5nvc617YVAAAAA&pid=Api&P=0&h=180" alt=""/>
                    <div className="DoctorPharmacistGeneral-nameContainer">
                        <span className="DoctorPharmacistGeneral-name">namegdfgdfgdfg</span>
                        <div className="DoctorPharmacistGeneral-starContainer">
                            <AiFillStar size={20} color="red" />
                            <AiFillStar size={20} color="red" />
                            <AiFillStar size={20} color="red" />
                            <AiFillStar size={20} color="red" />
                            <AiFillStar size={20} color="red" />
                        </div>
                        <span className="DoctorPharmacistGeneral-follow">Follow: 1000</span>
                        <div className="DoctorPharmacistGeneral-btn">
                            <div>Chat Now</div>
                            <div>Follow</div>
                        </div>
                    </div>
                </div>
                <div className="DoctorPharmacistGeneral-infor">
                    <span className="DoctorPharmacistGeneral-inforObj">Work in</span>
                    <span>4536-546-567445-56</span>
                    <span className="DoctorPharmacistGeneral-inforObj">Address</span>
                    <span>ha noi sdfsdf sdf  sdfg sd sdg sdgsd gsd </span>
                </div>
                <div className="DoctorPharmacistGeneral-infor">
                    <span className="DoctorPharmacistGeneral-inforObj">Type</span>
                    <span>Doctor</span>
                    <span className="DoctorPharmacistGeneral-inforObj">Major</span>
                    <span>Tooth</span>
                </div>
            </div>
        </div>
    )
}

export default DoctorPharmacistGeneral;