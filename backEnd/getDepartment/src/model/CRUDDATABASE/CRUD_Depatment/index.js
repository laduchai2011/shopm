'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

class Department {
    constructor() {
        this._Department = defineModel.getDepartment();
        this._Department_CH = defineModel.getDepartment_CH();
    }

    readAllWithFK(uuid_provider, callback) {
        let departmentGroupAll;
        let err;
        
        const departmentGroupPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isDepartmentGroups = await this._DepartmentGroup.findAll({
                            where: {
                                uuid_provider: uuid_provider,
                                [Op.not]: {
                                    status: 'delete'
                                }    
                            },
                            attributes: ['uuid_departmentGroup', 'name', 'title']
                        }, { transaction: t })

                        if (isDepartmentGroups.length === 0) {
                            resolve(null);
                        } else {
                            resolve(isDepartmentGroups);
                        }   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        departmentGroupPromise
        .then(isDepartmentGroups => {
            departmentGroupAll = isDepartmentGroups;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(departmentGroupAll, err);
        })
    }

    read__All__Uuid__By__Uuid_DepatmentGroup(callback) {
        let allDepartment;
        let err;
        
        const departmentPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isAllDepartments = await this._Department.findAll({
                            where: {
                                uuid_provider: uuid_provider,
                                [Op.or]: {

                                },
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
}

const departmentCRUD = new Department();

module.exports = { departmentCRUD }