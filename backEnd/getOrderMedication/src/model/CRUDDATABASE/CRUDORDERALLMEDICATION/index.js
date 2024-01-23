// const { Op } = require('sequelize');
// const { sequelize } = require('../../../config/database');
// const { defineModel } = require('../defineModel');

// /**
// *@typedef {
// *title: string,
// *image_video: text,
// *note1: text,
// *note2: text,
// *history: string,
// *total: float,
// *status: string,
// *uuid_caseRecord: uuid,
// *uuid_user: uuid
// *} orderAllMedicationOptions
// */ 

// class ORDERALLMEDICATION {
//     constructor() {
//         this._OrderAllMedication = defineModel.getOrderAllMedication();
//     }

//     // create(orderAllMedicationOptions, callback) {
//     //     let orderAllMedication;
//     //     let err;
        
//     //     const orderAllMedicationPromise = new Promise((resolve, reject) => {
//     //         try {
//     //             sequelize.transaction(async (t) => {
//     //                 try {
//     //                     const newOrderAllMedication = await this._OrderAllMedication.create(orderAllMedicationOptions, { transaction: t });
//     //                     resolve(newOrderAllMedication);   
//     //                 } catch (error) {
//     //                     reject(error);
//     //                 }
//     //             });
//     //         } catch (error) {
//     //             reject(error);
//     //         }
//     //     });

//     //     orderAllMedicationPromise
//     //     .then(newOrderAllMedication => {
//     //         orderAllMedication = newOrderAllMedication;
//     //     }).catch(error => {
//     //         err = error;
//     //     }).finally(() => {
//     //         callback(orderAllMedication, err);
//     //     })
//     // }

//     // update(uuid_orderAllMedication, orderAllMedicationOptions, callback) {
//     //     let orderAllMedication;
//     //     let err;
        
//     //     const orderAllMedicationPromise = new Promise((resolve, reject) => {
//     //         try {
//     //             sequelize.transaction(async (t) => {
//     //                 try {
//     //                     const newOrderAllMedication = await this._OrderAllMedication.update(orderAllMedicationOptions, {
//     //                         where: {
//     //                             uuid_orderAllMedication: uuid_orderAllMedication
//     //                         }
//     //                     }, { transaction: t });
//     //                     resolve(newOrderAllMedication);   
//     //                 } catch (error) {
//     //                     reject(error);
//     //                 }
//     //             });
//     //         } catch (error) {
//     //             reject(error);
//     //         }
//     //     });

//     //     orderAllMedicationPromise
//     //     .then(newOrderAllMedication => {
//     //         orderAllMedication = newOrderAllMedication;
//     //     }).catch(error => {
//     //         err = error;
//     //     }).finally(() => {
//     //         callback(orderAllMedication, err);
//     //     })
//     // }

//     read(uuid_user, uuid_orderAllMedication, callback) {
//         let orderAllMedication;
//         let err;
        
//         const orderAllMedicationPromise = new Promise((resolve, reject) => {
//             try {
//                 sequelize.transaction(async (t) => {
//                     try {
//                         const newOrderAllMedication = await this._OrderAllMedication.findOne({
//                             where: {
//                                 [Op.and]: [
//                                     { uuid_user: uuid_user },
//                                     { uuid_orderAllMedication: uuid_orderAllMedication }
//                                 ]
//                             }
//                         }, { transaction: t });
//                         resolve(newOrderAllMedication);   
//                     } catch (error) {
//                         reject(error);
//                     }
//                 });
//             } catch (error) {
//                 reject(error);
//             }
//         });

//         orderAllMedicationPromise
//         .then(newOrderAllMedication => {
//             orderAllMedication = newOrderAllMedication;
//         }).catch(error => {
//             err = error;
//         }).finally(() => {
//             callback(orderAllMedication, err);
//         })
//     }
// }

// const orderAllMedication = new ORDERALLMEDICATION();

// module.exports = { orderAllMedication }