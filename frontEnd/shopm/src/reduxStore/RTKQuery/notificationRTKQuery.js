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

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL } from 'config/server';

const baseURL_notification_get = `${baseURL}:5000/api/svGetNotification`;
const baseURL_notification_upload = `${baseURL}:5100/api/svUploadNotification`;

export const notificationRTKQuery = createApi({
    reducerPath: 'notificationRTKQuery',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    tagTypes:['Notification'],
    endpoints: (builder) => ({
        getNotificationCount: builder.query({
            query: ({type, status}) => ({ 
                url: `${baseURL_notification_get}/getNotificationCount?type=${type}&status=${status}`,
                credentials: "include"
            }),
            providesTags: [{type: 'Notification', bool: true}]
        }),

        getNotificationList: builder.query({
            query: ({type, status, pageIndex, pageSize}) => ({ 
                url: `${baseURL_notification_get}/getNotificationList?type=${type}&status=${status}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
                credentials: "include"
            }),
            // providesTags: [{type: 'Notification', bool: true}]
        }),

        patchNotificationStatus: builder.mutation({
            query: ({type, newStatus, currentStatus}) => ({
                url: `${baseURL_notification_upload}/patchNotificationStatus`,
                method: 'PATCH',
                body: {type: type, newStatus: newStatus, currentStatus: currentStatus},
                credentials: "include"
            }),
            invalidatesTags: (result, error, arg) => {
                if (error) {
                    console.error(error);
                } else {
                    return [{type: 'Notification', bool: result?.notification[0] > 0 ? true : false}]
                }
            }
        }),

        createNotification: builder.mutation({
            query: (notificationOptions) => ({
                url: `${baseURL_notification_upload}/createNotification`,
                method: 'POST',
                body: { notificationOptions: notificationOptions },
                credentials: "include"
            }),
            invalidatesTags: (result, error, arg) => {
                if (error) {
                    console.error(error);
                } else {
                    // console.log('createNotification', result)
                }
            }
        })
    }),
})

export const { 
    useGetNotificationCountQuery,
    useLazyGetNotificationListQuery,
    usePatchNotificationStatusMutation,
    useCreateNotificationMutation 
} = notificationRTKQuery;