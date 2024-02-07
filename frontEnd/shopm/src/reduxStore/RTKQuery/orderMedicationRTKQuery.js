import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { 
    SERVER_ADDRESS_ORDERMEDICATION_GET_WITH_CASERECORD,
    SERVER_ADDRESS_ORDERMEDICATION_CREATE_WITH_CASERECORD,
    SERVER_ADDRESS_ORDERMEDICATION_GET_WITH_UUID,
    SERVER_ADDRESS_ORDERMEDICATION_GET_HISTORIES_WITH_FK
} from 'config/server';

/**
*@typedef {
*title: string,
*type: string,
*pageNumber: string,
*status: string,
*uuid_caseRecord: uuid,
*uuid_orderMyself: uuid,
*uuid_user: uuid
*} orderMedicationOptions
*/ 

/**
*@typedef {
*step: string,
*isCompleted: text,
*status: string,
*uuid_orderMedication: uuid
*} historyOptions
*/ 

/**
*@typedef {
*type: string,
*information: text,
*status: string,
*uuid_orderMedication: uuid
*} transportOptions
*/ 
    
/**
*@typedef {
*type: string,
*information: text,
*status: string,
*uuid_orderMedication: uuid
*} paymentMedicationOptions
*/ 

// Define a service using a base URL and expected endpoints
export const orderMedicationRTKQuery = createApi({
    reducerPath: 'orderMedicationRTKQuery',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    tagTypes:[
        'orderMedication',
        'history'
    ],
    endpoints: (builder) => ({
        // query
        getOrderMedicationWithUuid: builder.query({
            query: ({uuid_orderMedication}) => ({
                url: `${SERVER_ADDRESS_ORDERMEDICATION_GET_WITH_UUID}?uuid_orderMedication=${ uuid_orderMedication }`,
                credentials: "include"
            }),
            providesTags: [{type: 'orderMedication'}]
        }),
        getHistoriesWithFK: builder.query({
            query: ({uuid_orderMedication}) => ({
                url: `${SERVER_ADDRESS_ORDERMEDICATION_GET_HISTORIES_WITH_FK}?uuid_orderMedication=${ uuid_orderMedication }`,
                credentials: "include"
            }),
            providesTags: [{type: 'history'}]
        }),
        getOrderMedicationWithCaseRecord: builder.query({
            query: ({uuid_caseRecord, pageNumber}) => ({
                url: `${SERVER_ADDRESS_ORDERMEDICATION_GET_WITH_CASERECORD}?pageNumber=${ pageNumber }&uuid_caseRecord=${ uuid_caseRecord }`,
                credentials: "include"
            }),
            providesTags: [{type: 'orderMedication'}]
        }),

        // mutation
        createOrderMedicationWithCaseRecord: builder.mutation({
            query: ({uuid_caseRecord, pageNumber, orderMedicationOptions}) => ({
                url: `${SERVER_ADDRESS_ORDERMEDICATION_CREATE_WITH_CASERECORD}`,
                method: 'POST',
                body: { 
                    uuid_caseRecord: uuid_caseRecord,
                    pageNumber: pageNumber,
                    orderMedicationOptions: orderMedicationOptions
                },
                credentials: "include"
            }),
            invalidatesTags: (result, error, arg) => {
                if (error) {
                    console.error(error);
                } else {
                    return [{type: 'orderMedication'}]
                }
            }
        }),
    }),
})

export const { 
    useGetOrderMedicationWithUuidQuery,
    useGetHistoriesWithFKQuery,
    useGetOrderMedicationWithCaseRecordQuery,
    useCreateOrderMedicationWithCaseRecordMutation
} = orderMedicationRTKQuery;