import { ENVIR_DEVELOPMENT, ENVIR_PRODUCTTION } from "constant/environment"

const PORT_DEPARTMENT_INIT = {
    SV_GET: 0,
    SV_UPLOAD: 0
}

if (process.env.NODE_ENV===ENVIR_DEVELOPMENT) {
    PORT_DEPARTMENT_INIT.SV_GET = 4800;
    PORT_DEPARTMENT_INIT.SV_UPLOAD = 4500
}
if (process.env.NODE_ENV===ENVIR_PRODUCTTION) {
    PORT_DEPARTMENT_INIT.SV_GET = process.env.REACT_APP_BACK_END_SHOPM_SV_GET_DEPARTMENT_PORT;
    PORT_DEPARTMENT_INIT.SV_UPLOAD = process.env.REACT_APP_BACK_END_SHOPM_SV_UPLOAD_DEPARTMENT_PORT
}

export const PORT_DEPARTMENT = {
    SV_GET: PORT_DEPARTMENT_INIT.SV_GET,
    SV_UPLOAD: PORT_DEPARTMENT_INIT.SV_UPLOAD
};