import { put, takeLatest, delay, select, call } from 'redux-saga/effects';

import { setCaseRecordCurrent, setCaseRecordError, setCaseRecordNewData } from 'reduxStore/slice/caseRecordSlice';

import axios from 'axios';

import { SERVER_ADDRESS_GET_CASERECORD } from 'config/server';

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
function* fetchReadPatientInfor() {
    console.log('fetchReadPatientInfor')
    yield
}
function* fetchReadCaseRecord(current_uuid_caseRecord) {
    const res = yield call(() => {
        return axios({
            method: 'get',
            url: `${SERVER_ADDRESS_GET_CASERECORD}?uuid_caseRecord=${current_uuid_caseRecord}`,
            withCredentials: true
        })
    })
    const resData = res.data;
    if (resData.success) {
        yield put({type: setCaseRecordNewData.type, payload: caseRecordCreator(current_uuid_caseRecord, resData.data)})
    } else {
        yield put({type: setCaseRecordError.type, payload: resData.data});
    }
}

function* caseRecordNew(current_uuid_caseRecord) {
    try {
        yield call(fetchReadCaseRecord, current_uuid_caseRecord);
    } catch (error) {
        yield put({type: setCaseRecordError.type, payload: error});
    }
}

function* init(action) {
    yield delay(500);

    yield put({type: setCaseRecordCurrent.type, payload: action.payload});

    const current_uuid_caseRecord = yield select(state => state.caseRecord.current_uuid_caseRecord);
    const currentIndex = yield select(state => state.caseRecord.currentIndex);

    if (currentIndex===null) {
        yield call(caseRecordNew, current_uuid_caseRecord);
    }
}

function* caseRecordSage() {
    yield takeLatest('caseRecordInit', init)
}


export default caseRecordSage;