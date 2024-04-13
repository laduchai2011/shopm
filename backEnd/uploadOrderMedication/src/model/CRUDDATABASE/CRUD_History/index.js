// const { Op } = require('sequelize');
// const { sequelize } = require('../../../config/database');
// const { defineModel } = require('../defineModel');

// /**
// *@typedef {
// *step: string,
// *isCompleted: text,
// *status: string,
// *uuid_orderMedication: uuid
// *} historyOptions
// */ 

// class HISTORY {
//     constructor() {
//         this._History = defineModel.getHistory();
//     }

//     create(historyOptions, callback) {
//         let history;
//         let err;
        
//         const historyPromise = new Promise((resolve, reject) => {
//             try {
//                 sequelize.transaction(async (t) => {
//                     try {
//                         const newHistory = await this._History.create(historyOptions, { transaction: t });
//                         resolve(newHistory);   
//                     } catch (error) {
//                         reject(error);
//                     }
//                 });
//             } catch (error) {
//                 reject(error);
//             }
//         });

//         historyPromise
//         .then(newHistory => {
//             history = newHistory;
//         }).catch(error => {
//             err = error;
//         }).finally(() => {
//             callback(history, err);
//         })
//     }

//     bulkCreate(historyOptionsArray, callback) {
//         let historyOptionsList;
//         let err;
        
//         const historyPromise = new Promise((resolve, reject) => {
//             try {
//                 sequelize.transaction(async (t) => {
//                     try {
//                         const newHistorys = await this._History.bulkCreate(historyOptionsArray, { transaction: t });
//                         resolve(newHistorys);   
//                     } catch (error) {
//                         reject(error);
//                     }
//                 });
//             } catch (error) {
//                 reject(error);
//             }
//         });

//         historyPromise
//         .then(newHistorys => {
//             historyOptionsList = newHistorys;
//         }).catch(error => {
//             err = error;
//         }).finally(() => {
//             callback(historyOptionsList, err);
//         })
//     }
// }

// const historyCRUD = new HISTORY();

// module.exports = { historyCRUD }