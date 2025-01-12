import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SERVER_ADDRESS_DEPARTMENT } from 'config/server';


// Define a service using a base URL and expected endpoints
export const departmentRTKQuery = createApi({
    reducerPath: 'departmentRTKQuery',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    tagTypes: ['Department'],
    endpoints: (builder) => ({
        // query
        medicationScreen_getList_departments: builder.query({
            query: ({uuid_medication, pageIndex, pageSize}) => ({
                url: `${SERVER_ADDRESS_DEPARTMENT.GET_FROM_MEDICATION}?uuid_medication=${uuid_medication}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
                credentials: "include"
            }),
            providesTags: (result, error, arg) =>
                result?.success
                    ? [...result?.departmentList.rows.map(({ id }) => ({ type: 'Department', id })), 'Department']
                    : ['Department'],
        }),
        
    }),
})

export const { 
    useMedicationScreen_getList_departmentsQuery
} = departmentRTKQuery;