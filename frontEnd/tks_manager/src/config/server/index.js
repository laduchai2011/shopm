export const baseURLTLS                                                         = 'http://shopm.tks.local';
export const baseURLTLS_socket                                                  = 'ws://shopm.tks.local';

export const SERVER_ADDRESS_READ_TOLOGIN                                        = `${baseURLTLS}:2300/api/svTKS_UploadMember/login`;

export const SERVER_ADDRESS_READALL_LOG                                         = `${baseURLTLS}:9000/api/svTKS_Logs/TKSManagerGetLogAll`;

export const SERVER_ADDRESS_READ_CHESTGROUP_FROM_SVTKSGETChEST                  = `${baseURLTLS}:2400/api/svTKS_GetChest/TKSManagerGetChestGroup`;
export const SERVER_ADDRESS_READ_CHESTGROUP_FROM_SVGETChEST                     = `${baseURLTLS}:3700/api/svGetChest/TKSManagerGetChestGroup`;
export const SERVER_ADDRESS_CREATE_CHESTGROUP                                   = `${baseURLTLS}:2200/api/svTKS_UploadChest/TKSManagerCreateChestGroup`;
export const SERVER_ADDRESS_PATCH_CHESTGROUP_TO_SVTKSUPLOADChEST                = `${baseURLTLS}:2200/api/svTKS_UploadChest/TKSManagerPatchChestGroup`;
export const SERVER_ADDRESS_PATCH_CHESTGROUP_TO_SVUPLOADChEST                   = `${baseURLTLS}:3500/api/svUploadChest/TKSManagerPatchChestGroup`;
export const SERVER_ADDRESS_PATCH_CHESTGROUP_STATUS_TO_SVTKSUPLOADChEST         = `${baseURLTLS}:2200/api/svTKS_UploadChest/TKSManagerPatchChestGroupStatus`;

export const SERVER_ADDRESS_CREATE_CHESTGROUP_OF_SHOPM                          = `${baseURLTLS}:3500/api/svUploadChest/createChestGroup`;
export const SERVER_ADDRESS_PATCH_NOTI_CHESTGROUP_OF_SHOPM                      = `${baseURLTLS}:3500/api/svUploadChest/TKSManagerPatchNoteOfChestGroupWhenCustom`;
export const SERVER_ADDRESS_PATCH_NOTI_CHESTGROUP_OF_TKS                        = `${baseURLTLS}:2200/api/svTKS_UploadChest/TKSManagerPatchNoteOfChestGroupWhenCustomCompletion`;