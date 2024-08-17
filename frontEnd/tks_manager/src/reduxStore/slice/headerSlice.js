import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    overlayStatus: false,
    menuStatus: 'off',
    providerStatus: 'off'
}


export const headerSlice = createSlice({
    name: 'headerSlice',
    initialState,
    reducers: {
        setMenuStatus: (state, action) => {
            state.menuStatus = action.payload.menuStatus;
            state.overlayStatus = action.payload.overlayStatus;
        },
        setProviderStatus: (state, action) => {
            state.providerStatus = action.payload.providerStatus;
            state.overlayStatus = action.payload.overlayStatus;
        },
    }
})

export const { 
    setMenuStatus,
    setProviderStatus 
} = headerSlice.actions;

const headerReducer = headerSlice.reducer;

export default headerReducer;