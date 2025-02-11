'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

const { medicationCRUD } = require('./src/model/CRUDDATABASE/CRUD_Medication');
const { medicationImageCRUD } = require('./src/model/CRUDDATABASE/CRUD_MedicationImage');
// const { crudProvider } = require('./src/model/CRUDDATABASE/CRUDPROVIDER');
// const { serviceRedis } = require('./src/model/serviceRedis');
const { logEvents } = require('./logEvents');
const { Authentication_SHOPM } = require('./src/auth/Authentication');
const { Authorization } = require('./src/auth/Authorization');
const { isMyProvider } = require('./src/middle/checkMedication');

const service = process.env.SERVICE;


router.get('/provider/medicationManager/list', 
    Authentication_SHOPM, 
    Authorization, 
    (req, res) => {
    const uuid_provider = req.query.uuid_provider;
    const pageIndex = req.query.pageIndex;
    const pageSize = req.query.pageSize;
    
    medicationCRUD.bulkReadFilter_provider(uuid_provider, Number(pageIndex), Number(pageSize), (medications, err) => {
        if (err) {
            logEvents(`(${service}) ${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (medications === null) return res.status(200).json({
                medications: medications,
                exist: false,
                success: false,
                message: `There are not medications registed yet (${service}) !`
            });
            return res.status(200).json({
                medications: medications,
                exist: true,
                success: true,
                message: `Get successly medications (it is a array) (${service}) !`
            });
        }
    })
})

router.get('/provider/medication/list', 
    (req, res) => {
    const uuid_provider = req.query.uuid_provider;
    const pageIndex = req.query.pageIndex;
    const pageSize = req.query.pageSize;
    
    medicationCRUD.bulkReadFilter_provider(uuid_provider, Number(pageIndex), Number(pageSize), (medications, err) => {
        if (err) {
            logEvents(`(${service}) ${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (medications === null) return res.status(200).json({
                medications: medications,
                exist: false,
                success: false,
                message: `There are not medications registed yet (${service}) !`
            });
            return res.status(200).json({
                medications: medications,
                exist: true,
                success: true,
                message: `Get successly medications (it is a array) (${service}) !`
            });
        }
    })
})

router.get('/home/medication/list', 
    (req, res) => {
    const pageIndex = req.query.pageIndex;
    const pageSize = req.query.pageSize;
    
    medicationCRUD.bulkReadFilter_home(Number(pageIndex), Number(pageSize), (medications, err) => {
        if (err) {
            logEvents(`(${service}) ${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (medications === null) return res.status(200).json({
                medications: medications,
                exist: false,
                success: false,
                message: `There are not medications registed yet (${service}) !`
            });
            return res.status(200).json({
                medications: medications,
                exist: true,
                success: true,
                message: `Get successly medications (it is a array) (${service}) !`
            });
        }
    })
})

router.get('/medication/:id', 
    (req, res) => {
    const uuid_medication = req.params.id;
    
    medicationCRUD.readWithUid(uuid_medication, (medication, err) => {
        if (err) {
            logEvents(`(${service}) ${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (medication === null) return res.status(200).json({
                medication: medication,
                exist: false,
                success: false,
                message: `There are not medication registed yet (${service}) !`
            });
            return res.status(200).json({
                medication: medication,
                exist: true,
                success: true,
                message: `Get successly medication (${service}) !`
            });
        }
    })
})

router.get('/medicationImage/list', 
    (req, res) => {
    const uuid_medication = req.query.uuid_medication;
    
    medicationImageCRUD.bulkReadFromMedication(uuid_medication, (medicationImages, err) => {
        if (err) {
            logEvents(`(${service}) ${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (medicationImages && medicationImages!==null) {
                return res.status(200).json({
                    medicationImages: medicationImages,
                    success: true,
                    message: `Get successly medicationImages (${service}) !`
                });
            } else {
                return res.status(200).json({
                    medicationImages: medicationImages,
                    success: false,
                    message: `There are not medicationImages registed yet (${service}) !`
                });
            }
        }
    })
})

router.get('/sreenCreateDepartmentRequireReadAllMedicationWithFK', 
    Authentication_SHOPM,
    isMyProvider,
    (req, res) => {
    const uuid_provider = req.query.uuid_provider;

    medicationCRUD.sreenCreateDepartmentRequireReadAllMedicationWithFK(uuid_provider, (allMedications, err) => {
        if (err) {
            logEvents(`(${service}) ${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (allMedications && allMedications!==null) {
                return res.status(200).json({
                    allMedications: allMedications,
                    success: true,
                    message: `Get successly allMedications !`
                });
            } else {
                return res.status(200).json({
                    allMedications: allMedications,
                    success: false,
                    message: `There are not allMedications registed yet !`
                });
            }
        }
    })
})


module.exports = router;