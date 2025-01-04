import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SERVER_ADDRESS_CHEST } from 'config/server';

export const chestRTKQuery = createApi({
    reducerPath: 'chestRTKQuery',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    tagTypes:[
        'Chest'
    ],
    endpoints: (builder) => ({
        getChestList: builder.query({
            query: ({uuid_provider, pageIndex, pageSize}) => ({
                url: `${SERVER_ADDRESS_CHEST.GET_CHEST_LIST}?uuid_provider=${uuid_provider}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
                credentials: "include"
            }),
            providesTags: (result, error) => [{ type: 'Chest', id: result?.chestList?.id }]
        }),
    }),
})

export const { 
    useGetChestListQuery
} = chestRTKQuery;