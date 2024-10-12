import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SERVER_ADDRESS_DEPARTMENT } from 'config/server';

export const departmentRTKQuery = createApi({
    reducerPath: 'departmentRTKQuery',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    tagTypes:[
        'Department'
    ],
    endpoints: (builder) => ({
        createDepartment: builder.mutation({
            query: ({uuid_provider, departmentOptions}) => ({
                url: `${SERVER_ADDRESS_DEPARTMENT.CREATE}`,
                method: 'POST',
                body: { 
                    uuid_provider: uuid_provider,
                    departmentOptions: departmentOptions
                },
                credentials: "include"
            }),
            invalidatesTags: (result, error, arg) => {
                if (error) {
                    console.error(error);
                } else {
                    return [{ type: 'Department', id: result?.department?.id }]
                }
            }
        })
    }),
})

export const { 
   useCreateDepartmentMutation
} = departmentRTKQuery;