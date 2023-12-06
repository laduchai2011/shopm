import React, { useEffect, useContext } from "react";
import './styles.css';

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { ThemeContextApp } from "utilize/ContextApp";

import { $ } from "utilize/Tricks";
import CaseRecordInforSearchBox from "./components/CaseRecordInforSearchBox";
import CaseRecordInforPassiveSearchBox from "./components/CaseRecordInforPassiveSearchBox";

import { useCreateNotificationMutation } from 'reduxStore/RTKQuery/notificationRTKQuery';
import { useGetSickPersonFromCaseRecordQuery } from "reduxStore/RTKQuery/userRTKQuery";
import { 
    useGetDoctorOrPharmacistFromCaseRecordQuery
} from "reduxStore/RTKQuery/doctorOrPharmacistRTKQuery";

import { SERVER_ADDRESS_PATCH_CASERECORD_SENDREQUIRETODOCTORPHARMACIST } from 'config/server';

const CaseRecordInfor = ({ caseRecord, caseRecordRole }) => {
    const { id: uuid_caseRecord } = useParams();
    const navigate = useNavigate();
    const { loginInfor } = useContext(ThemeContextApp);

    const [createNotification] = useCreateNotificationMutation();

    const {
        data: data_sickPerson, 
        isFetching: isFetching_sickPerson, 
        isError: isError_sickPerson, 
        error: error_sickPerson
    } = useGetSickPersonFromCaseRecordQuery({uuid_sickPerson: caseRecord.uuid_user});

    useEffect(() => {
        isError_sickPerson && console.log(error_sickPerson);
    }, [isError_sickPerson, error_sickPerson])

    const {
        data: data_doctorOrPharmacist, 
        isFetching: isFetching_doctorOrPharmacist, 
        isError: isError_doctorOrPharmacist, 
        error: error_doctorOrPharmacist
    } = useGetDoctorOrPharmacistFromCaseRecordQuery({uuid_doctorOrPharmacist: caseRecord.uuid_doctorOrPharmacist});

    useEffect(() => {
        isError_doctorOrPharmacist && console.log(error_doctorOrPharmacist);
    }, [isError_doctorOrPharmacist, error_doctorOrPharmacist])

    useEffect(() => {
        console.log('data_doctorOrPharmacist', data_doctorOrPharmacist?.doctorOrPharmacist)
    }, [data_doctorOrPharmacist?.doctorOrPharmacist])

    useEffect(() => {
        const q_CaseRecordInfor = $('.CaseRecordInfor');
        if (!isFetching_sickPerson) {
            setTimeout(() => {
                q_CaseRecordInfor.classList.remove('CaseRecordInfor-loadingPatientInfor');
            }, 600);
        } else { 
            q_CaseRecordInfor.classList.add('CaseRecordInfor-loadingPatientInfor');
        }
    }, [isFetching_sickPerson])

    useEffect(() => {
        const q_CaseRecordInfor = $('.CaseRecordInfor');
        if (!isFetching_doctorOrPharmacist) {
            setTimeout(() => {
                q_CaseRecordInfor.classList.remove('CaseRecordInfor-loadingDoctorOrPharmacistInfor');
            }, 600);
        } else { 
            q_CaseRecordInfor.classList.add('CaseRecordInfor-loadingDoctorOrPharmacistInfor');
        }
    }, [isFetching_doctorOrPharmacist])

    const handleSearchDoctorOrPharmacist = () => {
        $('.CaseRecordInforSearchBox-overlay').classList.add('active');
    }

    const handlePassiveSearchDoctorOrPharmacist = () => {
        $('.CaseRecordInforPassiveSearchBox-overlay').classList.add('active');
    }

    const handleSelectAgain = () => {
        $('.CaseRecordInforSearchBox-overlay').classList.add('active');
    }

    const handlDeteteDoctorOrPharmacist = () => {
        const notification = {
            title: 'huy yeu cau kham benh',
            type: 'destroyRequireExamine',
            uuid_userSent: loginInfor?.uuid
        }

        axios({
            method: 'patch',
            url: `${SERVER_ADDRESS_PATCH_CASERECORD_SENDREQUIRETODOCTORPHARMACIST}`, 
            withCredentials: true,
            data: {
                uuid_caseRecord: uuid_caseRecord,
                uuid_doctorOrPharmacist: null
            }
        }).then((res) => {
            const resData = res.data;
            if (resData.success) {
                createNotification({
                    type: 'normal',
                    notification: JSON.stringify(notification),
                    status: 'sent',
                    uuid_user: data_doctorOrPharmacist?.doctorOrPharmacist?.uuid_user
                })
            } else {
                console.log(resData.message);
            }
        }).catch(err => console.error(err)).finally(() => window.location.reload())
    }

    return (
        <div className="CaseRecordInfor CaseRecordInfor-loadingPatientInfor CaseRecordInfor-loadingDoctorOrPharmacistInfor">
            <h2>Case-Record ( { uuid_caseRecord } )</h2>
            <div className="CaseRecordInfor-title"><strong>{ caseRecord.title }</strong></div>
            <div className="CaseRecordInfor-totalInfor">
                <div>
                    <div>Cost Total</div>
                    <div>{ caseRecord.priceTotal } $</div>
                </div>
                <div>
                    <div>Page Total</div>
                    <div>{ caseRecord.pageTotal }</div>
                </div>
                <div>
                    <div>Status</div>
                    <div>{ caseRecord.status }</div>
                </div>
            </div>
            <div className="CaseRecordInfor-patientInfor">
                <div className="CaseRecordInfor-patientInfor-header">Patient Information</div>
                <div className="CaseRecordInfor-patientInfor-content">
                    <div><strong>Name:</strong> { data_sickPerson?.sickPerson?.name }</div>
                    <div><strong>Age:</strong> { data_sickPerson?.sickPerson?.birthday }</div>
                    <div><strong>Sex:</strong> { data_sickPerson?.sickPerson?.sex ? 'male' : 'fe-male' }</div>
                    <div><strong>Phone:</strong> { data_sickPerson?.sickPerson?.phone }</div>
                    <div><strong>Address:</strong> { data_sickPerson?.sickPerson?.address }</div>
                    <div><strong>Profile Shopm:</strong> <span onClick={() => navigate(`/profile/${data_sickPerson?.sickPerson?.uuid_user}`)}>Profile Shopm</span></div>
                </div>
            </div>
            <div className="CaseRecordInfor-doctorPharmacistInfor">
                <div className="CaseRecordInfor-doctorPharmacistInfor-header">Doctor or Pharmacist Information</div>
                { 
                    // caseRecord?.uuid_doctorOrPharmacist !== null ? 
                    data_doctorOrPharmacist && data_doctorOrPharmacist?.doctorOrPharmacist !==null ? 
                    <div className="CaseRecordInfor-doctorPharmacistInfor-content">
                        <div><strong>Name:</strong> { data_doctorOrPharmacist?.doctorOrPharmacist?.name }</div>
                        <div><strong>Age:</strong> { data_doctorOrPharmacist?.doctorOrPharmacist?.birthday }</div>
                        <div><strong>Sex:</strong> { data_doctorOrPharmacist?.doctorOrPharmacist?.sex ? 'male' : 'fe-male' }</div>
                        <div><strong>Doctor or Pharmacist:</strong> { data_doctorOrPharmacist?.doctorOrPharmacist?.type }</div>
                        <div><strong>Major:</strong> { data_doctorOrPharmacist?.doctorOrPharmacist?.major }</div>
                        <div><strong>Graduated in:</strong> { data_doctorOrPharmacist?.doctorOrPharmacist?.graduated }</div>
                        <div><strong>Phone:</strong> { data_doctorOrPharmacist?.doctorOrPharmacist?.phone }</div>
                        <div><strong>Address:</strong> { data_doctorOrPharmacist?.doctorOrPharmacist?.address }</div>
                        <div><strong>Profile Shopm:</strong> <span onClick={() => navigate(`/profile/${data_doctorOrPharmacist?.doctorOrPharmacist?.uuid_user}`)}>Profile Shopm</span></div>
                        { caseRecordRole==='patient' && <div><button onClick={() => handleSelectAgain()}>Select again</button><button onClick={() => handlDeteteDoctorOrPharmacist()}>Delete</button></div>}
                    </div>: <>{
                        !isFetching_doctorOrPharmacist ? 
                        <div className="CaseRecordInfor-doctorPharmacistInfor-search">
                            <button onClick={() => handleSearchDoctorOrPharmacist()}>Search</button>
                            <button onClick={() => handlePassiveSearchDoctorOrPharmacist()}>Passive-Search</button>
                        </div>:<div></div>
                    }</>
                }
            </div>
            
            <CaseRecordInforSearchBox />
            <CaseRecordInforPassiveSearchBox />
        </div>
    )
}

export default CaseRecordInfor;