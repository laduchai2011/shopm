'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*pageNumber: string,
*videos: text,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordVideoOptions
*/  

class CaseRecordVideo {
    constructor() {
        this._CaseRecordVideo = defineModel.getCaseRecordVideo();
    }

    create(caseRecordVideoOptions, callback) {
        let caseRecordVideo;
        let err;
        
        const caseRecordVideoPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecordVideo = await this._CaseRecordVideo.create(caseRecordVideoOptions, { transaction: t });
                        resolve(isCaseRecordVideo);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        caseRecordVideoPromise
        .then(isCaseRecordVideo => {
            caseRecordVideo = isCaseRecordVideo;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecordVideo, err);
        })
    }
}

const caseRecordVideo = new CaseRecordVideo();

module.exports = { caseRecordVideo }