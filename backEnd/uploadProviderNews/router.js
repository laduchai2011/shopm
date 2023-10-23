'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

const { crudProvider } = require('./src/model/CRUDDATABASE/CRUDPROVIDER');
const { crudProviderNews } = require('./src/model/CRUDDATABASE/CRUDPROVIDERNEWS');
// const { serviceRedis } = require('./src/model/serviceRedis');
const { logEvents } = require('./logEvents');
const { Authentication } = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');


router.post('/provider/news/add', Authentication, (req, res) => {
    const decodedToken = req.decodedToken;
    const uuid_user = decodedToken.data.uuid;
    const providerNewsBody = req.body;
    const providerNewsOptions = providerNewsBody.providerNewsOptions;
    
    crudProvider.isProvider(providerNewsBody.uuid_provider, uuid_user, (provider, err) => {
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
    
            crudProviderNews.create(providerNewsOptions, (providerNews, err) => {
                if (err) {
                    logEvents(`${req.url}---${req.method}---${err}`);
                    return res.status(500).send(err);
                } else {
                    if (providerNews === null) return res.status(200).json({
                        providerNews: providerNews,
                        exist: false,
                        success: false,
                        message: 'ProviderNews is created not successly !'
                    });
        
                    return res.status(200).json({
                        providerNews: providerNews,
                        exist: true,
                        success: true,
                        message: 'ProviderNews is created successly !'
                    });
                }
            })
        }
    })
});


module.exports = router;