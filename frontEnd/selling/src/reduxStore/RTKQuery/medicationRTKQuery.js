import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SERVER_ADDRESS_SR_CREATEDEPARTMENT_READALL_MEDICATION_WITH_FK } from 'config/server';

export const medicationRTKQuery = createApi({
    reducerPath: 'medicationRTKQuery',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    tagTypes:['Medication'],
    endpoints: (builder) => ({
        srCreateDepartmentReadAllMedication: builder.query({
            query: ({uuid_provider}) => ({
                url: `${SERVER_ADDRESS_SR_CREATEDEPARTMENT_READALL_MEDICATION_WITH_FK}?uuid_provider=${uuid_provider}`,
                credentials: "include"
            }),
            providesTags: (result, error) => [{ type: 'Medication', id: result?.departmentGroup?.id }]
        }),
    }),
})

export const { 
    useSrCreateDepartmentReadAllMedicationQuery
} = medicationRTKQuery;