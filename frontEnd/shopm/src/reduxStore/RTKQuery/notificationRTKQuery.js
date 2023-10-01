/**
*@typedef {
*type: string,
*notification: text,
*status: string,  // sent - receved - seen - read - deleted / 1 - 2 - 3 - 4 - 5
*uuid_user: uuid
*} notificationOptions
*/  
    

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL } from 'config/server';

const baseURL_notification = `${baseURL}:5000/api/svGetNotification`;

export const notificationRTKQuery = createApi({
    reducerPath: 'notificationRTKQuery',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL_notification }),
    endpoints: (builder) => ({
        getNotificationCount: builder.query({
            query: ({type, status}) => ({ 
                url: `/getNotificationCount?type=${type}&status=${status}`,
                credentials: "include"
            }),
        }),
    }),
})

export const { useGetNotificationCountQuery } = notificationRTKQuery;