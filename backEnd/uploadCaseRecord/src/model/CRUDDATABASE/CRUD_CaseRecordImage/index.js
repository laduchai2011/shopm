'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*pageNumber: string,
*images: text,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordImageOptions
*/  

class CaseRecordImage {
    constructor() {
        this._CaseRecordImage = defineModel.getCaseRecordImage();
    }

    create(caseRecordImageOptions, callback) {
        let caseRecordImage;
        let err;
        
        const caseRecordImagePromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecordImage = await this._CaseRecordImage.create(caseRecordImageOptions, { transaction: t });
                        resolve(isCaseRecordImage);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        caseRecordImagePromise
        .then(isCaseRecordImage => {
            caseRecordImage = isCaseRecordImage;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecordImage, err);
        })
    }
}

const caseRecordImage = new CaseRecordImage();

module.exports = { caseRecordImage }