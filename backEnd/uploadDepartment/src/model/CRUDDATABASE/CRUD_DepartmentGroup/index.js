'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

class DepartmentGroup {
    constructor() {
        this._departmentGroup = defineModel.getDepartmentGroup();
        this._departmentGroup_CH = defineModel.getDepartmentGroup_CH();
    }

    create(departmentGroupOptions, callback) {
        let departmentGroup;
        let err;
        
        // const departmentGroupPromise = new Promise((resolve, reject) => {
        //     try {
        //         sequelize.transaction(async (t) => {
        //             try {
        //                 const isDepartmentGroup = await this._departmentGroup.create(
        //                     departmentGroupOptions,
        //                     { transaction: t }
        //                 );
        //                 resolve(isDepartmentGroup);   
        //             } catch (error) {
        //                 reject(error);
        //             }
        //         });
        //     } catch (error) {
        //         reject(error);
        //     }
        // });

        // departmentGroupPromise
        // .then(isDepartmentGroup => {
        //     departmentGroup = isDepartmentGroup;
        // }).catch(error => {
        //     err = error;
        // }).finally(() => {
        //     callback(departmentGroup, err);
        // })

        const departmentGroupPromise = new Promise(async (resolve, reject) => {
            const departmentGroup_t = await sequelize.transaction();
            try {
                const isDepartmentGroup = await this._departmentGroup.create(departmentGroupOptions, { transaction: departmentGroup_t });

                const departmentGroup_CH_Options = {
                    name: isDepartmentGroup.name,
                    title: isDepartmentGroup.title,
                    note: isDepartmentGroup.note,
                    status: isDepartmentGroup.status,
                    uuid_departmentGroup: isDepartmentGroup.uuid_departmentGroup
                }

                const isDepartmentGroup_CH = await this._departmentGroup_CH.create(departmentGroup_CH_Options, {transaction: departmentGroup_t});

                await departmentGroup_t.commit();

                resolve(isDepartmentGroup);   
            
            } catch (error) {
                await departmentGroup_t.rollback();
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