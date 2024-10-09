import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showDialog: false
}


export const departmentCreateSlice = createSlice({
    name: 'departmentCreateSlice',
    initialState,
    reducers: {
        setShowDialog: (state, action) => {
            state.showDialog = action.payload.showDialog;
        }
    }
})

export const { 
    setShowDialog
} = departmentCreateSlice.actions;

const departmentCreateReducer = departmentCreateSlice.reducer;

export default departmentCreateReducer;