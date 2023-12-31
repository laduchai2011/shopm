import { createSlice } from '@reduxjs/toolkit';

/**
*@typedef {
*caseRecord: caseRecord,
*caseRecordRole: string, doctorOrPharmacist or patient
*isLock: boolean,
*pageNumber: string
*} caseRecordLockOptions
*/ 

const initialState = {
    current_caseRecordMedication: null, 
    index: 0, 
    caseRecordLockOptions: null
}

export const caseRecordSlice = createSlice({
    name: 'caseRecord',
    initialState: initialState,
    reducers: {
        setCurrent_caseRecordMedication: (state, action) => {
            state.current_caseRecordMedication = action.payload.caseRecordMedication;
            state.index = action.payload.index;
        },
        setCaseRecordLockRd: (state, action) => {
            state.caseRecordLockOptions = action.payload.caseRecordLockOptions;
        },
    }
})

export const { 
    setCurrent_caseRecordMedication,
    setCaseRecordLockRd
} = caseRecordSlice.actions;

const caseRecordReducer = caseRecordSlice.reducer;

export default caseRecordReducer;