'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

const { medicationCRUD } = require('./src/model/CRUDDATABASE/CRUD_Medication');
const { isProvider } = require('./src/middle/isProvider');
const { Authentication } = require('./src/auth/Authentication');
const { logEvents } = require('./logEvents');


router.post('/provider/createMedication', 
    Authentication, 
    isProvider,
    (req, res) => {
    const createMedicationOptions = req.body.createMedicationOptions; 
    medicationCRUD.create(createMedicationOptions, (medication, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            console.log(err)
            return res.status(500).send(err);
        } else {
            if (medication && medication!==null) {
                return res.status(200).json({
                    medication: medication,
                    success: true,
                    message: 'Medication is create successly !'
                });
            } else {
                return res.status(200).json({
                    medication: medication,
                    success: false,
                    message: 'Medication is NOT create successly !'
                })
            }
        }
    })
})

router.patch('/provider/medication/patch', Authentication, (req, res) => {
    const decodedToken = req.decodedToken;
    const uuid_user = decodedToken.data.uuid;
    const medicateOptions = req.body;
    const medicateOptionsPatch = medicateOptions.medicateOptionsPatch;
    
    crudProvider.isProvider(medicateOptions.uuid_provider, uuid_user, (provider, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (provider === null) return res.status(200).json({
                provider: provider,
                exist: false,
                success: false,
                message: 'There are not this provider in your list!'
            });
    
            medicationCRUD.update(medicateOptions.uuid_medication, medicateOptionsPatch, (medication, err) => {
                if (err) {
                    logEvents(`${req.url}---${req.method}---${err}`);
                    return res.status(500).send(err);
                } else {
                    if (medication === null) return res.status(200).json({
                        medication: medication,
                        exist: false,
                        success: false,
                        message: 'Medication is not exist !'
                    });
        
                    return res.status(200).json({
                        medication: medication,
                        exist: true,
                        success: true,
                        message: 'Medication is update patch successly !'
                    });
                }
            })
        }
    })
})

module.exports = router;