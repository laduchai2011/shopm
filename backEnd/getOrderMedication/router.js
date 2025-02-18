'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

// const { crudMedication } = require('./src/model/CRUDDATABASE/CRUDMEDICATION');
// const { crudProvider } = require('./src/model/CRUDDATABASE/CRUDPROVIDER');
const { serviceRedis } = require('./src/model/serviceRedis');
const { Authentication_SHOPM } = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');
// const { patientRole } = require('./src/middle/patientRole');
const { doctorOrPharmacistAndPatientRole } = require('./src/middle/doctorOrPharmacistAndPatientRole');
// const { orderMedicationCRUD } = require('./src/model/CRUDDATABASE/CRUD_OrderMedication');
// const { historyCRUD } = require('./src/model/CRUDDATABASE/CRUD_History');
// const { transportCRUD } = require('./src/model/CRUDDATABASE/CRUD_Transport');
// const { paymentMedicationCRUD } = require('./src/model/CRUDDATABASE/CRUD_PaymentMedication');

/**
*@typedef {
*uuid_caseRecord: string,
*pageNumber: string,
*} currentCartOptions
*/ 


router.get('/orderMedication/readWithUuid', 
    Authentication_SHOPM, 
    (req, res) => {
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

router.get('/orderMedication/getListFromProfile', 
    Authentication_SHOPM, 
    (req, res) => {
    const uuid_user = req.query.uuid_user;
    const pageIndex = req.query.pageIndex;
    const pageSize = req.query.pageSize;
    orderMedicationCRUD.bulkReadWithFkUser(uuid_user, Number(pageIndex), Number(pageSize), (orderMedications, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (orderMedications && orderMedications!==null) {
                return res.status(200).json({ 
                    orderMedications: orderMedications,
                    message: "getListFromProfile successly !",
                    success: true
                })
            }
            return res.status(200).json({ 
                message: "getListFromProfile NOT successly !",
                success: false
            })
        }
    })
})

router.get('/orderMedication/readHistoriesWithFK', 
    Authentication_SHOPM, 
    (req, res) => {
    // const uuid_orderMedication = req.query.uuid_orderMedication;
    // historyCRUD.realAll(uuid_orderMedication, (historyOptionsList, err) => {
    //     if (err) {
    //         logEvents(`${req.url}---${req.method}---${err}`);
    //         return res.status(500).send(err);
    //     } else {
    //         if (historyOptionsList && historyOptionsList!==null) {
    //             return res.status(200).json({ 
    //                 historyOptionsList: historyOptionsList,
    //                 message: "readHistoriesWithFK successly !",
    //                 success: true
    //             })
    //         }
    //         return res.status(200).json({ 
    //             historyOptionsList: historyOptionsList,
    //             message: "readHistoriesWithFK NOT successly !",
    //             success: false
    //         })
    //     }
    // })
})

router.get('/orderMedication/readWithCaseRecord', 
    Authentication_SHOPM, 
    doctorOrPharmacistAndPatientRole, 
    (req, res) => {
    // const pageNumber = req.query.pageNumber;
    // const uuid_caseRecord = req.query.uuid_caseRecord;
    // orderMedicationCRUD.readWithCaseRecord(uuid_caseRecord, pageNumber, (orderMedication, err) => {
    //     if (err) {
    //         logEvents(`${req.url}---${req.method}---${err}`);
    //         return res.status(500).send(err);
    //     } else {
    //         if (orderMedication && orderMedication!==null) {
    //             return res.status(200).json({ 
    //                 orderMedication: orderMedication,
    //                 message: "readWithCaseRecord successly !",
    //                 success: true
    //             })
    //         }
    //         return res.status(200).json({ 
    //             orderMedication: orderMedication,
    //             message: "readWithCaseRecord NOT successly !",
    //             success: false
    //         })
    //     }
    // })
})

router.get('/orderMedication/getTransportWithFk', 
    Authentication_SHOPM, 
    (req, res) => {
    // const uuid_orderMedication = req.query.uuid_orderMedication;
    // transportCRUD.readWithFk(uuid_orderMedication, (transport, err) => {
    //     if (err) {
    //         logEvents(`${req.url}---${req.method}---${err}`);
    //         return res.status(500).send(err);
    //     } else {
    //         if (transport && transport!==null) {
    //             return res.status(200).json({ 
    //                 transport: transport,
    //                 message: "getTransportWithFk successly !",
    //                 success: true
    //             })
    //         }
    //         return res.status(200).json({ 
    //             transport: transport,
    //             message: "getTransportWithFk NOT successly !",
    //             success: false
    //         })
    //     }
    // })
})

router.get('/orderMedication/getPaymentMedicationtWithFk', 
    Authentication_SHOPM, 
    (req, res) => {
    // const uuid_orderMedication = req.query.uuid_orderMedication;
    // paymentMedicationCRUD.readWithFk(uuid_orderMedication, (paymentMedication, err) => {
    //     if (err) {
    //         logEvents(`${req.url}---${req.method}---${err}`);
    //         return res.status(500).send(err);
    //     } else {
    //         if (paymentMedication && paymentMedication!==null) {
    //             return res.status(200).json({ 
    //                 paymentMedication: paymentMedication,
    //                 message: "getPaymentMedicationtWithFk successly !",
    //                 success: true
    //             })
    //         }
    //         return res.status(200).json({ 
    //             paymentMedication: paymentMedication,
    //             message: "getPaymentMedicationtWithFk NOT successly !",
    //             success: false
    //         })
    //     }
    // })
})

router.get('/getCurrentCart', 
    Authentication_SHOPM, 
    (req, res) => {
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

router.get('/SHOPM_get_OrderGroup_In_CurrentSelected', 
    Authentication_SHOPM, 
    (req, res) => {
    const userOptions = req.decodedToken.data;
    const currentCartKey = `get_OrderGroup_In_CurrentSelected-${userOptions.uuid}`;
    serviceRedis.getData(currentCartKey, (orderGroup_In_CurrentSelected) => {
        if (orderGroup_In_CurrentSelected && orderGroup_In_CurrentSelected!==null) {
            return res.status(200).send({
                orderGroup_In_CurrentSelected: orderGroup_In_CurrentSelected,
                message: 'get_OrderGroup_In_CurrentSelected success',
                success: true
            })
        } else {
            return res.status(200).send({
                orderGroup_In_CurrentSelected: orderGroup_In_CurrentSelected,
                message: 'get_OrderGroup_In_CurrentSelected NOT success',
                success: false
            })
        }
    })
})


module.exports = router;