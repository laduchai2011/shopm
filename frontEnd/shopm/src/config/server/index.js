export const baseURL                                                           = 'http://192.168.5.129';
export const baseURL_socket                                                    = 'ws://192.168.5.129';


export const SERVER_ADDRESS_SIGNUP                                             = `${baseURL}:7000/api/svUploadUserInfor/signup`;
export const SERVER_ADDRESS_LOGIN                                              = `${baseURL}:7000/api/svUploadUserInfor/login`;
export const SERVER_ADDRESS_LOGOUT                                             = `${baseURL}:7000/api/svUploadUserInfor/logout`;

export const SERVER_ADDRESS_ADD_DOCTORORPHARMACIST                             = `${baseURL}:7000/api/svUploadUserInfor/registerDoctorOrPharmacist`;
export const SERVER_ADDRESS_SICKPERSON_CREATE                                  = `${baseURL}:7000/api/svUploadUserInfor/sickPerson/create`;
export const SERVER_ADDRESS_GET_DOCTORORPHARMACIST_FROM_CASERECORD             = `${baseURL}:7100/api/svGetUserInfor/doctorOrPharmacist/getfromCaseRecord`;
export const SERVER_ADDRESS_GET_SICKPERSON_FROM_CASERECORD                     = `${baseURL}:7100/api/svGetUserInfor/sickPerson/getfromCaseRecord`;
export const SERVER_ADDRESS_GET_DOCTORORPHARMACIST_FROM_CASERECORD_SEARCH      = `${baseURL}:7100/api/svGetUserInfor/doctorOrPharmacist/getfromCaseRecord/search`;
export const SERVER_ADDRESS_GET_USERWITHPK_NOTIFICATION                        = `${baseURL}:7100/api/svGetUserInfor/getUserWithPk_notification`;

export const SERVER_ADDRESS_CREATE_ORDERMEDICATION                             = `${baseURL}:7400/api/svUploadOrderMedication/orderMedication/create`;

export const SERVER_ADDRESS_GET_VIDEO                                          = `${baseURL}:4040/api/video`;

export const SERVER_ADDRESS_UPLOADIMAGE                                        = `${baseURL}:8100/api/svUploadImage/image/upload`;
export const SERVER_ADDRESS_GETIMAGE                                           = `${baseURL}:8200/api/svGetImage/image`;

export const SERVER_ADDRESS_GET_PROVIDERLIST                                   = `${baseURL}:8500/api/svGetProvider/provider/list`;
export const SERVER_ADDRESS_CREATEPROVIDER                                     = `${baseURL}:8201/api/svUploadProvider/provider/create`;
export const SERVER_ADDRESS_GET_PROVIDER                                       = `${baseURL}:8500/api/svGetProvider/provider`;
export const SERVER_ADDRESS_GET_PROVIDERABOUTLIST                              = `${baseURL}:8500/api/svGetProvider/provider/about/list`;
export const SERVER_ADDRESS_CREATEPROVIDERABOUT                                = `${baseURL}:8201/api/svUploadProvider/provider/about/create`;

export const SERVER_ADDRESS_ADD_MEDICATION                                     = `${baseURL}:8600/api/svUploadMedication/provider/medication/add`;
export const SERVER_ADDRESS_GET_MEDICATION                                     = `${baseURL}:8700/api/svGetMedication/medication`;
export const SERVER_ADDRESS_GET_MEDICATION_LIST                                = `${baseURL}:8700/api/svGetMedication/provider/medication/list`;
export const SERVER_ADDRESS_GET_MEDICATIONMANAGER_LIST                         = `${baseURL}:8700/api/svGetMedication/provider/medicationManager/list`;
export const SERVER_ADDRESS_GET_MEDICATION_HOME                                = `${baseURL}:8700/api/svGetMedication/home/medication/list`;
export const SERVER_ADDRESS_PATCH_MEDICATION                                   = `${baseURL}:8600/api/svUploadMedication/provider/medication/patch`;

