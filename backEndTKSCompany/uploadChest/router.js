'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

const { serviceRedis } = require('./src/model/serviceRedis');
const { serviceRedlock } = require('./src/config/serviceRedlock');
const { Authentication } = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');

const { SvMessage } = require('./src/model/svMessge');

const { chestCRUD } = require('./src/model/CRUDDATABASE/CRUD_Chest');

router.post('/createChestGroup',
    Authentication,
    (req, res) => {
    const chestGroupOptions = req.body.chestGroupOptions;
    chestCRUD.createChestGroup(chestGroupOptions, (chestGroup, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if(chestGroup && chestGroup!==null) {
                return res.status(201).json({
                    chestGroup: chestGroup,
                    message: 'Create a chest group success !',
                    success: true
                })
            } else {
                return res.status(200).json({
                    message: 'Create a chest group failure !',
                    success: false
                })
            }
        }
    })
})

router.patch('/patchChestGroup',
    Authentication,
    (req, res) => {
    const chestGroupOptions = req.body.chestGroupOptions;
    const uuid_member = req.body.uuid_member;
    chestCRUD.patchChestGroup(chestGroupOptions, uuid_member, (chestGroup, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if(chestGroup && chestGroup!==null) {
                return res.status(201).json({
                    chestGroup: chestGroup,
                    message: 'Custom a chest group success !',
                    success: true
                })
            } else {
                return res.status(200).json({
                    message: 'Custom a chest group failure !',
                    success: false
                })
            }
        }
    })
})

module.exports = router;