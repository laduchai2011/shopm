const { Op, where } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*title: string,
*priceTotal: integer,
*pageTotal: integer,
*currentPage: string,
*report: text,
*status: string,
*uuid_doctorOrPharmacist: uuid,
*uuid_user: uuid
*} caseRecordOptions
*/ 

/**
*@typedef {
*pageNumber: string,
*description: text,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordDescriptionOptions
*/  

/**
*@typedef {
*pageNumber: string,
*imageUrl: string,
*title: string,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordImageOptions
*/  

/**
*@typedef {
*pageNumber: string,
*videos: text,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordVideoOptions
*/  

/**
*@typedef {
*pageNumber: string,
*prescription: text,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordPrescriptionOptions
*/  

/**
*@typedef {
*pageNumber: string,
*name: string,
*amount: INTEGER.UNSIGNED,
*note: text,
*price: INTEGER.UNSIGNED,
*discount: FLOAT,
*cost: INTEGER.UNSIGNED,
*status: string,
*uuid_caseRecord: uuid,
*uuid_medication: uuid
*} caseRecordMedicationOptions
*/ 
    

class CaseRecord {
    constructor() {
        this._CaseRecord = defineModel.getCaseRecord();
        this._CaseRecordDescription = defineModel.getCaseRecordDescription();
        this._CaseRecordImage = defineModel.getCaseRecordImage();
        this._CaseRecordVideo = defineModel.getCaseRecordVideo();
        this._CaseRecordPrescription = defineModel.getCaseRecordPrescription();
        this._CaseRecordMedication = defineModel.getCaseRecordMedication();
    }

