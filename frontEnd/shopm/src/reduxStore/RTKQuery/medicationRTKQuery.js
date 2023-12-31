import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { 
    SERVER_ADDRESS_GET_MEDICATION
} from 'config/server';

// Define a service using a base URL and expected endpoints
export const medicationRTKQuery = createApi({
    reducerPath: 'medicationRTKQuery',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    tagTypes: ['Medication'],
    endpoints: (builder) => ({
        // query
        getMedication: builder.query({
            query: ({uuid_medication}) => ({
                url: `${SERVER_ADDRESS_GET_MEDICATION}/${uuid_medication}`,
                credentials: "include"
            }),
            providesTags: [{type: 'Medication', bool: true}]
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
    useLazyGetMedicationQuery
} = medicationRTKQuery;