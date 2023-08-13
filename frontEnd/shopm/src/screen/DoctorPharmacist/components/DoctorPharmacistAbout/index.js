import React, { useContext, useEffect } from "react";
import './styles.css';

import { ThemeContextApp } from "utilize/ContextApp";

import { FiMoreHorizontal } from 'react-icons/fi';
import { BsChevronDown } from 'react-icons/bs';
import { RiArrowUpSLine } from 'react-icons/ri';


const DoctorPharmacistAbout = () => {

    const clickDocument = useContext(ThemeContextApp);

    useEffect(() => {
        return () => {
            clickDocument.clear();
        }
    }, [clickDocument])

    const handleMoreHidden = (e) => {
        e.stopPropagation();
        const queryMoreHidden = document.querySelector('.DoctorPharmacistAbout-footer');
        queryMoreHidden.children[0].classList.toggle('DoctorPharmacistAbout-footer-svgActive');
        queryMoreHidden.children[1].classList.toggle('DoctorPharmacistAbout-footer-svgActive');
    }

    const handleOptions = (e) => {
        e.stopPropagation();
        const optionsDialog = document.querySelector('.DoctorPharmacistAbout-options');
        optionsDialog.classList.toggle('show');
        clickDocument.pushElement(optionsDialog);
    }

    

    return (
        <div className="DoctorPharmacistAbout">
            <div className="DoctorPharmacistAbout-headerContainer">
                <span className="DoctorPharmacistAbout-header">About</span>
                <div className="DoctorPharmacistAbout-optionsContainer">
                    <FiMoreHorizontal onClick={(e) => handleOptions(e)} size={25} />
                    <div className="DoctorPharmacistAbout-options">
                        <div>Add</div>
                        <div>Remove</div>
                        <div>Custom</div>
                    </div>
                </div>
            </div>
            <div className="DoctorPharmacistAbout-center">
                <div className="DoctorPharmacistAbout-inforObjContainer">
                    <span className="DoctorPharmacistAbout-inforObj">Office</span>
                    <span>Doctor</span>
                </div>
                <div className="DoctorPharmacistAbout-inforObjContainer">
                    <span className="DoctorPharmacistAbout-inforObj">Work from</span>
                    <span>06-2018111111111111 11111111111 111111111111 1111111111111</span>
                </div>
                <div className="DoctorPharmacistAbout-inforObjContainer">
                    <span className="DoctorPharmacistAbout-inforObj">Email</span>
                    <span>doctor@gmail.commmmmmm</span>
                </div>
            </div>
            <div className="DoctorPharmacistAbout-center">
                <div className="DoctorPharmacistAbout-inforObjContainer">
                    <span className="DoctorPharmacistAbout-inforObj">Joined</span>
                    <span>2 years</span>
                </div>
                <div className="DoctorPharmacistAbout-inforObjContainer">
                    <span className="DoctorPharmacistAbout-inforObj">Studyed in</span>
                    <span>y Ha Noi</span>
                </div>
                <div className="DoctorPharmacistAbout-inforObjContainer">
                    <span className="DoctorPharmacistAbout-inforObj">Resident</span>
                    <span>Ha Noi</span>
                </div>
            </div>
            <div className="DoctorPharmacistAbout-footer">
                <BsChevronDown className="DoctorPharmacistAbout-footer-svgActive" onClick={(e) => handleMoreHidden(e)} />
                <RiArrowUpSLine onClick={(e) => handleMoreHidden(e)} size={25} />
            </div>
        </div>
    )
}

export default DoctorPharmacistAbout;