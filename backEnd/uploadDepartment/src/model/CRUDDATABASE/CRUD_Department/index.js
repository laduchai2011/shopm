'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

class Department {
    constructor() {
        this._department = defineModel.getDepartment();
        this._department_CH = defineModel.getDepartment_CH();
    }

    create(departmentOptions, callback) {
        let department;
        let err;

        const departmentPromise = new Promise(async (resolve, reject) => {
            const department_t = await sequelize.transaction();
            try {
                const isDepartment = await this._department.create(departmentOptions, { transaction: department_t });

                const department_CH_Options = {
                    name: isDepartment.name,
                    title: isDepartment.title,
                    amount: isDepartment.amount,
                    sold: isDepartment.sold,
                    remain: isDepartment.remain,
                    recover: isDepartment.recover,
                    turnover: isDepartment.turnover,
                    consultantCost: isDepartment.consultantCost,
                    return: isDepartment.return,
                    price: isDepartment.price,
                    discount: isDepartment.discount,
                    firstTime: isDepartment.firstTime,
                    lastTime: isDepartment.lastTime,
                    note: isDepartment.note,
                    status: isDepartment.status,
                    uuid_medication: isDepartment.uuid_medication,
                    uuid_chest: isDepartment.uuid_chest,
                    uuid_department: isDepartment.uuid_department
                }

                const isDepartment_CH = await this._department_CH.create(department_CH_Options, {transaction: department_t});

                await department_t.commit();

                resolve(isDepartment);   
            
            } catch (error) {
                await department_t.rollback();
                reject(error);
            }
        });

        departmentPromise
        .then(isDepartment => {
            department = isDepartment;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(department, err);
        })
    }
}

const departmentCRUD = new Department();

module.exports = { departmentCRUD }