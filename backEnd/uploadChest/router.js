'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

// const { serviceRedis } = require('./src/model/serviceRedis');
// const { serviceRedlock } = require('./src/config/serviceRedlock');
const { 
    // Authentication_SHOPM,
    Authentication_TKS
} = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');
// const { SvMessage } = require('./src/model/svMessage');

const { chestGroupCRUD } = require('./src/model/CRUDDATABASE/CRUD_ChestGroup');
const { chestCRUD } = require('./src/model/CRUDDATABASE/CRUD_Chest');

const { ChestGroupRead } = require('./src/middle/ChestGroupRead');
const { 
    isReadyToCustom,
    // handleDataWithStatusTKS
} = require('./src/middle/ChestGroupRole');


// chest group
router.post('/createChestGroup', 
    Authentication_TKS,
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
                    message: 'ChestGroup is create successly (svUploadChest) !'
                });
            } else {
                return res.status(200).json({
                    chestGroup: chestGroup,
                    success: false,
                    message: 'ChestGroup is NOT create successly (svUploadChest) !'
                })
            }
        }
    })
})

router.patch('/TKSManagerPatchNoteOfChestGroupWhenCustom', 
    Authentication_TKS,
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

router.patch('/TKSManagerPatchChestGroup', 
    Authentication_TKS,
    ChestGroupRead,
    isReadyToCustom,
    (req, res) => {
    const uuid_chestGroup = req.body.uuid_chestGroup;
    const chestGroupOptions = req.body.chestGroupOptions;
    chestGroupCRUD.TKSManagerPatchChestGroup(uuid_chestGroup, chestGroupOptions, (chestGroup, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (chestGroup && chestGroup!==null) {
                return res.status(200).json({
                    chestGroup: chestGroup,
                    success: true,
                    message: 'ChestGroup is patch successly (svUploadChest) !'
                });
            } else {
                return res.status(200).json({
                    chestGroup: chestGroup,
                    success: false,
                    message: 'ChestGroup is NOT patch successly (svUploadChest) !'
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
    chestCRUD.TKSManagerCreate(chestOptions, (chest, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (chest && chest!==null) {
                return res.status(200).json({
                    chest: chest,
                    success: true,
                    message: 'Chest is create successly (svUploadChest) !'
                });
            } else {
                return res.status(200).json({
                    chest: chest,
                    success: false,
                    message: 'Chest is NOT create successly (svUploadChest) !'
                })
            }
        }
    })
})


module.exports = router;