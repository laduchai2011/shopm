'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const { serviceRedis } = require('./src/model/serviceRedis');
const { Authentication } = require('./src/auth/Authentication');
const { crudProvider } = require('./src/model/CRUDDATABASE/CRUDPROVIDER');
const { crudProviderAbout } = require('./src/model/CRUDDATABASE/CRUDPROVIDERABOUT');


router.post('/provider/create', Authentication, (req, res) => {
    const providerOptions = req.body;
    const decodedToken = req.decodedToken;
    providerOptions.uuid_user = decodedToken.data.uuid;
    crudProvider.create(providerOptions, (provider, err) => {
        if (err) return res.status(500).send(err);
        if (provider !== null) return res.status(201).json({
            provider: provider,
            exist: false,
            message: 'Signin provider successly !'
        });
        return res.status(205).json({
            providerOptions: providerOptions,
            provider: provider,
            exist: true,
            message: 'Signin provider NOT successly !'
        });
    })
})

router.post('/provider/about/create', Authentication, (req, res) => {
    const providerAboutOptionsArray = req.body;
    crudProviderAbout.bulkCreate(providerAboutOptionsArray, (providerAbout, err) => {
        if (err) return res.status(500).send(err);
        if (providerAbout !== null) return res.status(201).json({
            providerAbout: providerAbout,
            exist: false,
            message: 'Signin providerAbouts successly !'
        });
        return res.status(205).json({
            providerAbout: providerAbout,
            exist: true,
            message: 'Signin providerAbouts NOT successly !'
        });
    })
})

module.exports = router;