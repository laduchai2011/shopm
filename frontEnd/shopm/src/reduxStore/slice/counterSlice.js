import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
    value1: 'init'
}

export const fetchUserById = createAsyncThunk(
    'users/fetchByIdStatus',
    async (userId, thunkAPI) => {
        console.log('userid', userId)
        console.log('thunkAPI', thunkAPI)
        const promise = new Promise((resolve, reject) => {
            let i = 0;
            let interval = setInterval(() => {
                if (i === 20) {
                    try {
                        clearInterval(interval);
                        resolve(`interval finish ${userId}`);
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    console.log('promise')
                    i++;
                }
            }, 1000)
        })
        const res = await promise;

        return `fetchUserById ------ ${res}`  // return paload
    }
)

export const counterSlice = createSlice({
    name: 'counter',
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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserById.fulfilled, (state, action) => {
            // Add user to the state array
            console.log('extraReducers', action, state)
            state.value1 = action.payload;
        })
    }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

const counterReducer = counterSlice.reducer;

export default counterReducer;