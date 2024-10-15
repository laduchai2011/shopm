'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

const { serviceRedis } = require('./src/model/serviceRedis');
const { serviceRedlock } = require('./src/config/serviceRedlock');
const { 
    Authentication,
    AuthenticationTKS
} = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');
const { SvMessage } = require('./src/model/svMessage');

const { departmentGroupCRUD } = require('./src/model/CRUDDATABASE/CRUD_DepartmentGroup');
const { departmentCRUD } = require('./src/model/CRUDDATABASE/CRUD_Department');

const { getProviderMid } = require('./src/middle/getProvider');
const { isMyProvider, isNormalProvider } = require('./src/middle/checkProvider');
const { getMedicationMid } = require('./src/middle/getMedication');
const { isProviderMedication, isNormalMedication } = require('./src/middle/checkMedication');
const { getDepartmentGroupMid } = require('./src/middle/getDepartmentGroup');
const { isProviderDepartmentGroup, isNormalDepartmentGroup } = require('./src/middle/checkDepartmentGroup');

const service = process.env.SERVICE;


// department group
router.post('/createDepartmentGroup', 
    Authentication,
    (req, res) => {
    const departmentGroupOptions = req.body.departmentGroupOptions;
    departmentGroupCRUD.create(departmentGroupOptions, (departmentGroup, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (departmentGroup && departmentGroup!==null) {
                return res.status(200).json({
                    departmentGroup: departmentGroup,
                    success: true,
                    message: `departmentGroup is create successly (${service}) !`
                });
            } else {
                return res.status(200).json({
                    departmentGroup: departmentGroup,
                    success: false,
                    message: `departmentGroup is NOT create successly (${service}) !`
                })
            }
        }
    })
})

// department
router.post('/createDepartment', 
    Authentication,
    getProviderMid,
    isMyProvider,
    isNormalProvider,
    getMedicationMid,
    isProviderMedication,
    isNormalMedication,
    getDepartmentGroupMid,
    isProviderDepartmentGroup,
    isNormalDepartmentGroup,
    (req, res) => {
    const departmentOptions = req.body.departmentOptions;
    departmentCRUD.create(departmentOptions, (department, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            console.log('\x1b[33m%s\x1b[0m', err);
            return res.status(500).send(err);
        } else {
            if (department && department!==null) {
                return res.status(200).json({
                    department: department,
                    success: true,
                    message: `Department is created successly !`
                });
            } else {
                return res.status(200).json({
                    department: department,
                    success: false,
                    message: `Department is NOT created successly !`
                })
            }
        }
    })
})


module.exports = router;