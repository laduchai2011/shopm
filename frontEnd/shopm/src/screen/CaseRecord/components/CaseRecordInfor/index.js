import React, { useEffect } from "react";
import './styles.css';

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

// import { SERVER_ADDRESS_GET_CASERECORD, SERVER_ADDRESS_GET_SICKPERSON_FROM_CASERECORD } from "config/server";
// import { setCaseRecordCurrent, fetchReadCaseRecord, fetchReadPatientInfor } from "reduxStore/slice/caseRecordSlice";

const CaseRecordInfor = () => {
    const { id: uuid_caseRecord } = useParams();

    const currentIndex = useSelector(state => state.caseRecord.currentIndex);
    const caseRecords = useSelector(state => state.caseRecord.caseRecords);
    const caseRecord = useSelector(state => state.caseRecord);
    // const current_uuid_caseRecord = useSelector(state => state.caseRecord.current_uuid_caseRecord);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'caseRecordInit', payload: uuid_caseRecord});
        // dispatch(setCaseRecordCurrent(uuid_caseRecord));
        // let promise_fetchReadCaseRecord;
        // if (currentIndex===null) {
        //     promise_fetchReadCaseRecord = dispatch(fetchReadCaseRecord(SERVER_ADDRESS_GET_CASERECORD));
        // }

        return () => {
            // if (currentIndex===null) {
            //     promise_fetchReadCaseRecord.abort();
            // }
            // promise_init.abort();
        }

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        // console.log('caseRecord', caseRecord)
    }, [caseRecord])

    useEffect(() => {
        // let promise_fetchReadPatientInfor;
        // if (caseRecords[currentIndex].patientInfor===null) {
        //     console.log('asdfasf', currentIndex)
        //     promise_fetchReadPatientInfor = dispatch(fetchReadPatientInfor(SERVER_ADDRESS_GET_SICKPERSON_FROM_CASERECORD));
        // }

        // return () => {
        //     if (currentIndex!==null) {
        //         promise_fetchReadPatientInfor.abort();
        //     }
        // }
        // eslint-disable-next-line
    }, [caseRecords.length])

    const handleSaga = () => {
        dispatch({type: 'testSaga', payload: 'laduchai saga'})
    }

    return (
        <div className="CaseRecordInfor">
            <button onClick={() => handleSaga()}>test saga</button>
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
                    <div><strong>Name:</strong> La Duc Hai</div>
                    <div><strong>Age:</strong> 28</div>
                    <div><strong>Sex:</strong> male</div>
                    <div><strong>Phone:</strong> 0789860854</div>
                    <div><strong>Address:</strong> Ho Seu, Hoang Hoa Tham, Chi Linh, Hai Duong, Viet Nam</div>
                    <div><strong>Profile Shopm:</strong> <a href="asfasf">Profile Shopm</a></div>
                </div>
            </div>
            <div className="CaseRecordInfor-doctorPharmacistInfor">
                <div className="CaseRecordInfor-doctorPharmacistInfor-header">Doctor or Pharmacist Information</div>
                <div className="CaseRecordInfor-doctorPharmacistInfor-content">
                    <div><strong>Name:</strong> La Duc Hai</div>
                    <div><strong>Age:</strong> 28</div>
                    <div><strong>Sex:</strong> male</div>
                    <div><strong>Doctor or Pharmacist:</strong> Doctor</div>
                    <div><strong>Major:</strong> tooth</div>
                    <div><strong>Graduated in:</strong> Ha Noi medical University</div>
                    <div><strong>Phone:</strong> 0789860854</div>
                    <div><strong>Address:</strong> Ho Seu, Hoang Hoa Tham, Chi Linh, Hai Duong, Viet Nam</div>
                    <div><strong>Profile Shopm:</strong> <a href="asfasf">Profile Shopm</a></div>
                </div>
            </div>
        </div>
    )
}

export default CaseRecordInfor;