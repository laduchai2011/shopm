import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { 
    SERVER_ADDRESS_READ_CHESTGROUP_FROM_SVGETChEST,
    SERVER_ADDRESS_READ_CHESTGROUP_FROM_SVTKSGETChEST,
    SERVER_ADDRESS_PATCH_CHESTGROUP_TO_SVTKSUPLOADChEST,
    SERVER_ADDRESS_PATCH_NOTI_CHESTGROUP_OF_SHOPM,
    SERVER_ADDRESS_PATCH_CHESTGROUP_STATUS_TO_SVTKSUPLOADChEST,
    SERVER_ADDRESS_PATCH_CHESTGROUP_TO_SVUPLOADChEST,
    SERVER_ADDRESS_PATCH_NOTI_CHESTGROUP_OF_TKS
} from 'config/server';


// Define a service using a base URL and expected endpoints
export const chestGroupRTKQuery = createApi({
    reducerPath: 'chestGroupRTKQuery',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    tagTypes:[
        'ChestGroup'
    ],
    endpoints: (builder) => ({
        // query
        getChestGroupFromSvGetChest: builder.query({
            query: ({uuid_chestGroup}) => ({
                url: `${SERVER_ADDRESS_READ_CHESTGROUP_FROM_SVGETChEST}?uuid_chestGroup=${uuid_chestGroup}`,
                credentials: "include"
            }),
            providesTags: (result, error) => [{ type: 'ChestGroup', id: result?.chestGroup?.id }]
        }),
        getChestGroupFromSvTKS_GetChest: builder.query({
            query: ({uuid_chestGroup}) => ({
                url: `${SERVER_ADDRESS_READ_CHESTGROUP_FROM_SVTKSGETChEST}?uuid_chestGroup=${uuid_chestGroup}`,
                credentials: "include"
            }),
            providesTags: (result, error) => [{ type: 'ChestGroup', id: result?.chestGroup?.id }]
        }),

        // mutation
        patchChestGroupToSvTKS_UploadChest: builder.mutation({
            query: ({uuid_chestGroup, chestGroupOptions, uuid_member}) => ({
                url: `${SERVER_ADDRESS_PATCH_CHESTGROUP_TO_SVTKSUPLOADChEST}`,
                method: 'PATCH',
                body: { 
                    uuid_chestGroup: uuid_chestGroup,
                    chestGroupOptions: chestGroupOptions,
                    uuid_member: uuid_member
                },
                credentials: "include",
                prepareHeaders: (headers) => {
                    headers.set("Content-Type", 'application/json')
                    return headers;
                }
            }),
            invalidatesTags: (result, error, arg) => {
                if (error) {
                    console.error(error);
                } else {
                    return [{ type: 'ChestGroup', id: result?.chestGroup?.id }]
                }
            }
        }),
        patchNotiChestGroupToSvUploadChest: builder.mutation({
            query: ({uuid_chestGroup, note}) => ({
                url: `${SERVER_ADDRESS_PATCH_NOTI_CHESTGROUP_OF_SHOPM}`,
                method: 'PATCH',
                body: { 
                    uuid_chestGroup: uuid_chestGroup,
                    note: note
                },
                credentials: "include",
                prepareHeaders: (headers) => {
                    headers.set("Content-Type", 'application/json')
                    return headers;
                }
            }),
            invalidatesTags: (result, error, arg) => {
                if (error) {
                    console.error(error);
                } else {
                    return [{ type: 'ChestGroup', id: result?.chestGroup?.id }]
                }
            }
        }),
        patchChestGroupStatusToSvTKS_UploadChest: builder.mutation({
            query: ({uuid_chestGroup, status, uuid_member}) => ({
                url: `${SERVER_ADDRESS_PATCH_CHESTGROUP_STATUS_TO_SVTKSUPLOADChEST}`,
                method: 'PATCH',
                body: { 
                    uuid_chestGroup: uuid_chestGroup,
                    status: status,
                    uuid_member: uuid_member
                },
                credentials: "include",
                prepareHeaders: (headers) => {
                    headers.set("Content-Type", 'application/json')
                    return headers;
                }
            }),
            invalidatesTags: (result, error, arg) => {
                if (error) {
                    console.error(error);
                } else {
                    return [{ type: 'ChestGroup', id: result?.chestGroup?.id }]
                }
            }
        }),
        patchChestGroupToSvUploadChest: builder.mutation({
            query: ({uuid_chestGroup, chestGroupOptions}) => ({
                url: `${SERVER_ADDRESS_PATCH_CHESTGROUP_TO_SVUPLOADChEST}`,
                method: 'PATCH',
                body: { 
                    uuid_chestGroup: uuid_chestGroup,
                    chestGroupOptions: chestGroupOptions
                },
                credentials: "include",
                prepareHeaders: (headers) => {
                    headers.set("Content-Type", 'application/json')
                    return headers;
                }
            }),
            invalidatesTags: (result, error, arg) => {
                if (error) {
                    console.error(error);
                } else {
                    return [{ type: 'ChestGroup', id: result?.chestGroup?.id }]
                }
            }
        }),
        patchNotiChestGroupToSvTKS_UploadChest: builder.mutation({
            query: ({uuid_chestGroup, note}) => ({
                url: `${SERVER_ADDRESS_PATCH_NOTI_CHESTGROUP_OF_TKS}`,
                method: 'PATCH',
                body: { 
                    uuid_chestGroup: uuid_chestGroup,
                    note: note
                },
                credentials: "include",
                prepareHeaders: (headers) => {
                    headers.set("Content-Type", 'application/json')
                    return headers;
                }
            }),
            invalidatesTags: (result, error, arg) => {
                if (error) {
                    console.error(error);
                } else {
                    return [{ type: 'ChestGroup', id: result?.chestGroup?.id }]
                }
            }
        }),
    }),
})

export const { 
    useGetChestGroupFromSvGetChestQuery,
    useLazyGetChestGroupFromSvGetChestQuery,
    useGetChestGroupFromSvTKS_GetChestQuery,
    useLazyGetChestGroupFromSvTKS_GetChestQuery,
    usePatchChestGroupToSvTKS_UploadChestMutation,
    usePatchNotiChestGroupToSvUploadChestMutation,
    usePatchChestGroupStatusToSvTKS_UploadChestMutation,
    usePatchChestGroupToSvUploadChestMutation,
    usePatchNotiChestGroupToSvTKS_UploadChestMutation
} = chestGroupRTKQuery;