import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { SERVER_ADDRESS_GETLIST_CASERECORD } from 'config/server';

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
    async (uuid_user, thunkAPI) => {    
        try {
            const getState = thunkAPI.getState().profileCaseRecord;
            const res = await axios({
                method: 'get',
                url: `${SERVER_ADDRESS_GETLIST_CASERECORD}?pageIndex=${getState.pageIndex}&pageSize=${getState.pageSize}&uuid_user=${uuid_user}`,
                withCredentials: true,
                signal: thunkAPI.signal
            })

            const resData = res.data;

            if (resData.success) {
                const list_caseRecord = resData.caseRecords.rows;
                for (let i = 0; i < list_caseRecord.length; i++) {
                    list_caseRecord[i].load = true;
                }

                let pageIndex = getState.pageIndex;
                let pageSize = getState.pageSize;
                const count = resData.caseRecords.count;
                if (pageIndex*pageSize < count) {
                    pageIndex = pageIndex + 1;
                }

                return {
                    count: count,
                    data: list_caseRecord,
                    pageIndexNext: pageIndex
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
            const data = action.payload.data;      
            
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