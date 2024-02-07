'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

// const { crudMedication } = require('./src/model/CRUDDATABASE/CRUDMEDICATION');
// const { crudProvider } = require('./src/model/CRUDDATABASE/CRUDPROVIDER');
const { serviceRedis } = require('./src/model/serviceRedis');
const { Authentication } = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');
// const { patientRole } = require('./src/middle/patientRole');
const { doctorOrPharmacistAndPatientRole } = require('./src/middle/doctorOrPharmacistAndPatientRole');
const { orderMedicationCRUD } = require('./src/model/CRUDDATABASE/CRUD_OrderMedication');
const { historyCRUD } = require('./src/model/CRUDDATABASE/CRUD_History');

/**
*@typedef {
*uuid_caseRecord: string,
*pageNumber: string,
*} currentCartOptions
*/ 


router.get('/orderMedication/readWithUuid', Authentication, (req, res) => {
    const uuid_orderMedication = req.query.uuid_orderMedication;
    orderMedicationCRUD.readWithUuid(uuid_orderMedication, (orderMedication, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (orderMedication && orderMedication!==null) {
                return res.status(200).json({ 
                    orderMedication: orderMedication,
                    message: "readWithUuid successly !",
                    success: true
                })
            }
            return res.status(200).json({ 
                orderMedication: orderMedication,
                message: "readWithUuid NOT successly !",
                success: false
            })
        }
    })
})

router.get('/orderMedication/readHistoriesWithFK', Authentication, (req, res) => {
    const uuid_orderMedication = req.query.uuid_orderMedication;
    historyCRUD.realAll(uuid_orderMedication, (historyOptionsList, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (historyOptionsList && historyOptionsList!==null) {
                return res.status(200).json({ 
                    historyOptionsList: historyOptionsList,
                    message: "readHistoriesWithFK successly !",
                    success: true
                })
            }
            return res.status(200).json({ 
                historyOptionsList: historyOptionsList,
                message: "readHistoriesWithFK NOT successly !",
                success: false
            })
        }
    })
})

router.get('/orderMedication/readWithCaseRecord', Authentication, doctorOrPharmacistAndPatientRole, (req, res) => {
    const pageNumber = req.query.pageNumber;
    const uuid_caseRecord = req.query.uuid_caseRecord;
    orderMedicationCRUD.readWithCaseRecord(uuid_caseRecord, pageNumber, (orderMedication, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (orderMedication && orderMedication!==null) {
                return res.status(200).json({ 
                    orderMedication: orderMedication,
                    message: "readWithCaseRecord successly !",
                    success: true
                })
            }
            return res.status(200).json({ 
                orderMedication: orderMedication,
                message: "readWithCaseRecord NOT successly !",
                success: false
            })
        }
    })
})

router.get('/getCurrentCart', Authentication, (req, res) => {
    const userOptions = req.decodedToken.data;
    const currentCartKey = `currentCart-${userOptions.uuid}`;
    serviceRedis.getData(currentCartKey, (currentCart) => {
        if (currentCart && currentCart!==null) {
            return res.status(200).send({
                currentCart: currentCart,
                message: 'getCurrentCart success',
                success: true
            })
        } else {
            return res.status(200).send({
                currentCart: currentCart,
                message: 'getCurrentCart NOT success',
                success: false
            })
        }
    })
})


module.exports = router;