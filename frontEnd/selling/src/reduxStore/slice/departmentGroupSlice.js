import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showDialog: false
}


export const departmentGroupSlice = createSlice({
    name: 'departmentGroupSlice',
    initialState,
    reducers: {
        setShowDialog: (state, action) => {
            state.showDialog = action.payload.showDialog;
        }
    }
})

export const { 
    setShowDialog
} = departmentGroupSlice.actions;

const departmentGroupReducer = departmentGroupSlice.reducer;

export default departmentGroupReducer;