import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { 
    SERVER_ADDRESS_GET_PROVIDER,
    SERVER_ADDRESS_GET_PROVIDERLIST,
    SERVER_ADDRESS_GET_PROVIDERABOUTLIST,
    SERVER_ADDRESS_DEL_PROVIDER
} from 'config/server';

// Define a service using a base URL and expected endpoints
export const providerRTKQuery = createApi({
    reducerPath: 'providerRTKQuery',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    tagTypes: [
        'Provider', 
        'ProviderAbout'
    ],
    endpoints: (builder) => ({
        // query
        getProvider: builder.query({
            query: ({uuid_provider}) => ({
                url: `${SERVER_ADDRESS_GET_PROVIDER}?uuid_provider=${uuid_provider}`,
                credentials: "include"
            }),
            providesTags: [{type: 'ProviderAbout'}]
        }),
        getProviderList: builder.query({
            query: () => ({
                url: `${SERVER_ADDRESS_GET_PROVIDERLIST}`,
                credentials: "include"
            }),
            providesTags: [{type: 'Provider'}]
        }),
        getProviderAboutList: builder.query({
            query: ({uuid_provider}) => ({
                url: `${SERVER_ADDRESS_GET_PROVIDERABOUTLIST}?uuid_provider=${uuid_provider}`,
                credentials: "include"
            }),
            providesTags: [{type: 'ProviderAbout'}]
        }),

        // mutation
        deleteProvider: builder.mutation({
            query: ({uuid_provider}) => ({
                url: `${SERVER_ADDRESS_DEL_PROVIDER}`,
                method: 'PATCH',
                body: { 
                    uuid_provider: uuid_provider
                },
                credentials: "include"
            }),
            invalidatesTags: (result, error, arg) => {
                if (error) {
                    console.error(error);
                } else {
                    return [{type: 'Provider'}]
                }
            }
        })
    }),
})

export const { 
    useGetProviderAboutListQuery, 
    useGetProviderListQuery,
    useDeleteProviderMutation
} = providerRTKQuery;