import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL } from 'config/server';
import { 
    SERVER_ADDRESS_CASERECORD_GET_LOCK,
    SERVER_ADDRESS_CASERECORD_CREATE_LOCK,
    SERVER_ADDRESS_CASERECORD_DELETE_LOCK,
    SERVER_ADDRESS_CASERECORD_SAVE_PRESCRIPTION,
    SERVER_ADDRESS_CASERECORD_ADD_MEDICATION,
    SERVER_ADDRESS_CASERECORD_EDIT_MEDICATION,
    SERVER_ADDRESS_CASERECORD_DELETE_MEDICATION
 } from 'config/server';

/**
*@typedef {
*title: string,
*priceTotal: integer,
*pageTotal: integer,
*report: text,
*status: string,
*uuid_doctorOrPharmacist: uuid,
*uuid_user: uuid
*} caseRecordOptions
*/ 

/**
*@typedef {
*pageNumber: string,
*description: text,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordDescriptionOptions
*/

/**
*@typedef {
*pageNumber: string,
*images: text,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordImageOptions
*/  

/**
*@typedef {
*pageNumber: string,
*videos: text,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordVideoOptions
*/  

/**
*@typedef {
*pageNumber: string,
*prescription: text,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordPrescriptionOptions
*/  

/**
*@typedef {
*pageNumber: string,
*name: string,
*amount: INTEGER.UNSIGNED,
*note: text,
*price: INTEGER.UNSIGNED,
*discount: FLOAT,
*cost: INTEGER.UNSIGNED,
*status: string,
*uuid_caseRecord: uuid,
*uuid_medication: uuid
*} caseRecordMedicationOptions
*/  

/**
*@typedef {
*caseRecord: caseRecord,
*caseRecordRole: string, doctorOrPharmacist or patient
*isLock: boolean,
*pageNumber: string
*} caseRecordLockOptions
*/

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.NODE_PORT;

let baseURL_caseRecord_get;
// let baseURL_caseRecord_upload;

if (NODE_ENV === 'development') {
    baseURL_caseRecord_get = `${baseURL}:7300/api/svGetCaseRecord`;
    // baseURL_caseRecord_upload = `${baseURL}:7200/api/svUploadCaseRecord`;
} else {
    baseURL_caseRecord_get = `${baseURL}:${PORT}/api/svGetCaseRecord`;
    // baseURL_caseRecord_upload = `${baseURL}:${PORT}/api/svUploadCaseRecord`;
}

