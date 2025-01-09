'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

// const { serviceRedis } = require('./src/model/serviceRedis');
// const { serviceRedlock } = require('./src/config/serviceRedlock');
const { Authentication_TKS } = require('./src/auth/Authentication');
const { logEvents } = require('./logEvents');
// const { SvMessage } = require('./src/model/svMessage');

const { logCRUD } = require('./src/model/CRUDDATABASE/CRUD_Log');




router.get('/TKSManagerGetLogAll', 
    Authentication_TKS,
    (req, res) => {
    const pageIndex = req.query.pageIndex;
    const pageSize = req.query.pageSize;
    logCRUD.bulkReadAll(Number(pageIndex), Number(pageSize), (logs, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if(logs && logs!==null) {
                return res.status(201).json({
                    logs: logs,
                    message: 'Get logs successly !',
                    success: true
                })
            } else {
                return res.status(200).json({
                    message: 'Get logs failure !',
                    success: false
                })
            }
        }
    })
})


module.exports = router;