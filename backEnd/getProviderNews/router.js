'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

const { crudProvider } = require('./src/model/CRUDDATABASE/CRUDPROVIDER');
const { crudProviderNews } = require('./src/model/CRUDDATABASE/CRUDPROVIDERNEWS');
// const { serviceRedis } = require('./src/model/serviceRedis');
const { Authentication } = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');


router.get('/provider/news/list', (req, res) => {
    const uuid_provider = req.query.uuid_provider;
    const pageIndex = req.query.pageIndex;
    const pageSize = req.query.pageSize;

    crudProviderNews.bulkReadFilter_provider(uuid_provider, Number(pageIndex), Number(pageSize), (providerNews, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (uuid_provider === null) return res.status(200).json({
                providerNews: values[1],
                exist: false,
                success: false,
                message: 'There are not providerNews registed yet !'
            });
            return res.status(200).json({
                providerNews: providerNews,
                exist: true,
                success: true,
                message: 'Get successly providerNews (it is a array) !'
            });
        }
    });
});


module.exports = router;