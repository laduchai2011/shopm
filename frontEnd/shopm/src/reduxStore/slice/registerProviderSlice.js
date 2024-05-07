import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    toastMessage: {
        type: 'error',
        message: 'message',
        show: false
    }
}

export const registerProviderSlice = createSlice({
    name: 'registerProvider',
    initialState,
    reducers: {
        setToastMessageRT: (state, action) => {
            state.toastMessage.type = action.payload.type;
            state.toastMessage.message = action.payload.message;
            state.toastMessage.show = action.payload.show;
        },
    }
})

export const { 
    setToastMessageRT
} = registerProviderSlice.actions;

const registerProviderReducer = registerProviderSlice.reducer;

export default registerProviderReducer;