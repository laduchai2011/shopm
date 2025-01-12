import { ENVIR_DEVELOPMENT, ENVIR_PRODUCTTION } from "constant/environment"

const baseURL_Dev = 'http://shopm.tks.local';

const ADDRESS_DEPARTMENT_INIT = {
    SV_GET: 0,
    SV_UPLOAD: 0,
    NAME_SV_GET: 'svGetDepartment',
    NAME_SV_UPLOAD: 'svUploadDepartment'
}

if (process.env.NODE_ENV===ENVIR_DEVELOPMENT) {
    ADDRESS_DEPARTMENT_INIT.SV_GET = baseURL_Dev;
    ADDRESS_DEPARTMENT_INIT.SV_UPLOAD = baseURL_Dev
}
if (process.env.NODE_ENV===ENVIR_PRODUCTTION) {
    ADDRESS_DEPARTMENT_INIT.SV_GET = process.env.REACT_APP_BACK_END_SHOPM_SV_GET_DEPARTMENT_ADDRESS;
    ADDRESS_DEPARTMENT_INIT.SV_UPLOAD = process.env.REACT_APP_BACK_END_SHOPM_SV_UPLOAD_DEPARTMENT_ADDRESS
}

export const ADDRESS_DEPARTMENT = {
    ...ADDRESS_DEPARTMENT_INIT,
    SV_GET: ADDRESS_DEPARTMENT_INIT.SV_GET,
    SV_UPLOAD: ADDRESS_DEPARTMENT_INIT.SV_UPLOAD,
};