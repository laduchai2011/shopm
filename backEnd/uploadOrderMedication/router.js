'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

// const { orderAllMedication } = require('./src/model/CRUDDATABASE/CRUDORDERALLMEDICATION');
const { serviceRedis } = require('./src/model/serviceRedis');
const { Authentication } = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');
const { orderFinalMedication } = require('./src/middle/orderFinalMedication');


/**
*@typedef {
*uuid_caseRecord: string,
*pageNumber: string,
*} currentCartOptions
*/ 

router.post('/orderMedication/create', Authentication, (req, res) => {
    const orderFinalMedicationOptions = req.body;
    const userOptions = req.decodedToken.data;
    // console.log(orderFinalMedicationOptions)
    orderFinalMedication(userOptions.uuid, orderFinalMedicationOptions, (data, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            return res.status(200).json(data)
        }
    })
})

router.patch('/patchCurrentCart', Authentication, async (req, res) => {
    const uuid_caseRecord = req.body.uuid_caseRecord;
    const pageNumber = req.body.pageNumber;
    const userOptions = req.decodedToken.data;
    const currentCartKey = `currentCart-${userOptions.uuid}`;
    const timeExpireat = 60*60*24*30*12; // 1 year
    const currentCart_in = {
        uuid_caseRecord: uuid_caseRecord,
        pageNumber: pageNumber.toString()
    }

    const isSetData = await serviceRedis.setData(currentCartKey, currentCart_in, timeExpireat);

    console.log(333333333, isSetData)
    if (isSetData) {
        return res.status(200).send({
            message: 'patchCurrentCart success',
            success: true
        })
    }
     
    return res.status(200).send({
        message: 'patchCurrentCart NOT success',
        success: false
    })
})

router.delete('/deleteCurrentCart', Authentication, async (req, res) => {
    const userOptions = req.decodedToken.data;
    const currentCartKey = `currentCart-${userOptions.uuid}`;
    const isDeleteKey = await serviceRedis.deleteData(currentCartKey);
    if (isDeleteKey) {
        return res.send({
            message: 'deleteCurrentCart successly',
            success: true
        })
    } else {
        return res.send({
            message: 'deleteCurrentCart NOT successly',
            success: false
        })
    }
})

module.exports = router;