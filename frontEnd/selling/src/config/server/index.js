export const baseURL                                                           = 'http://shopm.tks.local';
export const baseURL_socket                                                    = 'ws://shopm.tks.local';

export const SERVER_ADDRESS_GET_PROVIDERLIST                                   = `${baseURL}:8500/api/svGetProvider/provider/list`;
export const SERVER_ADDRESS_GET_PROVIDER                                       = `${baseURL}:8500/api/svGetProvider/selling/provider`;

export const SERVER_ADDRESS_CREATE_DEPARTMENTGROUP                             = `${baseURL}:4500/api/svUploadDepartment/createDepartmentGroup`;

export const SERVER_ADDRESS_READALL_WITH_FK_DEPARTMENTGROUP                    = `${baseURL}:4800/api/svGetDepartment/readAllDepartmentGroupWithFK`;