export const SERVER_ADDRESS_POST_PROVIDER_NEWS                                 = `${baseURL}:8900/api/svUploadProviderNews/provider/news/add`;
export const SERVER_ADDRESS_GET_PROVIDER_NEWS_LIST                             = `${baseURL}:8800/api/svGetProviderNews/provider/news/list`;

export const SERVER_ADDRESS_POST_CASERECORD                                    = `${baseURL}:7200/api/svUploadCaseRecord/caseRecord/create`;
export const SERVER_ADDRESS_GETLIST_CASERECORD                                 = `${baseURL}:7300/api/svGetCaseRecord/caseRecord/getList`;
export const SERVER_ADDRESS_GET_CASERECORD                                     = `${baseURL}:7300/api/svGetCaseRecord/caseRecord/get`;
export const SERVER_ADDRESS_GETLIST_CASERECORDPAGE                             = `${baseURL}:7300/api/svGetCaseRecord/caseRecordPage/getList`;
export const SERVER_ADDRESS_PATCH_CASERECORDPAGE                               = `${baseURL}:7200/api/svUploadCaseRecord/caseRecordPage/patch`;  
export const SERVER_ADDRESS_CREATE_CASERECORD                                  = `${baseURL}:7200/api/svUploadCaseRecord/caseRecord/createCaseRecord`; 
export const SERVER_ADDRESS_PATCH_STATUS_CRC_CASERECORD                        = `${baseURL}:7200/api/svUploadCaseRecord/caseRecord/patchStatusCRCCaseRecord`; 
export const SERVER_ADDRESS_CASERECORD_CREATE_DESCRIPTION                      = `${baseURL}:7200/api/svUploadCaseRecord/caseRecord/createDescription`; 
export const SERVER_ADDRESS_CASERECORD_BULKCREATE_IMAGE                        = `${baseURL}:7200/api/svUploadCaseRecord/caseRecord/bulkCreateImage`; 
export const SERVER_ADDRESS_CASERECORD_DELETE_IMAGE                            = `${baseURL}:7200/api/svUploadCaseRecord/caseRecord/deleteCaseRecordImage`; 
export const SERVER_ADDRESS_CASERECORD_READ_IMAGEALL                           = `${baseURL}:7300/api/svGetCaseRecord/getCaseRecordImageAll`; 
export const SERVER_ADDRESS_CASERECORD_CREATE_PRESCRIPTION                     = `${baseURL}:7200/api/svUploadCaseRecord/caseRecord/createPrescription`; 
export const SERVER_ADDRESS_PATCH_CASERECORD_SENDREQUIRETODOCTORPHARMACIST     = `${baseURL}:7200/api/svUploadCaseRecord/caseRecord/sendRequireToDoctorPharmacist`; 
export const SERVER_ADDRESS_CASERECORD_PATCH_DESCRIPTION                       = `${baseURL}:7200/api/svUploadCaseRecord/caseRecord/patchDescription`;
export const SERVER_ADDRESS_CASERECORD_PATCH_IMAGES                            = `${baseURL}:7200/api/svUploadCaseRecord/caseRecord/patchImages`;  
export const SERVER_ADDRESS_CASERECORD_SAVE_PRESCRIPTION                       = `${baseURL}:7200/api/svUploadCaseRecord/caseRecord/savePrescription`; 
export const SERVER_ADDRESS_CASERECORD_ADD_MEDICATION                          = `${baseURL}:7200/api/svUploadCaseRecord/caseRecord/addMedication`; 
export const SERVER_ADDRESS_CASERECORD_EDIT_MEDICATION                         = `${baseURL}:7200/api/svUploadCaseRecord/caseRecord/editMedication`; 
export const SERVER_ADDRESS_CASERECORD_DELETE_MEDICATION                       = `${baseURL}:7200/api/svUploadCaseRecord/caseRecord/deleteMedication`;  
export const SERVER_ADDRESS_CASERECORD_GET_LOCK                                = `${baseURL}:7300/api/svGetCaseRecord/caseRecord/getLock`;                       
export const SERVER_ADDRESS_CASERECORD_CREATE_LOCK                             = `${baseURL}:7200/api/svUploadCaseRecord/caseRecord/createLock`; 
export const SERVER_ADDRESS_CASERECORD_DELETE_LOCK                             = `${baseURL}:7200/api/svUploadCaseRecord/caseRecord/deleteLock`; 

