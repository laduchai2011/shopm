'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

class Department {
    constructor() {
        this._Department = defineModel.getDepartment();
        this._Department_CH = defineModel.getDepartment_CH();
    }

    read__All__Uuid__By__All__Uuid_DepatmentGroup(s_all_uuid_depatmentGroup, callback) {
        let allDepartment;
        let err;
        
        const departmentPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isAllDepartments = await this._Department.findAll({
                            where: {
                                [Op.or]: s_all_uuid_depatmentGroup,
                                [Op.not]: {
                                    status: 'delete'
                                }    
                            },
                            attributes: ['uuid_department']
                        }, { transaction: t })

                        if (isAllDepartments.length === 0) {
                            resolve(null);
                        } else {
                            resolve(isAllDepartments);
                        }   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        departmentPromise
        .then(isAllDepartments => {
            allDepartment = isAllDepartments;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(allDepartment, err);
        })
    }

    read__All__Uuid_Chest__By__All__Uuid_DepatmentGroup(s_all_uuid_depatmentGroup, callback) {
        let allDepartment;
        let err;
        
        const departmentPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isAllDepartments = await this._Department.findAll({
                            where: {
                                [Op.or]: s_all_uuid_depatmentGroup,
                                [Op.or]: {
                                    [Op.not]: { status: 'delete' },
                                    [Op.not]: { uuid_chest: null },
                                }  
                            },
                            attributes: ['uuid_chest']
                        }, { transaction: t })

                        if (isAllDepartments.length === 0) {
                            resolve(null);
                        } else {
                            resolve(isAllDepartments);
                        }   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        departmentPromise
        .then(isAllDepartments => {
            allDepartment = isAllDepartments;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(allDepartment, err);
        })
    }
}

const departmentCRUD = new Department();

module.exports = { departmentCRUD }