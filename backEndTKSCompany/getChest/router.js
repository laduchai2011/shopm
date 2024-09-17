'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

const { serviceRedis } = require('./src/model/serviceRedis');
const { serviceRedlock } = require('./src/config/serviceRedlock');
const { Authentication } = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');

const { SvMessage } = require('./src/model/svMessage');

const { chestCRUD } = require('./src/model/CRUDDATABASE/CRUD_Chest');



// router.get('/readChestGroupList', // doing
//     Authentication,
//     (req, res) => {
//     const chestGroupOptions = req.body.chestGroupOptions;
//     const uuid_member = req.body.uuid_member;
//     chestCRUD.patchChestGroup(chestGroupOptions, uuid_member, (chestGroup, err) => {
//         if (err) {
//             logEvents(`${req.url}---${req.method}---${err}`);
//             return res.status(500).send(err);
//         } else {
//             if(chestGroup && chestGroup!==null) {
//                 return res.status(201).json({
//                     chestGroup: chestGroup,
//                     message: 'Custom a chest group success !',
//                     success: true
//                 })
//             } else {
//                 return res.status(200).json({
//                     message: 'Custom a chest group failure !',
//                     success: false
//                 })
//             }
//         }
//     })
// })

router.get('/TKSManagerGetChestGroup', // doing
    Authentication,
    (req, res) => {
    const uuid_chestGroup = req.query.uuid_chestGroup;
    chestCRUD.readChestGroup(uuid_chestGroup, (chestGroup, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if(chestGroup && chestGroup!==null) {
                return res.status(200).json({
                    chestGroup: chestGroup,
                    message: 'Read a chest group successly (svTKS_GetChest) !',
                    success: true
                })
            } else {
                return res.status(200).json({
                    message: 'Read a chest group failure (svTKS_GetChest) !',
                    success: false
                })
            }
        }
    })
})


module.exports = router;