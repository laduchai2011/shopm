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


module.exports = router;