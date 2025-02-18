import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { 
    SERVER_ADDRESS_ORDERMEDICATION_GET_WITH_CASERECORD,
    SERVER_ADDRESS_ORDERMEDICATION_CREATE_WITH_CASERECORD,
    SERVER_ADDRESS_ORDERMEDICATION_GET_WITH_UUID,
    SERVER_ADDRESS_ORDERMEDICATION_GET_HISTORIES_WITH_FK,
    SERVER_ADDRESS_ORDERMEDICATION_GETLIST_FROM_PROFILE,
    SERVER_ADDRESS_ORDERMEDICATION_GET_TRANSPORT_WITH_FK,
    SERVER_ADDRESS_ORDERMEDICATION_GET_PAYMENTMEDICATION_WITH_FK,
    SERVER_ADDRESS_ORDERMEDICATION
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
*cost: int,
*status: string,
*uuid_orderMedication: uuid
*} transportOptions
*/ 
    
/**
*@typedef {
*type: string,
*information: text,
*cost: int,
*status: string,
*uuid_orderMedication: uuid
*} paymentMedicationOptions
*/ 

/**
*@typedef {
*uuid_medication: uuid,
*sold: int
*} soldMedicationList
*/ 

// Define a service using a base URL and expected endpoints
export const orderMedicationRTKQuery = createApi({
    reducerPath: 'orderMedicationRTKQuery',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    tagTypes:[
        'orderMedications',
        'orderMedication',
        'history',
        'transport',
        'paymentMedication'
    ],
    endpoints: (builder) => ({
        // query
        get_OrderGroup_In_CurrentSelected: builder.query({
            query: () => ({
                url: `${SERVER_ADDRESS_ORDERMEDICATION.Get_OrderGroup_In_CurrentSelected}`,
                credentials: "include"
            }),
            // providesTags: [{type: 'orderMedications'}]
        }),
        getOrderMedicationsFromProfile: builder.query({
            query: ({uuid_user, pageIndex, pageSize}) => ({
                url: `${SERVER_ADDRESS_ORDERMEDICATION_GETLIST_FROM_PROFILE}?uuid_user=${ uuid_user }&pageIndex=${ pageIndex }&pageSize=${ pageSize }`,
                credentials: "include"
            }),
            providesTags: [{type: 'orderMedications'}]
        }),
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
        getTransportWithFK: builder.query({
            query: ({uuid_orderMedication}) => ({
                url: `${SERVER_ADDRESS_ORDERMEDICATION_GET_TRANSPORT_WITH_FK}?uuid_orderMedication=${ uuid_orderMedication }`,
                credentials: "include"
            }),
            providesTags: [{type: 'transport'}]
        }),
        getPaymentMedicationWithFK: builder.query({
            query: ({uuid_orderMedication}) => ({
                url: `${SERVER_ADDRESS_ORDERMEDICATION_GET_PAYMENTMEDICATION_WITH_FK}?uuid_orderMedication=${ uuid_orderMedication }`,
                credentials: "include"
            }),
            providesTags: [{type: 'paymentMedication'}]
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
            query: ({uuid_caseRecord, pageNumber, orderMedicationOptions, soldMedicationList}) => ({
                url: `${SERVER_ADDRESS_ORDERMEDICATION_CREATE_WITH_CASERECORD}`,
                method: 'POST',
                body: { 
                    uuid_caseRecord: uuid_caseRecord,
                    pageNumber: pageNumber,
                    orderMedicationOptions: orderMedicationOptions,
                    soldMedicationList: soldMedicationList
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
    useGet_OrderGroup_In_CurrentSelectedQuery,
    useLazyGetOrderMedicationsFromProfileQuery,
    useGetOrderMedicationWithUuidQuery,
    useGetHistoriesWithFKQuery,
    useGetTransportWithFKQuery,
    useGetOrderMedicationWithCaseRecordQuery,
    useGetPaymentMedicationWithFKQuery,
    useCreateOrderMedicationWithCaseRecordMutation
} = orderMedicationRTKQuery;