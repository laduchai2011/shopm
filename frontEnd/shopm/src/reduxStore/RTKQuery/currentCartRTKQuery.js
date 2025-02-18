import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { 
    SERVER_ADDRESS_GET_CURRENTCART,
    SERVER_ADDRESS_PATCH_CURRENTCART,
    SERVER_ADDRESS_DELETE_CURRENTCART
} from 'config/server';

/**
*@typedef {
*uuid_caseRecord: string,
*pageNumber: string,
*} currentCartOptions
*/ 

// Define a service using a base URL and expected endpoints
export const currentCartRTKQuery = createApi({
    reducerPath: 'currentCartRTKQuery',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    tagTypes: ['CurrentCart'],
    endpoints: (builder) => ({
        // query
        getCurrentCart: builder.query({
            query: () => ({
                url: `${SERVER_ADDRESS_GET_CURRENTCART}`,
                credentials: "include"
            }),
            providesTags: (result, error, arg) => {
                if (error) {
                    console.error(error);
                } else {
                    if (result?.success) {
                        return [...result.map(({ id }) => ({ type: 'CurrentCart', id })), 'CurrentCart']
                    } else {
                        return ['CurrentCart']
                    }
                }
            }
        }),

        // mutation
        patchCurrentCart: builder.mutation({
            query: ({uuid_caseRecord, pageNumber}) => ({
                url: `${SERVER_ADDRESS_PATCH_CURRENTCART}`,
                method: 'PATCH',
                body: { 
                    uuid_caseRecord: uuid_caseRecord,
                    pageNumber: pageNumber
                },
                credentials: "include"
            }),
            invalidatesTags: (result, error) => {
                if (error) {
                    console.error(error);
                } else {
                    return [{type: 'CurrentCart'}];
                }
            }
        }),
        deleteCurrentCart: builder.mutation({
            query: () => ({
                url: `${SERVER_ADDRESS_DELETE_CURRENTCART}`,
                method: 'DELETE',
                credentials: "include"
            }),
            invalidatesTags: (result, error) => {
                if (error) {
                    console.error(error);
                } else {
                    return [{type: 'CurrentCart'}]
                }
            }
        })
    }),
})

export const { 
    useGetCurrentCartQuery,
    usePatchCurrentCartMutation,
    useDeleteCurrentCartMutation
} = currentCartRTKQuery;