    read(uuid_caseRecord, callback) {
        let caseRecord;
        let err;
        
        const caseRecordPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecord = await this._CaseRecord.findByPk(
                            uuid_caseRecord, 
                            {
                                where: {
                                    status: 'delete'
                                }
                            },
                            { transaction: t }
                        );
                        resolve(isCaseRecord);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        caseRecordPromise
        .then(isCaseRecord => {
            caseRecord = isCaseRecord;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecord, err);
        })
    }

    create(createCaseRecordOptions, callback) {
        let caseRecord;
        let err;
        
        // const caseRecordPromise = new Promise((resolve, reject) => {
        //     try {
        //         sequelize.transaction(async (t) => {
        //             try {
        //                 const newCaseRecord = await this._CaseRecord.create(caseRecordOptions, { transaction: t });
        //                 resolve(newCaseRecord);   
        //             } catch (error) {
        //                 reject(error);
        //             }
        //         });
        //     } catch (error) {
        //         reject(error);
        //     }
        // });

        // caseRecordPromise
        // .then(newCaseRecord => {
        //     caseRecord = newCaseRecord;
        // }).catch(error => {
        //     err = error;
        // }).finally(() => {
        //     callback(caseRecord, err);
        // })

        const caseRecordPromise = new Promise(async (resolve, reject) => {
            const caseRecord_t = await sequelize.transaction();
            try {
                const newCaseRecord_m = await this._CaseRecord.create(createCaseRecordOptions.caseRecordOptions, { transaction: caseRecord_t });

                const newCaseRecord = newCaseRecord_m.dataValues;

                const caseRecordMedicationOptionsArray = orderMedicationFromCaseRecordOptions.caseRecordMedicationOptionsArray;
                for (let i = 0; i < caseRecordMedicationOptionsArray.length; i++) {
                    caseRecordMedicationOptionsArray[i].uuid_orderMedication = newOrderMedication.uuid_orderMedication;
                }
                const newOrderMedicationMedication = await this._CaseRecordMedication.bulkBuild(caseRecordMedicationOptionsArray, { transaction: caseRecord_t });

                const caseRecordDescriptionOptions = createCaseRecordOptions.caseRecordDescriptionOptions;
                caseRecordDescriptionOptions.uuid_caseRecord = newCaseRecord.uuid_caseRecord;
                const newCaseRecordDescription = await this._CaseRecordDescription.create(caseRecordDescriptionOptions, { transaction: caseRecord_t });

                const caseRecordImageOptionsArray = createCaseRecordOptions.caseRecordImageOptionsArray;
                for (let i = 0; i < caseRecordImageOptionsArray.length; i++) {
                    caseRecordImageOptionsArray[i].uuid_caseRecord = newCaseRecord.uuid_caseRecord;
                }
                const newCaseRecordImageArray = await this._CaseRecordImage.bulkBuild(caseRecordImageOptionsArray, { transaction: caseRecord_t });

                const caseRecordVideoOptionsArray = createCaseRecordOptions.caseRecordVideoOptionsArray;
                for (let i = 0; i < caseRecordVideoOptionsArray.length; i++) {
                    caseRecordVideoOptionsArray[i].uuid_caseRecord = newCaseRecord.uuid_caseRecord;
                }
                const newCaseRecordVideoArray = await this._CaseRecordVideo.bulkBuild(caseRecordVideoOptionsArray, { transaction: caseRecord_t });

                const caseRecordPrescriptionOptions = createCaseRecordOptions.caseRecordPrescriptionOptions;
                caseRecordPrescriptionOptions.uuid_caseRecord = newCaseRecord.uuid_caseRecord;
                const newCaseRecordPrescription = await this._CaseRecordPrescription.create(caseRecordPrescriptionOptions, { transaction: caseRecord_t });
                
                await caseRecord_t.commit();

                resolve(newCaseRecord); 
            } catch (error) {
                await caseRecord_t.rollback();
                reject(error);
            }
        })

        caseRecordPromise
        .then(newCaseRecord => {
            caseRecord = newCaseRecord;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecord, err);
        })
    }

    patchStatusCRC(uuid_caseRecord, callback) {
        let caseRecord;
        let err;
        
        const caseRecordPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecord = await this._CaseRecord.findByPk(
                            uuid_caseRecord,
                            {
                                where: {
                                    status: 'notYetCreate'
                                }
                            },
                            { lock: true, transaction: t },
                        );
                        isCaseRecord.status = 'notComplete';
                        await isCaseRecord.save({ transaction:t });
                        resolve(isCaseRecord);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        caseRecordPromise
        .then(isCaseRecord => {
            caseRecord = isCaseRecord;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecord, err);
        })
    }

    updateDoctorPharmacist(uuid_user, uuid_caseRecord, uuid_doctorOrPharmacist, callback) {
        let caseRecord;
        let err;
        
        const caseRecordPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecord = await this._CaseRecord.findByPk(
                            uuid_caseRecord,
                            {
                                where: {
                                    uuid_user: uuid_user
                                }
                            },
                            { lock: true, transaction: t },
                        );
                        isCaseRecord.uuid_doctorOrPharmacist = uuid_doctorOrPharmacist;
                        await isCaseRecord.save({ transaction:t });
                        resolve(isCaseRecord);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        caseRecordPromise
        .then(isCaseRecord => {
            caseRecord = isCaseRecord;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecord, err);
        })
    }

    sendRequireToDoctorPharmacist(uuid_user, uuid_caseRecord, uuid_doctorOrPharmacist, callback) {
        let caseRecord;
        let err;
        
        const caseRecordPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecord = await this._CaseRecord.findByPk(
                            uuid_caseRecord,
                            {
                                where: {
                                    uuid_user: uuid_user
                                }
                            },
                            { lock: true, transaction: t },
                        );
                        isCaseRecord.status = 'wait';
                        isCaseRecord.uuid_doctorOrPharmacist = uuid_doctorOrPharmacist;
                        await isCaseRecord.save({ transaction:t });
                        resolve(isCaseRecord);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        caseRecordPromise
        .then(isCaseRecord => {
            caseRecord = isCaseRecord;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecord, err);
        })
    }

    completedPrescription(uuid_caseRecord, callback) {
        let caseRecord;
        let err;

        const caseRecordPromise = new Promise(async (resolve, reject) => {
            const caseRecord_t = await sequelize.transaction();
            try {
                const isCaseRecordDescription = await this._CaseRecordDescription.findOne(
                    {
                        where: {
                            uuid_caseRecord: uuid_caseRecord,
                            [Op.not]: {
                                [Op.or]: [
                                    { status: 'delete' }
                                ]
                            }
                        }
                    },
                    { limit: 1, lock: true, transaction: caseRecord_t },
                );
                isCaseRecordDescription.status = 'completed';
                await isCaseRecordDescription.save({ transaction: caseRecord_t });

                const isCaseRecordImage = await this._CaseRecordImage.update({
                    status: 'completed'
                },
                    {
                        where: {
                            uuid_caseRecord: uuid_caseRecord,
                            [Op.not]: {
                                [Op.or]: [
                                    { status: 'delete' }
                                ]
                            }
                        }
                    },
                    { limit: 1, lock: true, transaction: caseRecord_t },
                );
                // isCaseRecordImage.status = 'completed';
                // await isCaseRecordImage.save({ transaction:t });

                const isCaseRecordPrescription = await this._CaseRecordPrescription.findOne(
                    {
                        where: {
                            uuid_caseRecord: uuid_caseRecord,
                            [Op.not]: {
                                [Op.or]: [
                                    { status: 'delete' }
                                ]
                            }
                        }
                    },
                    { limit: 1, lock: true, transaction: caseRecord_t },
                );
                isCaseRecordPrescription.status = 'completed';
                await isCaseRecordPrescription.save({ transaction: caseRecord_t });

                const isCaseRecordMedication = await this._CaseRecordMedication.update({
                    status: 'completed'
                },
                    {
                        where: {
                            uuid_caseRecord: uuid_caseRecord,
                            [Op.not]: {
                                [Op.or]: [
                                    { status: 'delete' }
                                ]
                            }
                        }
                    },
                    { limit: 1, lock: true, transaction: caseRecord_t },
                );
                // isCaseRecordMedication.status = 'completed';
                // await isCaseRecordMedication.save({ transaction: caseRecord_t });

                const isCaseRecord = await this._CaseRecord.findByPk(
                    uuid_caseRecord,
                    {
                        where: {
                            status: 'notComplete'
                        }
                    },
                    { limit: 1, lock: true, transaction: caseRecord_t },
                );
                isCaseRecord.status = 'completedPrescription';
                await isCaseRecord.save({ transaction: caseRecord_t });

                await caseRecord_t.commit();

                resolve(isCaseRecord);   

            } catch (error) {
                await caseRecord_t.rollback();
                reject(error);
            }
        });

        caseRecordPromise
        .then(isCaseRecord => {
            caseRecord = isCaseRecord;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecord, err);
        })
    }

    completed(uuid_caseRecord, newCurrentPage, callback) {
        let caseRecord;
        let err;
        
        const caseRecordPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecord = await this._CaseRecord.findByPk(
                            uuid_caseRecord,
                            {
                                where: {
                                    status: 'completedPrescription'
                                }
                            },
                            { lock: true, transaction: t },
                        );
                        isCaseRecord.currentPage = newCurrentPage;
                        isCaseRecord.status = 'completed';
                        await isCaseRecord.save({ transaction:t });
                        resolve(isCaseRecord);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        caseRecordPromise
        .then(isCaseRecord => {
            caseRecord = isCaseRecord;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecord, err);
        })
    }

    doctorOrPharmacistRequirePrescriptionAgain(uuid_caseRecord, callback) {
        let caseRecord;
        let err;

        const caseRecordPromise = new Promise(async (resolve, reject) => {
            const caseRecord_t = await sequelize.transaction();
            try {
                // const isCaseRecordDescription = await this._CaseRecordDescription.findOne(
                //     {
                //         where: {
                //             uuid_caseRecord: uuid_caseRecord,
                //             [Op.not]: {
                //                 [Op.or]: [
                //                     { status: 'delete' }
                //                 ]
                //             }
                //         }
                //     },
                //     { limit: 1, lock: true, transaction: caseRecord_t },
                // );
                // isCaseRecordDescription.status = 'notYetComplete';
                // await isCaseRecordDescription.save({ transaction: caseRecord_t });

                // const isCaseRecordImage = await this._CaseRecordImage.update({
                //     status: 'notYetComplete'
                // },
                //     {
                //         where: {
                //             uuid_caseRecord: uuid_caseRecord,
                //             [Op.not]: {
                //                 [Op.or]: [
                //                     { status: 'delete' }
                //                 ]
                //             }
                //         }
                //     },
                //     { limit: 1, lock: true, transaction: caseRecord_t },
                // );
                // // isCaseRecordImage.status = 'completed';
                // // await isCaseRecordImage.save({ transaction:t });

                // const isCaseRecordPrescription = await this._CaseRecordPrescription.findOne(
                //     {
                //         where: {
                //             uuid_caseRecord: uuid_caseRecord,
                //             [Op.not]: {
                //                 [Op.or]: [
                //                     { status: 'delete' }
                //                 ]
                //             }
                //         }
                //     },
                //     { limit: 1, lock: true, transaction: caseRecord_t },
                // );
                // isCaseRecordPrescription.status = 'notYetComplete';
                // await isCaseRecordPrescription.save({ transaction: caseRecord_t });

                // const isCaseRecordMedication = await this._CaseRecordMedication.update({
                //     status: 'notYetComplete'
                // },
                //     {
                //         where: {
                //             uuid_caseRecord: uuid_caseRecord,
                //             [Op.not]: {
                //                 [Op.or]: [
                //                     { status: 'delete' }
                //                 ]
                //             }
                //         }
                //     },
                //     { limit: 1, lock: true, transaction: caseRecord_t },
                // );
                // // isCaseRecordMedication.status = 'completed';
                // // await isCaseRecordMedication.save({ transaction: caseRecord_t });

                const isCaseRecord = await this._CaseRecord.findByPk(
                    uuid_caseRecord,
                    {
                        where: {
                            status: 'notComplete'
                        }
                    },
                    { limit: 1, lock: true, transaction: caseRecord_t },
                );
                isCaseRecord.status = 'doctorOrPharmacistRequirePrescribeAgain';
                await isCaseRecord.save({ transaction: caseRecord_t });

                await caseRecord_t.commit();

                resolve(isCaseRecord);   

            } catch (error) {
                await caseRecord_t.rollback();
                reject(error);
            }
        });

        caseRecordPromise
        .then(isCaseRecord => {
            caseRecord = isCaseRecord;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecord, err);
        })
    }

    patientAgreeRequirePrescriptionAgain(uuid_caseRecord, newCurrentPage, callback) {
        let caseRecord;
        let err;

        const caseRecordPromise = new Promise(async (resolve, reject) => {
            const caseRecord_t = await sequelize.transaction();
            try {
                const isCaseRecordDescription = await this._CaseRecordDescription.findOne(
                    {
                        where: {
                            uuid_caseRecord: uuid_caseRecord,
                            [Op.not]: {
                                [Op.or]: [
                                    { status: 'delete' }
                                ]
                            }
                        }
                    },
                    { limit: 1, lock: true, transaction: caseRecord_t },
                );
                isCaseRecordDescription.status = 'notYetComplete';
                await isCaseRecordDescription.save({ transaction: caseRecord_t });

                const isCaseRecordImage = await this._CaseRecordImage.update({
                    status: 'notYetComplete'
                },
                    {
                        where: {
                            uuid_caseRecord: uuid_caseRecord,
                            [Op.not]: {
                                [Op.or]: [
                                    { status: 'delete' }
                                ]
                            }
                        }
                    },
                    { limit: 1, lock: true, transaction: caseRecord_t },
                );
                // isCaseRecordImage.status = 'completed';
                // await isCaseRecordImage.save({ transaction:t });

                const isCaseRecordPrescription = await this._CaseRecordPrescription.findOne(
                    {
                        where: {
                            uuid_caseRecord: uuid_caseRecord,
                            [Op.not]: {
                                [Op.or]: [
                                    { status: 'delete' }
                                ]
                            }
                        }
                    },
                    { limit: 1, lock: true, transaction: caseRecord_t },
                );
                isCaseRecordPrescription.status = 'notYetComplete';
                await isCaseRecordPrescription.save({ transaction: caseRecord_t });

                const isCaseRecordMedication = await this._CaseRecordMedication.update({
                    status: 'notYetComplete'
                },
                    {
                        where: {
                            uuid_caseRecord: uuid_caseRecord,
                            [Op.not]: {
                                [Op.or]: [
                                    { status: 'delete' }
                                ]
                            }
                        }
                    },
                    { limit: 1, lock: true, transaction: caseRecord_t },
                );
                // isCaseRecordMedication.status = 'completed';
                // await isCaseRecordMedication.save({ transaction: caseRecord_t });

                const isCaseRecord = await this._CaseRecord.findByPk(
                    uuid_caseRecord,
                    {
                        where: {
                            status: 'notComplete'
                        }
                    },
                    { limit: 1, lock: true, transaction: caseRecord_t },
                );
                isCaseRecord.currentPage = newCurrentPage;
                isCaseRecord.status = 'notYetComplete';
                await isCaseRecord.save({ transaction: caseRecord_t });

                await caseRecord_t.commit();

                resolve(isCaseRecord);   

            } catch (error) {
                await caseRecord_t.rollback();
                reject(error);
            }
        });

        caseRecordPromise
        .then(isCaseRecord => {
            caseRecord = isCaseRecord;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecord, err);
        })
    }
}

const caseRecordCRUD = new CaseRecord();

module.exports = { caseRecordCRUD }