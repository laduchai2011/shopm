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

const { chestGroupCRUD } = require('./src/model/CRUDDATABASE/CRUD_ChestGroup');

// const { ChestGroupRead } = require('./src/middle/ChestGroupRead');
// const { 
//     isReadyToCustom,
//     handleDataWithStatusTKS
// } = require('./src/middle/ChestGroupRole');



router.get('/TKSManagerGetChestGroup', 
    AuthenticationTKS,
    (req, res) => {
    const uuid_chestGroup = req.query.uuid_chestGroup;
    chestGroupCRUD.TKSManagerRead(uuid_chestGroup, (chestGroup, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (chestGroup && chestGroup!==null) {
                return res.status(200).json({
                    chestGroup: chestGroup,
                    success: true,
                    message: 'ChestGroup is read successly (svGetChest) !'
                });
            } else {
                return res.status(200).json({
                    chestGroup: chestGroup,
                    success: false,
                    message: 'ChestGroup is NOT read successly (svGetChest) !'
                })
            }
        }
    })
})

module.exports = router;