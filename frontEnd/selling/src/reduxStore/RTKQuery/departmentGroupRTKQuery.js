import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SERVER_ADDRESS_READALL_WITH_FK_DEPARTMENTGROUP } from 'config/server';

export const departmentGroupRTKQuery = createApi({
    reducerPath: 'departmentGroupRTKQuery',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    tagTypes:[
        'DepartmentGroup'
    ],
    endpoints: (builder) => ({
        readAllDepartmentGroup: builder.query({
            query: ({uuid_provider}) => ({
                url: `${SERVER_ADDRESS_READALL_WITH_FK_DEPARTMENTGROUP}?uuid_provider=${uuid_provider}`,
                credentials: "include"
            }),
            providesTags: (result, error) => [{ type: 'DepartmentGroup', id: result?.departmentGroup?.id }]
        }),
    }),
})

export const { 
    useReadAllDepartmentGroupQuery
} = departmentGroupRTKQuery;