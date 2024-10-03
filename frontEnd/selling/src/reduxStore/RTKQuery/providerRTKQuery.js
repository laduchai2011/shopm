import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { 
    SERVER_ADDRESS_GET_PROVIDERLIST,
    // SERVER_ADDRESS_GET_PROVIDER
} from 'config/server';

export const providerRTKQuery = createApi({
    reducerPath: 'providerRTKQuery',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    tagTypes:[
        'Provider'
    ],
    endpoints: (builder) => ({
        getProviderList: builder.query({
            query: () => ({
                url: `${SERVER_ADDRESS_GET_PROVIDERLIST}`,
                credentials: "include"
            }),
            providesTags: (result, error, arg) => {
                if (result?.success) {
                    return [...result?.providers.map(({ id }) => ({ type: 'Provider', id })), 'Provider'];
                } else {
                    return ['Provider'];
                }
            }
        }),
        getProvider: builder.query({
            query: ({uuid_provider}) => ({
                url: `${SERVER_ADDRESS_GET_PROVIDERLIST}?uuid_provider=${uuid_provider}`,
                credentials: "include"
            }),
            providesTags: (result, error, arg) => {
                if (result?.success) {
                    return [...result?.providers.map(({ id }) => ({ type: 'Provider', id })), 'Provider'];
                } else {
                    return ['Provider'];
                }
            }
        }),
    }),
})

export const { 
    useGetProviderListQuery,
    useGetProviderQuery
} = providerRTKQuery;