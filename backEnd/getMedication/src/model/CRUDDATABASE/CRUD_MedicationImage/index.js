const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*url: string,
*status: string,
*uuid_medication: uuid
*} medicationImageOptions
*/
    

class MedicationImage {
    constructor() {
        this._MedicationImage = defineModel.getMedicationImage();
    }

    bulkReadFromMedication(uuid_medication, callback) {
        let medicationImages;
        let err;
        
        const medicateImagePromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isMedicationImage = await this._MedicationImage.findAll({
                            where: {
                                uuid_medication: uuid_medication,
                                [Op.not]: { status: 'delete' }
                            },
                            order: [
                                ['id', 'DESC']
                            ],
                        }, { transaction: t })

                        if (isMedicationImage.length === 0) {
                            resolve(null);
                        } else {
                            resolve(isMedicationImage);
                        }   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        medicateImagePromise
        .then(isMedicationImage => {
            medicationImages = isMedicationImage;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(medicationImages, err);
        })
    }
}

const medicationImageCRUD = new MedicationImage();

module.exports = { medicationImageCRUD }