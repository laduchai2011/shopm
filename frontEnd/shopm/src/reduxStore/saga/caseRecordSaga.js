import { put, takeLatest, delay, select, call } from 'redux-saga/effects';

import { 
    setCaseRecordCurrent, 
    setCaseRecordError, 
    setCaseRecordNewData, 
    setPatientInforCurrent,
    setDoctorOrPharmacistCurrent,
    setLoadingCaseRecord,
    setLoadingPatientInfor,
    setLoadingDoctorOrPharmacistInfor 
} from 'reduxStore/slice/caseRecordSlice';

import axios from 'axios';

import { 
    SERVER_ADDRESS_GET_CASERECORD, 
    SERVER_ADDRESS_GET_SICKPERSON_FROM_CASERECORD,
    SERVER_ADDRESS_GET_DOCTORORPHARMACIST_FROM_CASERECORD 
} from 'config/server';

// const caseRecord = {
//     uuid_caseRecord: null,
//     patientInfor: null,
//     doctorOrPharmacistInfor: {},
//     caseRecord: {},
//     caseRecordPages: []    // array of caseRecordPageOptions
// } 

const caseRecordCreator = (uuid_caseRecord, caseRecord) => {
    return {
        uuid_caseRecord: uuid_caseRecord,
        patientInfor: null,
        doctorOrPharmacistInfor: null,
        caseRecord: caseRecord,
        caseRecordPages: []    // array of caseRecordPageOptions
    } 
}

// fetch data
function* fetchReadPatientInfor(uuid_sickPerSon) {
    try {
        yield put({type: setLoadingPatientInfor.type, payload: true});
        const res = yield call(() => {
            return axios({
                method: 'get',
                url: `${SERVER_ADDRESS_GET_SICKPERSON_FROM_CASERECORD}?uuid_user=${uuid_sickPerSon}`,
                withCredentials: true
            })
        })
        const resData = res.data;
        if (resData.success) {
            yield put({type: setPatientInforCurrent.type, payload: resData.sickPerson})
        } else {
            yield put({type: setCaseRecordError.type, payload: resData.data});
        }
        yield put({type: setLoadingPatientInfor.type, payload: false});
    } catch (error) {
        yield put({type: setCaseRecordError.type, payload: error});
        yield put({type: setLoadingPatientInfor.type, payload: false});
    }
}

function* fetchReadDoctorOrPharmacistInfor(uuid_doctorOrPharmacist) {
    try {
        yield put({type: setLoadingDoctorOrPharmacistInfor.type, payload: true});
        const res = yield call(() => {
            return axios({
                method: 'get',
                url: `${SERVER_ADDRESS_GET_DOCTORORPHARMACIST_FROM_CASERECORD}?uuid_user=${uuid_doctorOrPharmacist}`,
                withCredentials: true
            })
        })
        const resData = res.data;
        if (resData.success) {
            yield put({type: setDoctorOrPharmacistCurrent.type, payload: resData.doctorOrPharmacist})
        } else {
            yield put({type: setCaseRecordError.type, payload: resData.data});
        }
        yield put({type: setLoadingDoctorOrPharmacistInfor.type, payload: false});
    } catch (error) {
        yield put({type: setCaseRecordError.type, payload: error});
        yield put({type: setLoadingDoctorOrPharmacistInfor.type, payload: false});
    }
}

function* fetchReadCaseRecord(current_uuid_caseRecord) {
    try {
        yield put({type: setLoadingCaseRecord.type, payload: true})
        const res = yield call(() => {
            return axios({
                method: 'get',
                url: `${SERVER_ADDRESS_GET_CASERECORD}?uuid_caseRecord=${current_uuid_caseRecord}`,
                withCredentials: true
            })
        })
        const resData = res.data;
        if (resData.success) {
            yield put({type: setCaseRecordNewData.type, payload: caseRecordCreator(current_uuid_caseRecord, resData.caseRecord)})
        } else {
            yield put({type: setCaseRecordError.type, payload: resData.data});
        }
        yield put({type: setLoadingCaseRecord.type, payload: false});
    } catch (error) {
        yield put({type: setCaseRecordError.type, payload: error});
        yield put({type: setLoadingCaseRecord.type, payload: false});
    }
}

function* caseRecordInit(action) {
    yield delay(500);

    // set uuid_caseReocrd is current to begin get or load data on view
    yield put({type: setCaseRecordCurrent.type, payload: action.payload});

    const current_uuid_caseRecord = yield select(state => state.caseRecord.current_uuid_caseRecord);
    const currentIndex = yield select(state => state.caseRecord.currentIndex);

    // in case-record case, there are not store in redux, begin fetch data from database 
    if (currentIndex===null) {
        yield call(fetchReadCaseRecord, current_uuid_caseRecord);
    }

    // get or update current sick-person information
    const uuid_sickPerSon = yield select(state => {
        const currentIndex = state.caseRecord.currentIndex;
        const uuid_sickPerSon = state.caseRecord.caseRecords[currentIndex].caseRecord.uuid_user;
        const sickPrson = state.caseRecord.caseRecords[currentIndex].patientInfor;
        if (sickPrson===null) {
            return uuid_sickPerSon;
        } else {
            return null;
        }
    });
    if (uuid_sickPerSon!==null) {
        yield call(fetchReadPatientInfor, uuid_sickPerSon);
    }

    // get or update current DoctorOrPharmacist information
    const uuid_doctorOrPharmacist = yield select(state => {
        const currentIndex = state.caseRecord.currentIndex;
        const uuid_doctorOrPharmacist = state.caseRecord.caseRecords[currentIndex].caseRecord.uuid_doctorOrPharmacist;
        const doctorOrPharmacist = state.caseRecord.caseRecords[currentIndex].doctorOrPharmacistInfor;
        if (doctorOrPharmacist===null && uuid_doctorOrPharmacist!==null) {
            return uuid_doctorOrPharmacist;
        } else {
            return null;
        }
    });
    if (uuid_doctorOrPharmacist!==null) {
        yield call(fetchReadDoctorOrPharmacistInfor, uuid_doctorOrPharmacist);
    }
}

function* caseRecordSage() {
    yield takeLatest('caseRecordInit', caseRecordInit);
}


export default caseRecordSage;