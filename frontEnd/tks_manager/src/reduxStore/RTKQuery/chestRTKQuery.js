import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// import { 
//     SERVER_ADDRESS_READ_CHESTGROUP
// } from 'config/server';


// Define a service using a base URL and expected endpoints
export const chestRTKQuery = createApi({
    reducerPath: 'chestRTKQuery',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    tagTypes:[
        'ChestGroup'
    ],
    endpoints: (builder) => ({
        // query
        getChestGroup: builder.query({
            // query: ({uuid_chestGroup}) => ({
            //     url: `${SERVER_ADDRESS_READ_CHESTGROUP}?uuid_chestGroup=${uuid_chestGroup}`,
            //     credentials: "include"
            // }),
            // providesTags: (result, error) => {
            //     console.log(344444, result)
            // },
        }),
    }),
})

export const { 
    useGetChestGroupQuery,
    // useLazyGetChestGroupQuery
} = chestRTKQuery;