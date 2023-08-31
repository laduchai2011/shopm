import { createSlice } from '@reduxjs/toolkit';

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

/**
*@typedef {
*dataPage: text,
*priceTotal: integer,
*uuid_caseRecord: uuid
*} caseRecordPageOptions
*/ 

/**
*@typedef {
*page: integer
*priceTotal: integer,
*description: {
*   note: string,
*   images: [],
*   videos: []
*},
*Prescription: {
*   note: text,
*   medicationList: []    
*}
*} dataPage
*/ 

/**
*@typedef {
*uuid_caseRecord: '',
*patientInfor: {},
*doctorOrPharmacistInfor: {},
*caseRecord: {},
*caseRecordPages: []    // array of caseRecordPageOptions
*} caseRecord
*/ 

// const caseRecord = {
//     uuid_caseRecord: null,
//     patientInfor: null,
//     doctorOrPharmacistInfor: {},
//     caseRecord: {},
//     caseRecordPages: []    // array of caseRecordPageOptions
// } 

const initialState = {
    loadingCaseRecord: false,
    loadingPatientInfor: false,
    loadingDoctorOrPharmacistInfor: false,
    current_uuid_caseRecord: null,
    caseRecords: [],
    currentIndex: null,
    error: null
}

// export const fetchReadCaseRecord = createAsyncThunk(
//     'caseRecord/fetchRead',
//     async (serverAddress, thunkAPI) => {
//         try {
//             const getState = thunkAPI.getState().caseRecord;
//             const res = await axios({
//                 method: 'get',
//                 url: `${serverAddress}?uuid_caseRecord=${getState.current_uuid_caseRecord}`,
//                 withCredentials: true,
//                 signal: thunkAPI.signal
//             })
//             const resData = res.data;
//             if (resData.success) {
//                 return {
//                     caseRecord: resData.caseRecord
//                 };
//             } else {
//                 return thunkAPI.rejectWithValue(resData); 
//             }
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error);  
//         }
//     }
// )

// export const fetchReadPatientInfor = createAsyncThunk(
//     'caseRecord/patientInfor/fetchRead',
//     async (serverAddress, thunkAPI) => {
//         try {
//             const getState = thunkAPI.getState().caseRecord;  
//             const res = await axios({
//                 method: 'get',
//                 url: `${serverAddress}?uuid_user=${getState.caseRecords[getState.currentIndex].caseRecord.uuid_user}`,
//                 withCredentials: true,
//                 signal: thunkAPI.signal
//             })
//             const resData = res.data;
//             console.log(resData)
//             if (resData.success) {
//                 return {
//                     caseRecord: resData.caseRecord
//                 };
//             } else {
//                 return thunkAPI.rejectWithValue(resData); 
//             }
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error);  
//         }
//     }
// )

// export const fetchReadCaseRecordPage = createAsyncThunk(
//     'caseRecordPage/fetchBulkRead',
//     async (serverAddress, thunkAPI) => {
//         try {
//             // const getState = thunkAPI.getState().caseRecord;
//             // const res = await axios({
//             //     method: 'get',
//             //     url: `${serverAddress}?pageIndex=${getState.pageIndex}&pageSize=${getState.pageSize}`,
//             //     withCredentials: true,
//             //     signal: thunkAPI.signal
//             // })

//             // const resData = res.data;

//             // console.log('caseRecordPage', resData);
        
//             // if (resData.success) {
//             //     const list_caseRecord = resData.caseRecords.rows;
//             //     for (let i = 0; i < list_caseRecord.length; i++) {
//             //         list_caseRecord[i].load = true;
//             //     }
//             //     // console.log(getState.caseRecords)
//             //     return {
//             //         count: resData.caseRecords.count,
//             //         data: list_caseRecord,
//             //         pageIndexNext: getState.pageIndex + 1
//             //     };
//             // } else {
//             //     return thunkAPI.rejectWithValue(resData.message); 
//             // }
           
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error);  
//         }
//     }
// )

export const caseRecordSlice = createSlice({
    name: 'caseRecord',
    initialState: initialState,
    reducers: {
        setCaseRecordCurrent: (state, action) => {
            state.current_uuid_caseRecord = action.payload;
            state.currentIndex = null;
            const caseRecords = state.caseRecords;
            for (let i = 0; i < caseRecords.length; i++) {
                if (caseRecords.uuid_caseRecord === action.payload) {
                    state.currentIndex = i;
                }
            }
        },
        setCaseRecordError: (state, action) => {
            state.error = action.payload;
        },
        setCaseRecordNewData: (state, action) => {
            state.caseRecords.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        // // caseRecord
        // builder.addCase(fetchReadCaseRecord.pending, (state, action) => {
        //     // console.log('fetchReadCaseRecord.pending', state, action);
        //     state.loadingCaseRecord = true;
        // })
        // builder.addCase(fetchReadCaseRecord.rejected, (state, action) => {
        //     // console.log('fetchReadCaseRecord.rejected', state, action);
        //     state.error = action.payload;
        //     state.loadingCaseRecord = false;
        // })
        // builder.addCase(fetchReadCaseRecord.fulfilled, (state, action) => {
        //     // console.log('fetchReadCaseRecord.fulfilled', state, action);
        //     const caseRecords = state.caseRecords;
        //     if (state.currentIndex===null) {
        //         state.currentIndex = 0;
        //     } else {
        //         state.currentIndex = caseRecords.length - 1;
        //     }
        //     caseRecords[state.currentIndex] = caseRecord;
        //     caseRecords[state.currentIndex].uuid_caseRecord = action.payload.caseRecord.uuid_caseRecord;
        //     caseRecords[state.currentIndex].caseRecord = action.payload.caseRecord;
            
        //     state.loadingCaseRecord = false;
        // })

        // // patientInfor
        // builder.addCase(fetchReadPatientInfor.pending, (state, action) => {
        //     console.log('fetchReadCaseRecordPage.pending', state, action)
        // })
        // builder.addCase(fetchReadPatientInfor.rejected, (state, action) => {
        //     console.log('fetchReadCaseRecordPage.rejected', state, action)
        // })
        // builder.addCase(fetchReadPatientInfor.fulfilled, (state, action) => {
        //     console.log('fetchReadCaseRecordPage.fulfilled', state, action)
        // })

        // // caseRecordPage
        // builder.addCase(fetchReadCaseRecordPage.pending, (state, action) => {
        //     console.log('fetchReadCaseRecordPage.pending', state, action)
        // })
        // builder.addCase(fetchReadCaseRecordPage.rejected, (state, action) => {
        //     console.log('fetchReadCaseRecordPage.rejected', state, action)
        // })
        // builder.addCase(fetchReadCaseRecordPage.fulfilled, (state, action) => {
        //     console.log('fetchReadCaseRecordPage.fulfilled', state, action)
        // })
    }
})

export const { setCaseRecordCurrent, setCaseRecordError, setCaseRecordNewData } = caseRecordSlice.actions;

const caseRecordReducer = caseRecordSlice.reducer;

export default caseRecordReducer;