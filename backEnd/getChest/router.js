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
const { chestCRUD } = require('./src/model/CRUDDATABASE/CRUD_Chest');

// const { ChestGroupRead } = require('./src/middle/ChestGroupRead');
// const { 
//     isReadyToCustom,
//     handleDataWithStatusTKS
// } = require('./src/middle/ChestGroupRole');

const { isMyProvider } = require('./src/middle/isMyProvider');
const { get__All__Uuid_departmentGroup } = require('./src/middle/getUuidDepartmentGroup');
// const { get__All__Uuid_department } = require('./src/middle/getUuidDepartment');
const { get__All__Uuid_chest } = require('./src/middle/getUuidChest');


const service = process.env.SERVICE;


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
                    message: `ChestGroup is read successly (${service}) !`
                });
            } else {
                return res.status(200).json({
                    chestGroup: chestGroup,
                    success: false,
                    message: `ChestGroup is NOT read successly (${service}) !`
                })
            }
        }
    })
})

router.get('/TKSManagerGetChestGroup', 
    Authentication,
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
                    message: `ChestGroup is read successly (${service}) !`
                });
            } else {
                return res.status(200).json({
                    chestGroup: chestGroup,
                    success: false,
                    message: `ChestGroup is NOT read successly (${service}) !`
                })
            }
        }
    })
})

router.get('/SellingGetChestList', 
    Authentication,
    isMyProvider,
    get__All__Uuid_departmentGroup,
    // get__All__Uuid_department,
    get__All__Uuid_chest,
    (req, res) => {
    const pageIndex = req.query.pageIndex;
    const pageSize = req.query.pageSize;
    const all_uuid_chest = req.all_uuid_chest;
    const all_uuid_chest_sq = [];
    for (let i = 0; i < all_uuid_chest.length; i++) {
        const uuid_chest__ = {uuid_chest: all_uuid_chest[i]};
        all_uuid_chest_sq.push(uuid_chest__);
    }
    chestCRUD.sellingRead(all_uuid_chest_sq, Number(pageIndex), Number(pageSize), (chestList, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (chestList && chestList!==null) {
                return res.status(200).json({
                    chestList: chestList,
                    success: true,
                    message: `Chest list is read successly (${service}) !`
                });
            } else {
                return res.status(200).json({
                    chestList: chestList,
                    success: false,
                    message: `Chest list is NOT read successly (${service}) !`
                })
            }
        }
    })
})

module.exports = router;