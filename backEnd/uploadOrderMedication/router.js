'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

const { orderMedicationCRUD } = require('./src/model/CRUDDATABASE/CRUD_OrderMedication');
// const { historyCRUD } = require('./src/model/CRUDDATABASE/CRUD_History');
// const { transportCRUD } = require('./src/model/CRUDDATABASE/CRUD_Transport');
// const { paymentMedicationCRUD } = require('./src/model/CRUDDATABASE/CRUD_PaymentMedication');
// const { medicationsOfOrderMyselfCRUD } = require('./src/model/CRUDDATABASE/CRUD_MedicationsOfOrderMyself');
const { serviceRedis } = require('./src/model/serviceRedis');
const { Authentication_SHOPM } = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');
// const { orderFinalMedication } = require('./src/middle/orderFinalMedication');
const { patientRole } = require('./src/middle/patientRole');
const { getCaseRecordMid } = require('./src/middle/getDatabaseMid');
const { isCurrentPage } = require('./src/middle/checkCurrentPage');
const { isCompleted } = require('./src/middle/checkComplete');
const { isOrderMedicationWithCaseRecord } = require('./src/middle/checkOrderMedication');
const { bulkUpdateSold } = require('./src/middle/updateMedication');


/**
*@typedef {
*uuid_caseRecord: string,
*pageNumber: string,
*} currentCartOptions
*/ 

router.post('/orderMedication/create', 
    Authentication_SHOPM, 
    (req, res) => {
    const orderFinalMedicationOptions = req.body;
    const userOptions = req.decodedToken.data;
    // console.log(orderFinalMedicationOptions)
    // orderFinalMedication(userOptions.uuid, orderFinalMedicationOptions, (data, err) => {
    //     if (err) {
    //         logEvents(`${req.url}---${req.method}---${err}`);
    //         return res.status(500).send(err);
    //     } else {
    //         return res.status(200).json(data)
    //     }
    // })
})

router.post('/orderMedication/createWithCaseRecord', 
    Authentication_SHOPM, 
    getCaseRecordMid,
    patientRole, 
    isCurrentPage,
    isCompleted,
    isOrderMedicationWithCaseRecord, 
    bulkUpdateSold,
    (req, res) => {
    const orderMedicationOptions = req.body.orderMedicationOptions;
    const uuid_caseRecord = req.body.uuid_caseRecord;
    const userOptions = req.decodedToken.data;
    orderMedicationOptions.uuid_user = userOptions.uuid;
    orderMedicationOptions.type = 'caseRecord';
    orderMedicationOptions.uuid_caseRecord = uuid_caseRecord;
    orderMedicationOptions.status = 'normal';

    orderMedicationCRUD.createWithCaseRecord(orderMedicationOptions, (orderMedication, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            return res.status(200).json({ 
                orderMedication: orderMedication,
                message: "createWithCaseRecord successly !",
                success: true
            })
        }
    })
})

router.patch('/patchCurrentCart', 
    Authentication_SHOPM, 
    async (req, res) => {
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

router.delete('/deleteCurrentCart', 
    Authentication_SHOPM, 
    async (req, res) => {
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