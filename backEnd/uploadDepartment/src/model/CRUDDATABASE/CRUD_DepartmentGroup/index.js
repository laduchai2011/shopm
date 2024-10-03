'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

class DepartmentGroup {
    constructor() {
        this._departmentGroup = defineModel.getDepartmentGroup();
    }

    create(departmentGroupOptions, callback) {
        let departmentGroup;
        let err;
        
        const departmentGroupPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isDepartmentGroup = await this._departmentGroup.create(
                            departmentGroupOptions,
                            { transaction: t }
                        );
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