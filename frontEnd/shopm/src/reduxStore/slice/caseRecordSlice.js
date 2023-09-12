import { createSlice } from '@reduxjs/toolkit';

/**
*@typedef {
*title: string,
*priceTotal: integer,
*pageTotal: integer,
*report: text,
*status: string,
*uuid_doctorOrPharmacist: uuid,
*uuid_user: uuid
*} caseRecordOptions
*/ 

/**
*@typedef {
*dataPage: text,
*priceTotal: integer,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordPageOptions
*/ 

/**
*@typedef {
*priceTotal: integer,
*status: string,
*description: {
*   note: string,
*   images: [],
*   videos: []
*},
*prescription: {
*   note: text,
*   medicationList: []    
*}
*} dataPage
*/ 

/**
*@typedef {
*uuid_caseRecord: '',
*patientInfor: {},
*doctorOrPharmacistInfor: {},
*caseRecord: {},
*caseRecordPages: [],    // array of caseRecordPageOptions
*pageSize: 1,
*pageIndex: 1
*} caseRecord
*/ 

// const caseRecord = {
//     uuid_caseRecord: null,
//     patientInfor: null,
//     doctorOrPharmacistInfor: {},
//     caseRecord: {},
//     caseRecordPages: []    // array of caseRecordPageOptions,
//     pageSize: 1,
//     pageIndex: 1,
//     emptyDb: false
// }  

const initialState = {
    loadingCaseRecord: false,
    loadingPatientInfor: false,
    loadingDoctorOrPharmacistInfor: false,
    current_uuid_caseRecord: null,
    caseRecords: [],
    currentIndex: null,
    error: null
}

export const caseRecordSlice = createSlice({
    name: 'caseRecord',
    initialState: initialState,
    reducers: {
        setCaseRecordCurrent: (state, action) => {
            state.current_uuid_caseRecord = action.payload;
            state.currentIndex = null;
            const caseRecords = state.caseRecords;
            for (let i = 0; i < caseRecords.length; i++) {
                if (caseRecords[i].uuid_caseRecord === action.payload) {
                    state.currentIndex = i;
                }
            }
        },
        setCaseRecordError: (state, action) => {
            state.error = action.payload;
        },
        setCaseRecordNewData: (state, action) => {
            state.caseRecords.push(action.payload);
            state.currentIndex = state.caseRecords.length - 1;
        },

        // set user
        setPatientInforCurrent: (state, action) => {
            state.caseRecords[state.currentIndex].patientInfor = action.payload;
        },
        setDoctorOrPharmacistCurrent: (state, action) => {
            state.caseRecords[state.currentIndex].doctorOrPharmacistInfor = action.payload;
        },

        // set loading
        setLoadingCaseRecord: (state, action) => {
            state.loadingCaseRecord = action.payload;
        },
        setLoadingPatientInfor: (state, action) => {
            state.loadingPatientInfor = action.payload;
        },
        setLoadingDoctorOrPharmacistInfor: (state, action) => {
            state.loadingDoctorOrPharmacistInfor = action.payload;
        },

        ////////////
        setPageIndex: (state, action) => {
            state.caseRecords[state.currentIndex].pageIndex = action.payload;
        },
        setEmptyDb: (state, action) => {
            state.caseRecords[state.currentIndex].emptyDb = action.payload;
        },

        // set push case-record page
        pushCaseRecordPage: (state, action) => {
            const old_caseRecordPages = state.caseRecords[state.currentIndex].caseRecordPages;
            state.caseRecords[state.currentIndex].caseRecordPages = old_caseRecordPages.concat(action.payload);
        }
    }
})

export const { 
    setCaseRecordCurrent, 
    setCaseRecordError, 
    setCaseRecordNewData, 
    setPatientInforCurrent,
    setDoctorOrPharmacistCurrent,
    setLoadingCaseRecord,
    setLoadingPatientInfor,
    setLoadingDoctorOrPharmacistInfor,
    setPageIndex,
    setEmptyDb,
    pushCaseRecordPage 
} = caseRecordSlice.actions;

const caseRecordReducer = caseRecordSlice.reducer;

export default caseRecordReducer;