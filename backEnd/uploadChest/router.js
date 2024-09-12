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

const { ChestGroupRead } = require('./src/middle/ChestGroupRead');
const { 
    handleDataWithStatusTKS
} = require('./src/middle/ChestGroupRole');



router.post('/createChestGroup', 
    AuthenticationTKS,
    (req, res) => {
    const chestGroupOptions = req.body.chestGroupOptions;
    chestGroupCRUD.create(chestGroupOptions, (chestGroup, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (chestGroup && chestGroup!==null) {
                return res.status(200).json({
                    chestGroup: chestGroup,
                    success: true,
                    message: 'ChestGroup is create successly !'
                });
            } else {
                return res.status(200).json({
                    chestGroup: chestGroup,
                    success: false,
                    message: 'ChestGroup is NOT create successly !'
                })
            }
        }
    })
})

router.patch('/TKSManagerPatchNoteOfChestGroupWhenCustom', 
    AuthenticationTKS,
    (req, res) => {
    const uuid_chestGroup = req.body.uuid_chestGroup;
    const note = req.body.note;
    chestGroupCRUD.patchNoteOfChestGroupWhenCustom(uuid_chestGroup, note, (chestGroup, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (chestGroup && chestGroup!==null) {
                return res.status(200).json({
                    chestGroup: chestGroup,
                    success: true,
                    message: 'ChestGroup is patch note of chestGroup when custom successly !'
                });
            } else {
                return res.status(200).json({
                    chestGroup: chestGroup,
                    success: false,
                    message: 'ChestGroup is patch note of chestGroup when custom failure !'
                })
            }
        }
    })
})

router.patch('/TKSManagerPatchChestGroup', 
    AuthenticationTKS,
    ChestGroupRead,
    handleDataWithStatusTKS,
    (req, res) => {
    const uuid_chestGroup = req.body.uuid_chestGroup;
    const chestGroupOptions = req.chestGroupOptionsMid;
    chestGroupCRUD.patch(uuid_chestGroup, chestGroupOptions, (chestGroup, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (chestGroup && chestGroup!==null) {
                return res.status(200).json({
                    chestGroup: chestGroup,
                    success: true,
                    message: 'ChestGroup is patch successly !'
                });
            } else {
                return res.status(200).json({
                    chestGroup: chestGroup,
                    success: false,
                    message: 'ChestGroup is NOT patch successly !'
                })
            }
        }
    })
})


module.exports = router;