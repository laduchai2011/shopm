'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

// const { serviceRedis } = require('./src/model/serviceRedis');
// const { serviceRedlock } = require('./src/config/serviceRedlock');
const { 
    Authentication_SHOPM,
    // Authentication_TKS
} = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents, logError } = require('./logEvents');
// const { SvMessage } = require('./src/model/svMessage');

const { departmentGroupCRUD } = require('./src/model/CRUDDATABASE/CRUD_DepartmentGroup');
const { departmentCRUD } = require('./src/model/CRUDDATABASE/CRUD_Department');


const service = process.env.SERVICE;

const PARENT_FOLDER_OF_SERVICE = process.env.PARENT_FOLDER_OF_SERVICE;
const SERVICE_FOLDER = process.env.SERVICE_FOLDER;
const path_of_this_file = `${PARENT_FOLDER_OF_SERVICE}/${SERVICE_FOLDER}/router.js`;


router.get('/readAllDepartmentGroupWithFK', 
    Authentication_SHOPM,
    (req, res) => {
    const uuid_provider = req.query.uuid_provider;
    departmentGroupCRUD.readAllWithFK(uuid_provider, (departmentGroupAll, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (departmentGroupAll && departmentGroupAll!==null) {
                return res.status(200).json({
                    departmentGroupAll: departmentGroupAll,
                    success: true,
                    message: `departmentGroupAll is read successly (${service}) !`
                });
            } else {
                return res.status(200).json({
                    departmentGroupAll: departmentGroupAll,
                    success: false,
                    message: `departmentGroupAll is NOT read successly (${service}) !`
                })
            }
        }
    })
})

router.get('/SHOPM_getList_department_from_medicationScreen', 
    // Authentication_SHOPM,
    (req, res) => {
    const uuid_medication = req.query.uuid_medication;
    const pageIndex = Number(req.query.pageIndex);
    const pageSize = Number(req.query.pageSize);
    departmentCRUD.SHOPM_getList_department_from_medicationScreen(uuid_medication, pageIndex, pageSize, (departmentList, err) => {
        if (err) {
            const createErr = {
                file: 'router.js',
                path: path_of_this_file,
                url: req.url,
                err: err,
                message: 'Please login 4 !'
            }
            logError(createErr);
        } else {
            if (departmentList && departmentList!==null) {
                return res.status(200).json({
                    departmentList: departmentList,
                    success: true,
                    message: `DepartmentList is read successly (${service}) !`,
                    url: req.url
                })
            } else {
                return res.status(200).json({
                    departmentList: departmentList,
                    success: false,
                    message: `DepartmentList is read NOT successly (${service}) !`,
                    url: req.url
                })
            }
        }
    })
})

module.exports = router;