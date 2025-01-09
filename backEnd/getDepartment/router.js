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
const { logEvents } = require('./logEvents');
// const { SvMessage } = require('./src/model/svMessage');

const { departmentGroupCRUD } = require('./src/model/CRUDDATABASE/CRUD_DepartmentGroup');


const service = process.env.SERVICE;



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

module.exports = router;