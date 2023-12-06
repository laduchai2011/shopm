import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL } from 'config/server';

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
*cost: INTEGER.UNSIGNED,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordMedicationOptions
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
        'CaseRecordDescription',
        'CaseRecordImage',
        'CaseRecordVideo',
        'CaseRecordPrescription',
        'CaseRecordMedicationsAll'
    ],
    endpoints: (builder) => ({
        getCaseRecord: builder.query({
            query: ({uuid_caseRecord}) => ({
                url: `${baseURL_caseRecord_get}/getCaseRecord?uuid_caseRecord=${uuid_caseRecord}`,
                credentials: "include"
            }),
            providesTags: [{type: 'CaseRecord', bool: true}]
        }),
        getCaseRecordDescription: builder.query({
            query: ({uuid_caseRecord, pageNumber}) => ({
                url: `${baseURL_caseRecord_get}/getCaseRecordDescription?uuid_caseRecord=${uuid_caseRecord}&pageNumber=${pageNumber}`,
                credentials: "include",
            }),
            providesTags: [{type: 'CaseRecordDescription', bool: true}]
        }),
        getCaseRecordImage: builder.query({
            query: ({uuid_caseRecord, pageNumber}) => ({
                url: `${baseURL_caseRecord_get}/getCaseRecordImage?uuid_caseRecord=${uuid_caseRecord}&pageNumber=${pageNumber}`,
                credentials: "include"
            }),
            providesTags: [{type: 'CaseRecordImage', bool: true}]
        }),
        getCaseRecordVideo: builder.query({
            query: ({uuid_caseRecord, pageNumber}) => `${baseURL_caseRecord_get}/getCaseRecordVideo?uuid_caseRecord=${uuid_caseRecord}&pageNumber=${pageNumber}`,
            credentials: "include",
            providesTags: [{type: 'CaseRecordVideo', bool: true}]
        }),
        getCaseRecordPrescription: builder.query({
            query: ({uuid_caseRecord, pageNumber}) => ({
                url: `${baseURL_caseRecord_get}/getCaseRecordPrescription?uuid_caseRecord=${uuid_caseRecord}&pageNumber=${pageNumber}`,
                credentials: "include"
            }),
            providesTags: [{type: 'CaseRecordPrescription', bool: true}]
        }),
        getCaseRecordMedicationsAll: builder.query({
            query: ({uuid_caseRecord, pageNumber}) => ({
                url: `${baseURL_caseRecord_get}/getCaseRecordMedicationsAll?uuid_caseRecord=${uuid_caseRecord}&pageNumber=${pageNumber}`,
                credentials: "include"
            }),
            providesTags: [{type: 'CaseRecordMedicationsAll', bool: true}]
        }),
    }),
})

export const { 
    useGetCaseRecordQuery,
    useGetCaseRecordDescriptionQuery,
    useGetCaseRecordImageQuery,
    useGetCaseRecordVideoQuery,
    useGetCaseRecordPrescriptionQuery,
    useGetCaseRecordMedicationsAllQuery  
} = caseRecordRTKQuery;