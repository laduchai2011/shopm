import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
*@typedef {
*type: string,
*notification: text,
*status: string,  // sent - receved - seen - read - deleted / 1 - 2 - 3 - 4 - 5
*uuid_user: uuid
*} notificationOptions
*/  
    
/**
*@typedef {
*title: string
*uuid_userSent: string,
*} notification
*/

import { baseURL } from 'config/server';

const baseURL_user = `${baseURL}:7100/api/svGetUserInfor`;

export const userRTKQuery = createApi({
    reducerPath: 'userRTKQuery',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL_user }),
    endpoints: (builder) => ({
        getUserWithPk_notification: builder.query({
            query: ({uuid_user}) => ({ 
                url: `/getUserWithPk_notification?uuid_user=${uuid_user}`,
                credentials: "include"
            }),
        }),
        getSickPersonFromCaseRecord: builder.query({
            query: ({uuid_sickPerson}) => ({ 
                url: `/sickPerson/getFromCaseRecord?uuid_sickPerson=${uuid_sickPerson}`,
                credentials: "include"
            }),
        }),
    }),
})

export const { 
    useLazyGetUserWithPk_notificationQuery ,
    useGetSickPersonFromCaseRecordQuery
} = userRTKQuery;