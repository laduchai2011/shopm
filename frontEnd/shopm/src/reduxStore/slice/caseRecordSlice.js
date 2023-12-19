import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    current_caseRecordMedication: null, 
    index: 0
}

export const caseRecordSlice = createSlice({
    name: 'caseRecord',
    initialState: initialState,
    reducers: {
        setCurrent_caseRecordMedication: (state, action) => {
            state.current_caseRecordMedication = action.payload.caseRecordMedication;
            state.index = action.payload.index;
        },
    }
})

export const { 
    setCurrent_caseRecordMedication
} = caseRecordSlice.actions;

const caseRecordReducer = caseRecordSlice.reducer;

export default caseRecordReducer;