import React, { useEffect } from "react";
import './styles.css';

import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { $ } from "utilize/Tricks";
import CaseRecordInforSearchBox from "./components/CaseRecordInforSearchBox";
import CaseRecordInforPassiveSearchBox from "./components/CaseRecordInforPassiveSearchBox";

import { setDoctorOrPharmacistInfor } from "reduxStore/slice/caseRecordSlice";
import { getCookie } from "auth/cookie";

const CaseRecordInfor = () => {
    const { id: uuid_caseRecord } = useParams();
    const navigate = useNavigate();
    const caseRecordRole = getCookie('caseRecordRole');

    const currentIndex = useSelector(state => state.caseRecord.currentIndex);
    const caseRecords = useSelector(state => state.caseRecord.caseRecords);
    const loadingCaseRecord = useSelector(state => state.caseRecord.loadingCaseRecord);
    const loadingPatientInfor = useSelector(state => state.caseRecord.loadingPatientInfor);
    const loadingDoctorOrPharmacistInfor = useSelector(state => state.caseRecord.loadingDoctorOrPharmacistInfor);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch({type: 'caseRecordInit', payload: uuid_caseRecord});

    //     // eslint-disable-next-line
    // }, [])

    useEffect(() => {
        const q_CaseRecordInfor = $('.CaseRecordInfor');
        if (!loadingCaseRecord) {
            setTimeout(() => {
                q_CaseRecordInfor.classList.remove('CaseRecordInfor-loadingCaseRecord');
            }, 500);
        } else { 
            q_CaseRecordInfor.classList.add('CaseRecordInfor-loadingCaseRecord');
        }
    }, [loadingCaseRecord])

    useEffect(() => {
        const q_CaseRecordInfor = $('.CaseRecordInfor');
        if (!loadingPatientInfor) {
            setTimeout(() => {
                q_CaseRecordInfor.classList.remove('CaseRecordInfor-loadingPatientInfor');
            }, 600);
        } else { 
            q_CaseRecordInfor.classList.add('CaseRecordInfor-loadingPatientInfor');
        }
    }, [loadingPatientInfor])

    useEffect(() => {
        const q_CaseRecordInfor = $('.CaseRecordInfor');
        if (!loadingDoctorOrPharmacistInfor) {
            setTimeout(() => {
                q_CaseRecordInfor.classList.remove('CaseRecordInfor-loadingDoctorOrPharmacistInfor');
            }, 600);
        } else { 
            q_CaseRecordInfor.classList.add('CaseRecordInfor-loadingDoctorOrPharmacistInfor');
        }
    }, [loadingDoctorOrPharmacistInfor])

    const handleSearchDoctorOrPharmacist = () => {
        $('.CaseRecordInforSearchBox-overlay').classList.add('active');
    }

    const handlePassiveSearchDoctorOrPharmacist = () => {
        $('.CaseRecordInforPassiveSearchBox-overlay').classList.add('active');
    }

    const handleSelectAgain = () => {
        dispatch(setDoctorOrPharmacistInfor(null));
    }

    return (
        <div className="CaseRecordInfor CaseRecordInfor-loadingCaseRecord CaseRecordInfor-loadingPatientInfor CaseRecordInfor-loadingDoctorOrPharmacistInfor">
            <h2>Case-Record ( { uuid_caseRecord } )</h2>
            <div className="CaseRecordInfor-title"><strong>{ caseRecords[currentIndex]?.caseRecord?.title }</strong></div>
            <div className="CaseRecordInfor-totalInfor">
                <div>
                    <div>Cost Total</div>
                    <div>{ caseRecords[currentIndex]?.caseRecord?.priceTotal } $</div>
                </div>
                <div>
                    <div>Page Total</div>
                    <div>{ caseRecords[currentIndex]?.caseRecord?.pageTotal }</div>
                </div>
                <div>
                    <div>Status</div>
                    <div>{ caseRecords[currentIndex]?.caseRecord?.status }</div>
                </div>
            </div>
            <div className="CaseRecordInfor-patientInfor">
                <div className="CaseRecordInfor-patientInfor-header">Patient Information</div>
                <div className="CaseRecordInfor-patientInfor-content">
                    <div><strong>Name:</strong> { caseRecords[currentIndex]?.patientInfor?.name }</div>
                    <div><strong>Age:</strong> { caseRecords[currentIndex]?.patientInfor?.birthday }</div>
                    <div><strong>Sex:</strong> { caseRecords[currentIndex]?.patientInfor?.sex ? 'male' : 'fe-male' }</div>
                    <div><strong>Phone:</strong> { caseRecords[currentIndex]?.patientInfor?.phone }</div>
                    <div><strong>Address:</strong> { caseRecords[currentIndex]?.patientInfor?.address }</div>
                    <div><strong>Profile Shopm:</strong> <span onClick={() => navigate(`/profile/${caseRecords[currentIndex]?.patientInfor?.uuid_user}`)}>Profile Shopm</span></div>
                </div>
            </div>
            <div className="CaseRecordInfor-doctorPharmacistInfor">
                <div className="CaseRecordInfor-doctorPharmacistInfor-header">Doctor or Pharmacist Information</div>
                { 
                    caseRecords[currentIndex]?.doctorOrPharmacistInfor !== null ? 
                    <div className="CaseRecordInfor-doctorPharmacistInfor-content">
                        <div><strong>Name:</strong> { caseRecords[currentIndex]?.doctorOrPharmacistInfor?.name }</div>
                        <div><strong>Age:</strong> { caseRecords[currentIndex]?.doctorOrPharmacistInfor?.birthday }</div>
                        <div><strong>Sex:</strong> { caseRecords[currentIndex]?.doctorOrPharmacistInfor?.sex ? 'male' : 'fe-male' }</div>
                        <div><strong>Doctor or Pharmacist:</strong> { caseRecords[currentIndex]?.doctorOrPharmacistInfor?.type }</div>
                        <div><strong>Major:</strong> { caseRecords[currentIndex]?.doctorOrPharmacistInfor?.major }</div>
                        <div><strong>Graduated in:</strong> { caseRecords[currentIndex]?.doctorOrPharmacistInfor?.graduated }</div>
                        <div><strong>Phone:</strong> { caseRecords[currentIndex]?.doctorOrPharmacistInfor?.phone }</div>
                        <div><strong>Address:</strong> { caseRecords[currentIndex]?.doctorOrPharmacistInfor?.address }</div>
                        <div><strong>Profile Shopm:</strong> <span onClick={() => navigate(`/profile/${caseRecords[currentIndex]?.doctorOrPharmacistInfor?.uuid_user}`)}>Profile Shopm</span></div>
                        { caseRecordRole==='patient' && <div><button onClick={() => handleSelectAgain()}>Select again</button><button>Delete</button></div>}
                    </div>:
                    <div className="CaseRecordInfor-doctorPharmacistInfor-search">
                        <button onClick={() => handleSearchDoctorOrPharmacist()}>Search</button>
                        <button onClick={() => handlePassiveSearchDoctorOrPharmacist()}>Passive-Search</button>
                    </div>
                }
            </div>
            
            <CaseRecordInforSearchBox />
            <CaseRecordInforPassiveSearchBox />
        </div>
    )
}

export default CaseRecordInfor;