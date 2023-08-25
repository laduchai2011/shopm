const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*name: string, 
*birthday: date,
*sex: boolean,
*address: string,
*major: string,
*graduated: string,
*phone: string,
*avatar: text,
*image: text,
*type: string
*information: text,
*averageRating: float,
*rateCount: integer,
*uuid_user: uuid
*} doctorOrPharmacistOptions
*/ 

class DOCTORORPHARMACIST {
    constructor() {
        this._User = defineModel.getUser();
        this._DoctorOrPharmacist = defineModel.getDoctorOrPharmacist();
    }

    create(doctorOrPharmacistOptions, callback) {
        let doctorOrPharmacist;
        let err;
        
        const doctorOrPharmacistPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isDoctorOrPharmacist = await this._DoctorOrPharmacist.findAll({
                            where: {
                                [Op.or]: [
                                    { uuid_user: doctorOrPharmacistOptions.uuid_user }
                                ]         
                            }
                        }, { transaction: t })

                        if (isDoctorOrPharmacist.length === 0) {
                            const newDoctorOrPharmacist = await this._DoctorOrPharmacist.create(doctorOrPharmacistOptions, { transaction: t });
                            resolve(newDoctorOrPharmacist);
                        } else {
                            resolve(null);
                        }   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        doctorOrPharmacistPromise
        .then(newDoctorOrPharmacist => {
            doctorOrPharmacist = newDoctorOrPharmacist;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(doctorOrPharmacist, err);
        })
    }
}

const doctorOrPharmacist = new DOCTORORPHARMACIST();

module.exports = { doctorOrPharmacist }