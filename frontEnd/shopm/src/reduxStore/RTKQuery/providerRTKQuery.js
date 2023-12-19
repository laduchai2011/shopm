import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { 
    SERVER_ADDRESS_GET_PROVIDER,
    SERVER_ADDRESS_GET_PROVIDERABOUTLIST
} from 'config/server';

// Define a service using a base URL and expected endpoints
export const providerRTKQuery = createApi({
    reducerPath: 'providerRTKQuery',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    tagTypes: ['Provider', 'ProviderAbout'],
    endpoints: (builder) => ({
        // query
        getProvider: builder.query({
            query: ({uuid_provider}) => ({
                url: `${SERVER_ADDRESS_GET_PROVIDER}?uuid_provider=${uuid_provider}`,
                credentials: "include"
            }),
            providesTags: [{type: 'ProviderAbout', bool: true}]
        }),
        getProviderAboutList: builder.query({
            query: ({uuid_provider}) => ({
                url: `${SERVER_ADDRESS_GET_PROVIDERABOUTLIST}?uuid_provider=${uuid_provider}`,
                credentials: "include"
            }),
            providesTags: [{type: 'ProviderAbout', bool: true}]
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
    useGetProviderAboutListQuery
} = providerRTKQuery;