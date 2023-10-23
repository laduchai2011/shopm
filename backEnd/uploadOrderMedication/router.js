'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

// const { orderAllMedication } = require('./src/model/CRUDDATABASE/CRUDORDERALLMEDICATION');
// const { serviceRedis } = require('./src/model/serviceRedis');
const { Authentication } = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');
const { orderFinalMedication } = require('./src/middle/orderFinalMedication');


router.post('/orderMedication/create', Authentication, (req, res) => {
    const orderFinalMedicationOptions = req.body;
    const userOptions = req.decodedToken.data;
    console.log(orderFinalMedicationOptions)
    orderFinalMedication(userOptions.uuid, orderFinalMedicationOptions, (data, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            return res.status(200).json(data)
        }
    })
})

router.post('/orderMedication/createCart', Authentication, (req, res) => {

})


module.exports = router;