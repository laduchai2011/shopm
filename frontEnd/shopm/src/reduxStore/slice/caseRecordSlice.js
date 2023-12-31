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
    caseRecordLockOptions: null,
    current_caseRecordImage: null
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
        setCurrent_caseRecordImage: (state, action) => {
            state.current_caseRecordImage = action.payload.caseRecordImage;
        }
    }
})

export const { 
    setCurrent_caseRecordMedication,
    setCaseRecordLockRd,
    setCurrent_caseRecordImage
} = caseRecordSlice.actions;

const caseRecordReducer = caseRecordSlice.reducer;

export default caseRecordReducer;