import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { 
    SERVER_ADDRESS_READALL_LOG
} from 'config/server';


// Define a service using a base URL and expected endpoints
export const logRTKQuery = createApi({
    reducerPath: 'logRTKQuery',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    tagTypes:[
        'Log'
    ],
    endpoints: (builder) => ({
        // query
        getLogList: builder.query({
            query: ({pageIndex, pageSize}) => ({
                url: `${SERVER_ADDRESS_READALL_LOG}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
                credentials: "include"
            }),
            providesTags: (result, error) => [{ type: 'Log'}]
        }),
    }),
})

export const { 
    useGetLogListQuery
} = logRTKQuery;