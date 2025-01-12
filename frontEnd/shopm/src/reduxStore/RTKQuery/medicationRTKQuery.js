import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { 
    SERVER_ADDRESS_GET_MEDICATION,
    SERVER_ADDRESS_GET_MEDICATION_LIST,
    SERVER_ADDRESS_GET_MEDICATION_HOME,
    SERVER_ADDRESS_GET_MEDICATIONIMAGE_LIST
} from 'config/server';

// Define a service using a base URL and expected endpoints
export const medicationRTKQuery = createApi({
    reducerPath: 'medicationRTKQuery',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    tagTypes: [
        'Medication',
        'MedicationImage',
        'MedicationFromHome'
    ],
    endpoints: (builder) => ({
        // query
        getMedication: builder.query({
            query: ({uuid_medication}) => ({
                url: `${SERVER_ADDRESS_GET_MEDICATION}/${uuid_medication}`,
                credentials: "include"
            }),
            providesTags: [{type: 'Medication'}]
        }),

        getMedicationList: builder.query({
            query: ({uuid_provider, pageIndex, pageSize}) => ({
                url: `${SERVER_ADDRESS_GET_MEDICATION_LIST}?uuid_provider=${uuid_provider}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
                credentials: "include"
            }),
            providesTags: (result, error, arg) =>
                result?.success
                    ? [...result?.medications.rows.map(({ id }) => ({ type: 'Medication', id })), 'Medication']
                    : ['Medication'],
        }),
        getMedicationImageList: builder.query({
            query: ({uuid_medication}) => ({
                url: `${SERVER_ADDRESS_GET_MEDICATIONIMAGE_LIST}?uuid_medication=${uuid_medication}`,
                credentials: "include"
            }),
            providesTags: (result, error, arg) => {
                if (result?.success) {
                    return [...result?.medicationImages.map(({ id }) => ({ type: 'Medication', id })), 'Medication'];
                } else {
                    return ['Medication'];
                }
            }      
        }),
        getMedicationListFromHome: builder.query({
            query: ({pageIndex, pageSize}) => ({
                url: `${SERVER_ADDRESS_GET_MEDICATION_HOME}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
                credentials: "include"
            }),
            providesTags: (result, error, arg) => 
                result?.success
                    ? [...result?.medications.rows.map(({ id }) => ({ type: 'MedicationFromHome', id })), 'MedicationFromHome']
                    : ['MedicationFromHome'],
        }),

        // // mutation
        // patchCurrentCart: builder.mutation({
        //     query: ({uuid_caseRecord, pageNumber}) => ({
        //         url: `${SERVER_ADDRESS_PATCH_CURRENTCART}`,
        //         method: 'PATCH',
        //         body: { 
        //             uuid_caseRecord: uuid_caseRecord,
        //             pageNumber: pageNumber
        //         },
        //         credentials: "include"
        //     }),
        //     invalidatesTags: (result, error, arg) => {
        //         if (error) {
        //             console.error(error);
        //         } else {
        //             return [{type: 'CurrentCart', bool: result?.success ? true : false}]
        //         }
        //     }
        // }),
        // deleteCurrentCart: builder.mutation({
        //     query: () => ({
        //         url: `${SERVER_ADDRESS_DELETE_CURRENTCART}`,
        //         method: 'DELETE',
        //         credentials: "include"
        //     }),
        //     invalidatesTags: (result, error) => {
        //         if (error) {
        //             console.error(error);
        //         } else {
        //             return [{type: 'CurrentCart', bool: result?.success ? true : false}]
        //         }
        //     }
        // })
    }),
})

export const { 
    useGetMedicationQuery,
    useLazyGetMedicationQuery,
    useLazyGetMedicationListQuery,
    useGetMedicationImageListQuery,
    useLazyGetMedicationListFromHomeQuery
} = medicationRTKQuery;