// Define a service using a base URL and expected endpoints
export const caseRecordRTKQuery = createApi({
    reducerPath: 'caseRecordRTKQuery',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    tagTypes:[
        'CaseRecord',
        'CaseRecordDoctorOrPharmacistLock',
        'CaseRecordDescription',
        'CaseRecordImage',
        'CaseRecordVideo',
        'CaseRecordPrescription',
        'CaseRecordMedicationsAll'
    ],
    endpoints: (builder) => ({
        // query
        getCaseRecord: builder.query({
            query: ({uuid_caseRecord}) => ({
                url: `${baseURL_caseRecord_get}/getCaseRecord?uuid_caseRecord=${uuid_caseRecord}`,
                credentials: "include"
            }),
            providesTags: [{type: 'CaseRecord'}]
        }),
        getCaseRecordDescription: builder.query({
            query: ({uuid_caseRecord, pageNumber}) => ({
                url: `${baseURL_caseRecord_get}/getCaseRecordDescription?uuid_caseRecord=${uuid_caseRecord}&pageNumber=${pageNumber}`,
                credentials: "include",
            }),
            providesTags: [{type: 'CaseRecordDescription'}]
        }),
        getCaseRecordImage: builder.query({
            query: ({uuid_caseRecord, pageNumber}) => ({
                url: `${baseURL_caseRecord_get}/getCaseRecordImage?uuid_caseRecord=${uuid_caseRecord}&pageNumber=${pageNumber}`,
                credentials: "include"
            }),
            providesTags: [{type: 'CaseRecordImage'}]
        }),
        getCaseRecordVideo: builder.query({
            query: ({uuid_caseRecord, pageNumber}) => `${baseURL_caseRecord_get}/getCaseRecordVideo?uuid_caseRecord=${uuid_caseRecord}&pageNumber=${pageNumber}`,
            credentials: "include",
            providesTags: [{type: 'CaseRecordVideo'}]
        }),
        getCaseRecordPrescription: builder.query({
            query: ({uuid_caseRecord, pageNumber}) => ({
                url: `${baseURL_caseRecord_get}/getCaseRecordPrescription?uuid_caseRecord=${uuid_caseRecord}&pageNumber=${pageNumber}`,
                credentials: "include"
            }),
            providesTags: [{type: 'CaseRecordPrescription'}]
        }),
        getCaseRecordMedicationsAll: builder.query({
            query: ({uuid_caseRecord, pageNumber}) => ({
                url: `${baseURL_caseRecord_get}/getCaseRecordMedicationsAll?uuid_caseRecord=${uuid_caseRecord}&pageNumber=${pageNumber}`,
                credentials: "include"
            }),
            providesTags: [{type: 'CaseRecordMedicationsAll'}]
        }),

        getCaseRecordLock: builder.query({
            query: ({uuid_caseRecord}) => ({
                url: `${SERVER_ADDRESS_CASERECORD_GET_LOCK}?uuid_caseRecord=${uuid_caseRecord}`,
                credentials: "include"
            }),
            providesTags: [{type: 'CaseRecordLock'}]
        }),

        // mutation
        patchCaseRecordPrescription: builder.mutation({
            query: ({caseRecord, uuid_caseRecordPrescription, prescription, pageNumber}) => ({
                url: `${SERVER_ADDRESS_CASERECORD_SAVE_PRESCRIPTION}`,
                method: 'PATCH',
                body: { 
                    caseRecord: caseRecord,
                    uuid_caseRecordPrescription: uuid_caseRecordPrescription,
                    prescription: prescription,
                    pageNumber: pageNumber 
                },
                credentials: "include"
            }),
            invalidatesTags: (result, error, arg) => {
                if (error) {
                    console.error(error);
                } else {
                    return [{type: 'CaseRecordPrescription'}]
                }
            }
        }),
        addCaseRecordMedications: builder.mutation({
            query: ({caseRecord, caseRecordMedicationOptions, pageNumber}) => ({
                url: `${SERVER_ADDRESS_CASERECORD_ADD_MEDICATION}`,
                method: 'POST',
                body: { 
                    caseRecord: caseRecord,
                    caseRecordMedicationOptions: caseRecordMedicationOptions,
                    pageNumber: pageNumber
                },
                credentials: "include"
            }),
            invalidatesTags: (result, error, arg) => {
                if (error) {
                    console.error(error);
                } else {
                    return [{type: 'CaseRecordMedicationsAll'}]
                }
            }
        }),
        editCaseRecordMedications: builder.mutation({
            query: ({caseRecord, uuid_caseRecordMedication, amount, note, cost, pageNumber}) => ({
                url: `${SERVER_ADDRESS_CASERECORD_EDIT_MEDICATION}`,
                method: 'PATCH',
                body: { 
                    caseRecord: caseRecord,
                    uuid_caseRecordMedication: uuid_caseRecordMedication, 
                    amount: amount,
                    note: note,
                    cost: cost, 
                    pageNumber: pageNumber
                },
                credentials: "include"
            }),
            invalidatesTags: (result, error, arg) => {
                if (error) {
                    console.error(error);
                } else {
                    return [{type: 'CaseRecordMedicationsAll'}]
                }
            }
        }),
        deleteCaseRecordMedication: builder.mutation({
            query: ({caseRecord, uuid_caseRecordMedication, pageNumber}) => ({
                url: `${SERVER_ADDRESS_CASERECORD_DELETE_MEDICATION}`,
                method: 'DELETE',
                body: { 
                    caseRecord: caseRecord,
                    uuid_caseRecordMedication: uuid_caseRecordMedication,
                    pageNumber: pageNumber
                },
                credentials: "include"
            }),
            invalidatesTags: (result, error, arg) => {
                if (error) {
                    console.error(error);
                } else {
                    return [{type: 'CaseRecordMedicationsAll'}]
                }
            }
        }),

        postCaseRecordLock: builder.mutation({
            query: ({caseRecord, pageNumber}) => ({
                url: `${SERVER_ADDRESS_CASERECORD_CREATE_LOCK}`,
                method: 'POST',
                body: { 
                    caseRecord: caseRecord,
                    pageNumber: pageNumber
                },
                credentials: "include"
            }),
            invalidatesTags: (result, error, arg) => {
                if (error) {
                    console.error(error);
                } else {
                    return [{type: 'CaseRecordLock'}]
                }
            }
        }),
        deleteCaseRecordLock: builder.mutation({
            query: ({caseRecord, pageNumber}) => ({
                url: `${SERVER_ADDRESS_CASERECORD_DELETE_LOCK}`,
                method: 'DELETE',
                body: { 
                    caseRecord: caseRecord,
                    pageNumber: pageNumber
                },
                credentials: "include"
            }),
            invalidatesTags: (result, error, arg) => {
                if (error) {
                    console.error(error);
                } else {
                    return [{type: 'CaseRecordLock'}]
                }
            }
        })
    }),
})

export const { 
    useGetCaseRecordQuery,
    useGetCaseRecordLockQuery,
    useLazyGetCaseRecordQuery,
    useGetCaseRecordDescriptionQuery,
    useGetCaseRecordImageQuery,
    useGetCaseRecordVideoQuery,
    useGetCaseRecordPrescriptionQuery,
    useGetCaseRecordMedicationsAllQuery,
    usePostCaseRecordLockMutation,
    usePatchCaseRecordPrescriptionMutation,
    useAddCaseRecordMedicationsMutation,
    useEditCaseRecordMedicationsMutation,
    useDeleteCaseRecordMedicationMutation,
    useDeleteCaseRecordLockMutation
} = caseRecordRTKQuery;