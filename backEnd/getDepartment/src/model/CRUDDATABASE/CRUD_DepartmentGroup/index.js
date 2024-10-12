'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

class DepartmentGroup {
    constructor() {
        this._DepartmentGroup = defineModel.getDepartmentGroup();
        this._DepartmentGroup_CH = defineModel.getDepartmentGroup_CH();
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

    readWithUid(uuid_departmentGroup, callback) {
        let departmentGroup;
        let err;
        
        const departmentGroupPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isDepartmentGroup = await this._DepartmentGroup.findOne({
                            where: {
                                uuid_departmentGroup: uuid_departmentGroup,
                                [Op.not]: { status: 'delete' }
                            },
                        }, { transaction: t })

                        resolve(isDepartmentGroup); 
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        departmentGroupPromise
        .then(isDepartmentGroup => {
            departmentGroup = isDepartmentGroup;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(departmentGroup, err);
        })
    }
}

const departmentGroupCRUD = new DepartmentGroup();

module.exports = { departmentGroupCRUD }