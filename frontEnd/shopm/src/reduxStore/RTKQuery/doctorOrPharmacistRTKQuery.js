import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


import { baseURL } from 'config/server';

const baseURL_doctorOrPharmacist = `${baseURL}:7100/api/svGetUserInfor/doctorOrPharmacist`;

export const doctorOrPharmacistRTKQuery = createApi({
    reducerPath: 'doctorOrPharmacistRTKQuery',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL_doctorOrPharmacist }),
    endpoints: (builder) => ({
        getDoctorOrPharmacistSearchById: builder.query({
            query: (id) => ({ 
                url: `/getfromCaseRecord/search?uuid_doctorOrPharmacist=${id}`,
                credentials: "include"
            }),
        }),
    }),
})

export const { useGetDoctorOrPharmacistSearchByIdQuery } = doctorOrPharmacistRTKQuery;