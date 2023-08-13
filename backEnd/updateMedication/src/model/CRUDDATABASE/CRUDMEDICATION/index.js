const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*name: string,
*image: text,
*subject: string,
*object: string,
*symptom: string,
*type: string,
*price: float,
*note: string,
*catalog: text,
*information: text,
*amount: integer,
*sold: integer,
*discount: float,
*averageRating: float,
*rateCount: integer,
*status: string
*uuid_provider: uuid
*} medicateOptions
*/  

class CRUDMEDICATION {
    constructor() {
        this._Medication = defineModel.getMedication();
    }

    // bulkReadFilter_provider(uuid_provider, pageIndex, pageSize, callback) {
    //     let medications;
    //     let err;
        
    //     const medicatePromise = new Promise((resolve, reject) => {
    //         try {
    //             sequelize.transaction(async (t) => {
    //                 try {
    //                     const isMedication = await this._Medication.findAndCountAll({
    //                         where: {
    //                             uuid_provider: uuid_provider
    //                         },
    //                         order: [
    //                             ['id', 'DESC']
    //                         ],
    //                         offset: pageSize * (pageIndex - 1),
    //                         limit: pageSize
    //                     }, { transaction: t })

    //                     if (isMedication.length === 0) {
    //                         resolve(null);
    //                     } else {
    //                         resolve(isMedication);
    //                     }   
    //                 } catch (error) {
    //                     reject(error);
    //                 }
    //             });
    //         } catch (error) {
    //             reject(error);
    //         }
    //     });

    //     medicatePromise
    //     .then(isMedication => {
    //         medications = isMedication;
    //     }).catch(error => {
    //         err = error;
    //     }).finally(() => {
    //         callback(medications, err);
    //     })
    // }

    // read(uuid_provider, callback) {
    //     let provider;
    //     let err;
        
    //     const providerPromise = new Promise((resolve, reject) => {
    //         try {
    //             sequelize.transaction(async (t) => {
    //                 try {
    //                     const isProvider = await this._Provider.findOne({
    //                         where: {
    //                             uuid_provider: uuid_provider    
    //                         },
    //                         attributes: {
    //                             exclude: ['createdAt', 'updatedAt']
    //                         }
    //                     }, { transaction: t })

    //                     resolve(isProvider);
    //                 } catch (error) {
    //                     reject(error);
    //                 }
    //             });
    //         } catch (error) {
    //             reject(error);
    //         }
    //     });

    //     providerPromise
    //     .then(isProvider => {
    //         provider = isProvider;
    //     }).catch(error => {
    //         err = error;
    //     }).finally(() => {
    //         callback(provider, err);
    //     })
    // }

    create(medicateOptions, callback) {
        let medication;
        let err;
        
        const medicatePromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isMedication = await this._Medication.create(medicateOptions, { transaction: t });
                        resolve(isMedication); 
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        medicatePromise
        .then(isMedication => {
            medication = isMedication;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(medication, err);
        })
    }

    update(uuid_medication, medicateOptionsPatch, callback) {
        let medication;
        let err;
        
        const medicatePromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isMedication = await this._Medication.update(medicateOptionsPatch, {
                                where: {
                                    uuid_medication: uuid_medication
                                }
                            }, { transaction: t })

                        if (isMedication.length === 0) {
                            resolve(null);
                        } else {
                            resolve(isMedication);
                        }   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        medicatePromise
        .then(isMedication => {
            medication = isMedication;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(medication, err);
        })
    }
}

const crudMedication = new CRUDMEDICATION();

module.exports = { crudMedication }