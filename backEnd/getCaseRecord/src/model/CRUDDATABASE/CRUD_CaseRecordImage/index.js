'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*pageNumber: string,
*image: string,
*title: string,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordImageOptions
*/  

class CaseRecordImage {
    constructor() {
        this._CaseRecordImage = defineModel.getCaseRecordImage();
    }

    readWithFk(uuid_caseRecord, pageNumber, callback) {
        let caseRecordImage;
        let err;
        
        const caseRecordImagePromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecordImage = await this._CaseRecordImage.findOne({
                            where: {
                                pageNumber: pageNumber,
                                uuid_caseRecord: uuid_caseRecord,
                            }
                        }, { transaction: t });
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

    readAllWithFk(uuid_caseRecord, pageNumber, callback) {
        let caseRecordImageAll;
        let err;
        
        const caseRecordImagePromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecordImages = await this._CaseRecordImage.findAll({
                            where: {
                                uuid_caseRecord: uuid_caseRecord,
                                pageNumber: pageNumber,
                                [Op.not]: { status: 'delete' }
                            }
                        }, { transaction: t });
                        resolve(isCaseRecordImages);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        caseRecordImagePromise
        .then(isCaseRecordImages => {
            caseRecordImageAll = isCaseRecordImages;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecordImageAll, err);
        })
    }
}

const caseRecordImageCRUD = new CaseRecordImage();

module.exports = { caseRecordImageCRUD }