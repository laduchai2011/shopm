'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*name: string,
*title: string,
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

/**
*@typedef {
*uuid_medication: uuid,
*sold: int
*} soldMedicationList
*/ 

class MedicationCRUD {
    constructor() {
        this._Medication = defineModel.getMedication();
        this._MedicationImage = defineModel.getMedicationImage();
        this._MedicationVideo = defineModel.getMedicationVideo();
    }

    create(createMedicationOptions, callback) {
        let medication;
        let err;

        const medicatePromise = new Promise(async (resolve, reject) => {
            const medication_t = await sequelize.transaction();
            try {
                const newMedication_m = await this._Medication.create(createMedicationOptions.medicationOptions, { transaction: medication_t });

                const newMedication = newMedication_m.dataValues;

                const medicationImageOptionsArray = createMedicationOptions.medicationImageOptionsArray;
                for (let i = 0; i < medicationImageOptionsArray.length; i++) {
                    medicationImageOptionsArray[i].uuid_medication = newMedication.uuid_medication;
                }
                const newMedicationImage = await this._MedicationImage.bulkCreate(medicationImageOptionsArray, { transaction: medication_t });

                const medicationVideoOptionsArray = createMedicationOptions.medicationVideoOptionsArray;
                for (let i = 0; i < medicationVideoOptionsArray.length; i++) {
                    medicationVideoOptionsArray[i].uuid_medication = newMedication.uuid_medication;
                }
                const newMedicationVideo = await this._MedicationVideo.bulkCreate(medicationVideoOptionsArray, { transaction: medication_t });

                await medication_t.commit();

                resolve(newMedication); 
            } catch (error) {
                await medication_t.rollback();
                reject(error);
            }
        })

        medicatePromise
        .then(newMedication => {
            medication = newMedication;
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

    updateSold(uuid_medication, sold, callback) {
        let medication;
        let err;

        const medicationPromise = new Promise(async (resolve, reject) => {
            const medication_t = await sequelize.transaction();
            try {  
                const medication_u = await this._Medication.findByPk(
                    uuid_medication, 
                    {
                        where: {
                            [Op.or]: [
                                {[Op.not]: { status: 'delete' }}
                            ]
                        }
                    },
                    { limit: 1, lock: true, transaction: medication_t }
                );
                
                const newSold = medication_u.sold + sold;
                const newAmount = medication_u.amount;

                if (newAmount < newSold) {
                    await medication_t.rollback();
                    reject('Not enough medicated amount for me');
                } else {
                    medication_u.sold = sold;
                    await medication_u.save({ transaction: medication_t });
                    await medication_t.commit();
                    resolve(medication_u); 
                }
            } catch (error) {
                await medication_t.rollback();
                reject(error);
            }
        })

        medicationPromise
        .then(medication_u => {
            medication = medication_u;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(medication, err);
        })
    }

    bulkUpdateSold(soldMedicationList, callback) {
        let medicationList;
        let err;

        const medicationPromise = new Promise(async (resolve, reject) => {
            try {  
                const medicationArray = [];
                for (let i = 0; i < soldMedicationList.length; i++) {
                    const medication_t = await sequelize.transaction();
                    const medication_u = await this._Medication.findByPk(
                        soldMedicationList[i].uuid_medication, 
                        {
                            where: {
                                [Op.or]: [
                                    {[Op.not]: { status: 'delete' }}
                                ]
                            }
                        },
                        { limit: 1, lock: true, skipLocked: true, transaction: medication_t }
                    );
                    
                    const newSold = medication_u.sold + soldMedicationList[i].sold;
                    const amount = medication_u.amount;

                    if (amount < newSold) {
                        for (let i1 = 0; i1 < i; i1++) {
                            const medication_t1 = await sequelize.transaction();
                            const medication_u1 = await this._Medication.findByPk(
                                soldMedicationList[i1].uuid_medication, 
                                {
                                    where: {
                                        [Op.or]: [
                                            {[Op.not]: { status: 'delete' }}
                                        ]
                                    }
                                },
                                { limit: 1, lock: true, skipLocked: true, transaction: medication_t1 }
                            );
                            medication_u1.sold = medication_u1.sold - soldMedicationList[i1].sold;
                            await medication_u1.save({ transaction: medication_t1 });
                            await medication_t1.commit();
                        }
                        await medication_t.rollback();
                        resolve({
                            success: false,
                            message: 'Not enough medicated amount for you'
                        });
                    } else {
                        medication_u.sold = newSold;
                        await medication_u.save({ transaction: medication_t });
                        medicationArray.push(medication_u);
                        await medication_t.commit();
                    }
                }
                resolve({
                    success: true,
                    medicationArray: medicationArray
                });
            } catch (error) {
                await medication_t.rollback();
                reject(error);
            }
        })

        medicationPromise
        .then(medicationArray => {
            medicationList = medicationArray;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(medicationList, err);
        })
    }
}

const medicationCRUD = new MedicationCRUD();

module.exports = { medicationCRUD }