import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// import { SERVER_ADDRESS_PATCH_CASERECORD_SENDREQUIRETODOCTORPHARMACIST } from 'config/server';
import { baseURL } from 'config/server';

const baseURL_doctorOrPharmacist = `${baseURL}:7100/api/svGetUserInfor/doctorOrPharmacist`;

export const doctorOrPharmacistRTKQuery = createApi({
    reducerPath: 'doctorOrPharmacistRTKQuery',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    tagTypes:['DoctorOrPharmacistFromCaseRecord'],
    endpoints: (builder) => ({
        getDoctorOrPharmacistSearchById: builder.query({
            query: (id) => ({ 
                url: `${baseURL_doctorOrPharmacist}/getfromCaseRecord/search?uuid_doctorOrPharmacist=${id}`,
                credentials: "include"
            }),
            providesTags: ['DoctorOrPharmacistFromCaseRecord']
        }),
        getDoctorOrPharmacistFromCaseRecord: builder.query({
            query: ({uuid_doctorOrPharmacist}) => ({ 
                url: `${baseURL_doctorOrPharmacist}/getfromCaseRecord?uuid_doctorOrPharmacist=${uuid_doctorOrPharmacist}`,
                credentials: "include"
            }),
            providesTags: ['DoctorOrPharmacistFromCaseRecord']
        }),

        // patchDoctorOrPharmacistFromCaseRecord: builder.mutation({
        //     query: ({uuid_caseRecord, uuid_doctorOrPharmacist}) => ({
        //         url: `${SERVER_ADDRESS_PATCH_CASERECORD_SENDREQUIRETODOCTORPHARMACIST}`,
        //         method: 'PATCH',
        //         body: { 
        //             uuid_caseRecord: uuid_caseRecord,
        //             uuid_doctorOrPharmacist: uuid_doctorOrPharmacist 
        //         },
        //         credentials: "include"
        //     }),
        //     // invalidatesTags: (result, error, arg) => {
        //     //     if (error) {
        //     //         console.error(error);
        //     //     } else {
        //     //         console.log(result)
        //     //         return [{type: 'DoctorOrPharmacistFromCaseRecord', bool: true}]
        //     //     }
        //     // }
        //     invalidatesTags: ['DoctorOrPharmacistFromCaseRecord']
        // })
    }),
})

export const { 
    useGetDoctorOrPharmacistSearchByIdQuery,
    useGetDoctorOrPharmacistFromCaseRecordQuery,
} = doctorOrPharmacistRTKQuery;