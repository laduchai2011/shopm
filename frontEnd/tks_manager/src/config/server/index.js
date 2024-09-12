export const baseURLTLS                                                         = 'http://shopm.tks.local';
export const baseURLTLS_socket                                                  = 'ws://shopm.tks.local';

export const SERVER_ADDRESS_READ_TOLOGIN                                        = `${baseURLTLS}:2300/api/svUploadMember/login`;

export const SERVER_ADDRESS_READ_CHESTGROUP                                     = `${baseURLTLS}:2400/api/svGetChest/readChestGroup`;
export const SERVER_ADDRESS_CREATE_CHESTGROUP                                   = `${baseURLTLS}:2200/api/svTKS_UploadChest/createChestGroup`;
export const SERVER_ADDRESS_PATCH_CHESTGROUP                                    = `${baseURLTLS}:2200/api/svTKS_UploadChest/patchChestGroup`;
export const SERVER_ADDRESS_PATCH_CHESTGROUP_STATUS                             = `${baseURLTLS}:2200/api/svTKS_UploadChest/patchChestGroupStatus`;

export const SERVER_ADDRESS_CREATE_CHESTGROUP_OF_SHOPM                          = `${baseURLTLS}:3500/api/svUploadChest/createChestGroup`;
export const SERVER_ADDRESS_PATCH_NOTI_CHESTGROUP_OF_SHOPM                      = `${baseURLTLS}:3500/api/svUploadChest/TKSManagerPatchNoteOfChestGroupWhenCustom`;