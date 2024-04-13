// const { Op } = require('sequelize');
// const { sequelize } = require('../../../config/database');
// const { defineModel } = require('../defineModel');

// /**
// *@typedef {
// *name: string,
// *amount: INTEGER.UNSIGNED,
// *note: text,
// *price: INTEGER.UNSIGNED,
// *discount: FLOAT,
// *cost: INTEGER.UNSIGNED,
// *status: string,
// *uuid_orderMyself: uuid,
// *uuid_medication: uuid
// *} medicationsOfOrderMyselfOptions
// */ 

// class MEDICATIONSOFORDERMYSELF {
//     constructor() {
//         this._MedicationsOfOrderMyself = defineModel.getMedicationsOfOrderMyself();
//     }

//     create(medicationsOfOrderMyselfOptions, callback) {
//         let medicationsOfOrderMyself;
//         let err;
        
//         const medicationsOfOrderMyselfPromise = new Promise((resolve, reject) => {
//             try {
//                 sequelize.transaction(async (t) => {
//                     try {
//                         const newMedicationsOfOrderMyself = await this._MedicationsOfOrderMyself.create(medicationsOfOrderMyselfOptions, { transaction: t });
//                         resolve(newMedicationsOfOrderMyself);   
//                     } catch (error) {
//                         reject(error);
//                     }
//                 });
//             } catch (error) {
//                 reject(error);
//             }
//         });

//         medicationsOfOrderMyselfPromise
//         .then(newMedicationsOfOrderMyself => {
//             medicationsOfOrderMyself = newMedicationsOfOrderMyself;
//         }).catch(error => {
//             err = error;
//         }).finally(() => {
//             callback(medicationsOfOrderMyself, err);
//         })
//     }

//     // bulkCreate(medicationsOfOrderMyselfOptionsArray, callback) {
//     //     let historyOptionsList;
//     //     let err;
        
//     //     const historyPromise = new Promise((resolve, reject) => {
//     //         try {
//     //             sequelize.transaction(async (t) => {
//     //                 try {
//     //                     const newHistorys = await this._MedicationsOfOrderMyself.bulkCreate(medicationsOfOrderMyselfOptionsArray, { transaction: t });
//     //                     resolve(newHistorys);   
//     //                 } catch (error) {
//     //                     reject(error);
//     //                 }
//     //             });
//     //         } catch (error) {
//     //             reject(error);
//     //         }
//     //     });

//     //     historyPromise
//     //     .then(newHistorys => {
//     //         historyOptionsList = newHistorys;
//     //     }).catch(error => {
//     //         err = error;
//     //     }).finally(() => {
//     //         callback(historyOptionsList, err);
//     //     })
//     // }
// }

// const medicationsOfOrderMyselfCRUD = new MEDICATIONSOFORDERMYSELF();

// module.exports = { medicationsOfOrderMyselfCRUD }