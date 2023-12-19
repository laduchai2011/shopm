import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
    value1: 'init'
}

export const caseRecordCartSlice = createSlice({
    name: 'caseRecordCart',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

const counterReducer = counterSlice.reducer;

export default counterReducer;