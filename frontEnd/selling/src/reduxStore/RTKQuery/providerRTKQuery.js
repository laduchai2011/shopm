import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { 
    SERVER_ADDRESS_GET_PROVIDERLIST
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
    }),
})

export const { 
    useGetProviderListQuery
} = providerRTKQuery;