import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
*@typedef {
*title: string,
*priceTotal: integer,
*pageTotal: integer,
*report: text,
*status: string,
*uuid_doctorOrPharmacist: uuid,
*uuid_user: uuid
*} caseRecordOptions
*/ 

const initialState = {
    fetching: false,
    caseRecords: [],    // array of caseRecordOptions
    error: null,
    pageIndex: 1,
    pageSize: 5,
    emptyDB: false, 
    // init: false  // use in development
}

export const fetchBulkReadCaseRecord = createAsyncThunk(
    'profileCaseRecord/fetchBulkRead',
    async (serverAddress, thunkAPI) => {    
        try {
            const getState = thunkAPI.getState().profileCaseRecord;
            const res = await axios({
                method: 'get',
                url: `${serverAddress}?pageIndex=${getState.pageIndex}&pageSize=${getState.pageSize}`,
                withCredentials: true,
                signal: thunkAPI.signal
            })

            const resData = res.data;
        
            if (resData.success) {
                const list_caseRecord = resData.caseRecords.rows;
                for (let i = 0; i < list_caseRecord.length; i++) {
                    list_caseRecord[i].load = true;
                }
                // console.log(getState.caseRecords)
                return {
                    count: resData.caseRecords.count,
                    data: list_caseRecord,
                    pageIndexNext: getState.pageIndex + 1
                };
            } else {
                return thunkAPI.rejectWithValue(resData.message); 
            }
           
        } catch (error) {
            return thunkAPI.rejectWithValue(error);  
        }
    }
)

export const profileCaseRecordSlice = createSlice({
    name: 'profileCaseRecord',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBulkReadCaseRecord.pending, (state, action) => {
            state.fetching = true;
            if (state.pageIndex === 1) {
                state.caseRecords = [1,2,3,4,5];
            } else {
                state.caseRecords.push(1);
            }
            // console.log('pending', action)
        })
        builder.addCase(fetchBulkReadCaseRecord.rejected, (state, action) => {
            state.error = action.payload;
            state.fetching = false;
        })
        builder.addCase(fetchBulkReadCaseRecord.fulfilled, (state, action) => {
            // console.log('fulfilled', action.payload)

            const data = action.payload.data;
            // if (process.env.NODE_ENV === 'development') {
            //     // console.log('development');

            //     if (state.pageIndex === 1) {
            //         state.caseRecords = data;
            //     } else {
            //         state.caseRecords.pop();
            //         state.caseRecords = state.caseRecords.concat(data);
            //     }

            //     if (state.pageIndex*state.pageSize < action.payload.count) {
            //         state.emptyDB = false;
            //     } else {
            //         state.emptyDB = true;
            //     }

            //     state.fetching = false;
            //     if (!state.init) {
            //         state.pageIndex = 1;
            //         state.init = true;
            //     } else {
            //         state.pageIndex = action.payload.pageIndexNext;
            //     }
            // } else {
            //     // console.log('product');

            //     if (state.pageIndex === 1) {
            //         state.caseRecords = data;
            //     } else {
            //         state.caseRecords.pop();
            //         state.caseRecords = state.caseRecords.concat(data);
            //     }
    
            //     if (state.pageIndex*state.pageSize < action.payload.count) {
            //         state.emptyDB = false;
            //     } else {
            //         state.emptyDB = true;
            //     }
    
            //     state.fetching = false;
            //     state.pageIndex = action.payload.pageIndexNext;
            // }
           
            
            if (state.pageIndex === 1) {
                state.caseRecords = data;
            } else {
                state.caseRecords.pop();
                state.caseRecords = state.caseRecords.concat(data);
            }

            if (state.pageIndex*state.pageSize < action.payload.count) {
                state.emptyDB = false;
            } else {
                state.emptyDB = true;
            }

            state.fetching = false;
            state.pageIndex = action.payload.pageIndexNext;
        })
    }
})

const profileCaseRecordReducer = profileCaseRecordSlice.reducer;

export default profileCaseRecordReducer;