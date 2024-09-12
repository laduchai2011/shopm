'use strict';
const { chestGroupCRUD } = require('../../model/CRUDDATABASE/CRUD_ChestGroup');
const { logEvents } = require('../../../logEvents');

function ChestGroupRead(req, res, next) {
    const uuid_chestGroup = req.body.uuid_chestGroup;

    chestGroupCRUD(uuid_chestGroup, (chestGroup, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (chestGroup && chestGroup!==null) {
                req.chestGroupMid = chestGroup;
                next();
            } else {
                return res.status(200).json({
                    chestGroup: chestGroup,
                    success: false,
                    message: 'ChestGroup is NOT read successly !'
                })
            }
        }
    })
}

module.exports = { ChestGroupRead }