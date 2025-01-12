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

    SHOPM_getList_department_from_medicationScreen(uuid_medication, pageIndex, pageSize, callback) {
        let departmentList;
        let err;
        
        const departmentPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isDepartmentList = await this._Department.findAndCountAll({
                            where: {
                                uuid_medication: uuid_medication,
                                [Op.or]: {
                                    [Op.not]: { status: 'delete' }
                                }  
                            },
                            order: [
                                ['id', 'DESC']
                            ],
                            offset: pageSize * (pageIndex - 1),
                            limit: pageSize
                        }, { transaction: t })

                        if (isDepartmentList.length === 0) {
                            resolve(null);
                        } else {
                            resolve(isDepartmentList);
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
        .then(isDepartmentList => {
            departmentList = isDepartmentList;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(departmentList, err);
        })
    }
}

const departmentCRUD = new Department();

module.exports = { departmentCRUD }