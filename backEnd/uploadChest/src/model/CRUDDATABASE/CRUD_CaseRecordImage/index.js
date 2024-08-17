'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*pageNumber: string,
*imageUrl: string,
*title: string,
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

    bulkCreate(caseRecordImageOptionsArray, callback) {
        let caseRecordImages;
        let err;
        
        const caseRecordImagePromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecordImages = await this._CaseRecordImage.bulkCreate(caseRecordImageOptionsArray, { transaction: t });
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
            caseRecordImages = isCaseRecordImages;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecordImages, err);
        })
    }

    // updateWithCaseRecord(uuid_caseRecordImage, images, callback) {
    //     let caseRecordImage;
    //     let err;
        
    //     const caseRecordImagePromise = new Promise((resolve, reject) => {
    //         try {
    //             sequelize.transaction(async (t) => {
    //                 try {
    //                     const isCaseRecordImage = await this._CaseRecordImage.findByPk(
    //                         uuid_caseRecordImage,
    //                         {
    //                             where: {
    //                                 [Op.not]: {
    //                                     [Op.or]: [
    //                                         { status: 'complete' },
    //                                         { status: 'delete' }
    //                                     ]
    //                                 }
    //                             }
    //                         },
    //                         { lock: true, transaction: t },
    //                     );
    //                     isCaseRecordImage.images = images;
    //                     isCaseRecordImage.status = 'edit';
    //                     await isCaseRecordImage.save({ transaction:t });
    //                     resolve(isCaseRecordImage);   
    //                 } catch (error) {
    //                     reject(error);
    //                 }
    //             });
    //         } catch (error) {
    //             reject(error);
    //         }
    //     });

    //     caseRecordImagePromise
    //     .then(isCaseRecordImage => {
    //         caseRecordImage = isCaseRecordImage;
    //     }).catch(error => {
    //         err = error;
    //     }).finally(() => {
    //         callback(caseRecordImage, err);
    //     })
    // }

    updateImageTitleWithCaseRecord(uuid_caseRecordImage, title, callback) {
        let caseRecordImage;
        let err;
        
        const caseRecordImagePromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecordImage = await this._CaseRecordImage.findByPk(
                            uuid_caseRecordImage,
                            {
                                where: {
                                    [Op.not]: {
                                        [Op.or]: [
                                            { status: 'complete' },
                                            { status: 'delete' }
                                        ]
                                    }
                                }
                            },
                            { lock: true, transaction: t },
                        );
                        isCaseRecordImage.title = title;
                        await isCaseRecordImage.save({ transaction:t });
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

    deleteWithCaseRecord(uuid_caseRecordImage, callback) {
        let caseRecordImage;
        let err;
        
        const caseRecordImagePromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecordImage = await this._CaseRecordImage.findByPk(
                            uuid_caseRecordImage,
                            {
                                where: {
                                    [Op.not]: {
                                        [Op.or]: [
                                            { status: 'complete' },
                                            { status: 'delete' }
                                        ]
                                    }
                                }
                            },
                            { lock: true, transaction: t },
                        );
                        isCaseRecordImage.status = 'delete';
                        await isCaseRecordImage.save({ transaction:t });
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

    complete(uuid_caseRecordImage, callback) {
        let caseRecordImage;
        let err;
        
        const caseRecordImagePromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecordImage = await this._CaseRecordImage.findByPk(
                            uuid_caseRecordImage,
                            {
                                where: {
                                    [Op.not]: {
                                        [Op.or]: [
                                            { status: 'notComplete' },
                                            { status: 'delete' }
                                        ]
                                    }
                                }
                            },
                            { lock: true, transaction: t },
                        );
                        isCaseRecordImage.status = 'completed';
                        await isCaseRecordImage.save({ transaction:t });
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

const caseRecordImageCRUD = new CaseRecordImage();

module.exports = { caseRecordImageCRUD }