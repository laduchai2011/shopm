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
                            }
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
}

const departmentGroupCRUD = new DepartmentGroup();

module.exports = { departmentGroupCRUD }