export const SERVER_ADDRESS_GET_SOCKETSM_ROOM                                  = `${baseURL}:2000/api/svSocketSM/getRoom`; 
export const SERVER_ADDRESS_SOCKETSM                                           = `${baseURL_socket}:2100`;

export const SERVER_ADDRESS_GET_ORDER_MEDICATION                               = `${baseURL}:8400/api/svGetOrderMedication`;
export const SERVER_ADDRESS_GET_CURRENTCART                                    = `${baseURL}:8400/api/svGetOrderMedication/getCurrentCart`; 
export const SERVER_ADDRESS_PATCH_CURRENTCART                                  = `${baseURL}:7400/api/svUploadOrderMedication/patchCurrentCart`; 
export const SERVER_ADDRESS_DELETE_CURRENTCART                                 = `${baseURL}:7400/api/svUploadOrderMedication/deleteCurrentCart`; 


// ---------------------------------------

// export const SERVER_ADDRESS_SIGNUP                     = 'http://localhost:4000/api/svUploadUserInfor/signup';
// export const SERVER_ADDRESS_LOGIN                      = 'http://localhost:4000/api/svUploadUserInfor/login';

// export const SERVER_ADDRESS_UPLOADIMAGE                = 'http://localhost:4000/api/svUploadImage/image/upload';
// export const SERVER_ADDRESS_GETIMAGE                   = 'http://localhost:4000/api/svGetImage/image';

// export const SERVER_ADDRESS_GET_PROVIDERLIST           = 'http://localhost:4000/api/svGetProvider/provider/list';
// export const SERVER_ADDRESS_CREATEPROVIDER             = 'http://localhost:4000/api/svUploadProvider/provider/create';
// export const SERVER_ADDRESS_GET_PROVIDER               = 'http://localhost:4000/api/svGetProvider/provider';

// export const SERVER_ADDRESS_GET_PROVIDERABOUTLIST      = 'http://localhost:4000/api/svGetProvider/provider/about/list';
// export const SERVER_ADDRESS_CREATEPROVIDERABOUT        = 'http://localhost:4000/api/svUploadProvider/provider/about/create';

// export const SERVER_ADDRESS_ADD_MEDICATION             = 'http://localhost:4000/api/svUploadMedication/provider/medication/add';
// export const SERVER_ADDRESS_GET_MEDICATION             = 'http://localhost:4000/api/svGetMedication/medication';
// export const SERVER_ADDRESS_GET_MEDICATION_LIST        = 'http://localhost:4000/api/svGetMedication/provider/medication/list';
// export const SERVER_ADDRESS_GET_MEDICATIONMANAGER_LIST = 'http://localhost:4000/api/svGetMedication/provider/medicationManager/list';
// export const SERVER_ADDRESS_GET_MEDICATION_HOME        = 'http://localhost:4000/api/svGetMedication/home/medication/list';
// export const SERVER_ADDRESS_PATCH_MEDICATION           = 'http://localhost:4000/api/svUploadMedication/provider/medication/patch';

// export const SERVER_ADDRESS_POST_PROVIDER_NEWS         = 'http://localhost:4000/api/svUploadProviderNews/provider/news/add';
// export const SERVER_ADDRESS_GET_PROVIDER_NEWS_LIST     = 'http://localhost:4000/api/svGetProviderNews/provider/news/list';