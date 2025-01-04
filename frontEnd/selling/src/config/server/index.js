export const baseURL                                                           = 'http://shopm.tks.local';
export const baseURL_socket                                                    = 'ws://shopm.tks.local';

export const SERVER_ADDRESS_GET_PROVIDERLIST                                   = `${baseURL}:8500/api/svGetProvider/provider/list`;
export const SERVER_ADDRESS_GET_PROVIDER                                       = `${baseURL}:8500/api/svGetProvider/selling/provider`;

export const SERVER_ADDRESS_CREATE_DEPARTMENTGROUP                             = `${baseURL}:4500/api/svUploadDepartment/createDepartmentGroup`;

export const SERVER_ADDRESS_READALL_DEPARTMENTGROUP_WITH_FK                    = `${baseURL}:4800/api/svGetDepartment/readAllDepartmentGroupWithFK`;

export const SERVER_ADDRESS_SR_CREATEDEPARTMENT_READALL_MEDICATION_WITH_FK     = `${baseURL}:8700/api/svGetMedication/sreenCreateDepartmentRequireReadAllMedicationWithFK`;

export const SERVER_ADDRESS_DEPARTMENT = {
    CREATE : `${baseURL}:4500/api/svUploadDepartment/createDepartment`
}

export const SERVER_ADDRESS_CHEST = {
    GET_CHEST_LIST : `${baseURL}:3700/api/svGetChest/SellingGetChestList`
}