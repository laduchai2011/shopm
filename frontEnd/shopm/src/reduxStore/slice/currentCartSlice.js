import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
    value1: 'init'
}

export const currentCartSlice = createSlice({
    name: 'currentCart',
    initialState,
    reducers: {
        
    },
})

export const { } = currentCartSlice.actions;

const currentCartReducer = currentCartSlice.reducer;

export default currentCartReducer;