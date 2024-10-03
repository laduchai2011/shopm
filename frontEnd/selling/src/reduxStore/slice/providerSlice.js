import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedProvider: null
}


export const providerSlice = createSlice({
    name: 'providerSlice',
    initialState,
    reducers: {
        setSelectedProvider: (state, action) => {
            state.selectedProvider = action.payload.selectedProvider;
        }
    }
})

export const { 
    setSelectedProvider
} = providerSlice.actions;

const providerReducer = providerSlice.reducer;

export default providerReducer;