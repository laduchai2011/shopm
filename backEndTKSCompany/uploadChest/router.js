'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

const { serviceRedis } = require('./src/model/serviceRedis');
const { serviceRedlock } = require('./src/config/serviceRedlock');
const { Authentication_TKS } = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');

// const { SvMessage } = require('./src/model/svMessage');

const { chestGroupCRUD } = require('./src/model/CRUDDATABASE/CRUD_ChestGroup');
const { chestCRUD } = require('./src/model/CRUDDATABASE/CRUD_Chest');

// const svMessage = new SvMessage();
// svMessage.init();

// chest group
router.post('/TKSManagerCreateChestGroup',
    Authentication_TKS,
    (req, res) => {
    const chestGroupOptions = req.body.chestGroupOptions;
    chestGroupCRUD.create(chestGroupOptions, (chestGroup, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if(chestGroup && chestGroup!==null) {
                return res.status(201).json({
                    chestGroup: chestGroup,
                    message: 'Create a chest group successly (svTKS_UploadChest) !',
                    success: true
                })
            } else {
                return res.status(200).json({
                    message: 'Create a chest group failure (svTKS_UploadChest) !',
                    success: false
                })
            }
        }
    })
})

router.patch('/TKSManagerPatchChestGroup',
    Authentication_TKS,
    (req, res) => {
    const uuid_chestGroup = req.body.uuid_chestGroup;
    const chestGroupOptions = req.body.chestGroupOptions;
    const uuid_member = req.body.uuid_member;
    chestGroupCRUD.patch(uuid_chestGroup, chestGroupOptions, uuid_member, (chestGroup, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if(chestGroup && chestGroup!==null) {
                return res.status(201).json({
                    chestGroup: chestGroup,
                    message: 'Custom a chest group successly (svTKS_UploadChest) !',
                    success: true
                })
            } else {
                return res.status(200).json({
                    message: 'Custom a chest group failure (svTKS_UploadChest) !',
                    success: false
                })
            }
        }
    })
})

router.patch('/TKSManagerPatchChestGroupStatus',
    Authentication_TKS,
    (req, res) => {
    const uuid_chestGroup = req.body.uuid_chestGroup;
    const status = req.body.status;
    const uuid_member = req.body.uuid_member;
    chestGroupCRUD.patchStatus(uuid_chestGroup, uuid_member, status, (chestGroup, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if(chestGroup && chestGroup!==null) {
                return res.status(201).json({
                    chestGroup: chestGroup,
                    message: 'Update status of chest group successly (svTKS_UploadChest) !',
                    success: true
                })
            } else {
                return res.status(200).json({
                    message: 'Update status of chest group failure (svTKS_UploadChest) !',
                    success: false
                })
            }
        }
    })
})

router.patch('/TKSManagerPatchNoteOfChestGroupWhenCustomCompletion',
    Authentication_TKS,
    (req, res) => {
    const uuid_chestGroup = req.body.uuid_chestGroup;
    const note = req.body.note;
    chestGroupCRUD.patchNoteOfChestGroupWhenCustomCompletion(uuid_chestGroup, note, (chestGroup, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (chestGroup && chestGroup!==null) {
                return res.status(200).json({
                    chestGroup: chestGroup,
                    success: true,
                    message: 'ChestGroup is patch note of chestGroup when custom successly (svUploadChest) !'
                });
            } else {
                return res.status(200).json({
                    chestGroup: chestGroup,
                    success: false,
                    message: 'ChestGroup is patch note of chestGroup when custom failure (svUploadChest) !'
                })
            }
        }
    })
})

// chest
router.post('/TKSManagerCreateChest',
    Authentication_TKS,
    (req, res) => {
    const chestOptions = req.body.chestOptions;
    const member = req.decodedToken;
    chestCRUD.TKSManagerCreate(chestOptions, member.data.uuid_member, (chest, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if(chest && chest!==null) {
                return res.status(201).json({
                    chest: chest,
                    message: 'Create a chest successly (svTKS_UploadChest) !',
                    success: true
                })
            } else {
                return res.status(200).json({
                    message: 'Create a chest failure (svTKS_UploadChest) !',
                    success: false
                })
            }
        }
    })
})

module.exports = router;