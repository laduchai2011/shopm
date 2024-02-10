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
    current_caseRecordImage: null,
    current_pageNumber: null,
    caseRecord_orderMedication: {
        caseRecord: null,
        pageNumber: null,
        soldMedicatedList: []   // medicaation: { uuid_medication, sold }
    },
    caseRecordToastMessageOptions: {
        currentPage: null,
        completed: null,
        completedPrescription: null,
        completedOrCompletedPrescription: null,
        doctorOrPharmacistRequirePrescriptionAgain: null,
        locked: null,
        orderMedication: null,
        outOfMedication: null,
        type: null
    }
}

export const caseRecordSlice = createSlice({
    name: 'caseRecord',
    initialState: initialState,
    reducers: {
        setCurrent_caseRecordMedication: (state, action) => {
            state.current_caseRecordMedication = action.payload.caseRecordMedication;
            state.index = action.payload.index;
        },
        setCurrent_caseRecordImage: (state, action) => {
            state.current_caseRecordImage = action.payload.caseRecordImage;
        },
        setCurrent_pageNumber: (state, action) => {
            state.current_pageNumber = action.payload.current_pageNumber;
        },
        setCaseRecord_orderMedication: (state, action) => {
            state.caseRecord_orderMedication = action.payload;
        },

        setIsCurrentPage: (state, action) => {
            state.caseRecordToastMessageOptions.currentPage = action.payload;
            state.caseRecordToastMessageOptions.type = action.payload.checkedType;
        },
        setIsCompleted: (state, action) => {
            state.caseRecordToastMessageOptions.completed = action.payload;
            state.caseRecordToastMessageOptions.type = action.payload.checkedType;
        },
        setIsCompletedPrescription: (state, action) => {
            state.caseRecordToastMessageOptions.completedPrescription = action.payload;
            state.caseRecordToastMessageOptions.type = action.payload.checkedType;
        },
        setIsCompletedOrIsCompletedPrescription: (state, action) => {
            state.caseRecordToastMessageOptions.completedPrescription = action.payload;
            state.caseRecordToastMessageOptions.type = action.payload.checkedType;
        },
        setIsLocked: (state, action) => {
            state.caseRecordToastMessageOptions.locked = action.payload;
            state.caseRecordToastMessageOptions.type = action.payload.checkedType;
        },
        setIsOrderMedicationWithCaseRecord: (state, action) => {
            state.caseRecordToastMessageOptions.orderMedication = action.payload;
            state.caseRecordToastMessageOptions.type = action.payload.checkedType;
        },
        setIsOutOfMedication: (state, action) => {
            state.caseRecordToastMessageOptions.outOfMedication = action.payload;
            state.caseRecordToastMessageOptions.type = action.payload.checkedType;
        },
        setCaseRecordToastMessageType: (state, action) => {
            state.caseRecordToastMessageOptions.type = action.payload;
        },
    }
})

export const { 
    setCurrent_caseRecordMedication,
    setCurrent_caseRecordImage,
    setCurrent_pageNumber,
    setCaseRecord_orderMedication,
    setIsCurrentPage,
    setIsCompleted,
    setIsCompletedPrescription,
    setIsCompletedOrIsCompletedPrescription,
    setIsLocked,
    setIsOrderMedicationWithCaseRecord,
    setIsOutOfMedication,
    setCaseRecordToastMessageType
} = caseRecordSlice.actions;

const caseRecordReducer = caseRecordSlice.reducer;

export default caseRecordReducer;