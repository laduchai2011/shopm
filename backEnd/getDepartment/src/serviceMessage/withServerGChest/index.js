'use strict';
require('dotenv').config();
const { logEvents } = require('../../../logEvents');
const { departmentCRUD } = require('../../model/CRUDDATABASE/CRUD_Department');
const { departmentGroupCRUD } = require('../../model/CRUDDATABASE/CRUD_DepartmentGroup');


const service = process.env.SERVICE;

class WithServerGChest {
    constructor (svMessage) {
        this._svMessage = svMessage;
    }
    required__All__Uuid_DepatmentGroup__By__Uuid_Provider () {
        this._svMessage.receiveMessage('require__all__uuid_departmentGroup__from__uuid_provider', { unsubscribe: false }, (message) => {
            const uuid_provider = JSON.parse(message).uuid_provider;
            const id = JSON.parse(message).id;
            departmentGroupCRUD.read__All__Uuid__By__Uuid_Provider(uuid_provider, (allDepartmentGroup, err) => {
                if (err) {
                    logEvents(`ServiceMessage (${service}): ${err}`);
                } else {
                    this._svMessage.sendMessage(`feedback__require__all__uuid_departmentGroup__from__uuid_provider___${id}`, JSON.stringify({id: id, allDepartmentGroup: allDepartmentGroup }))
                }
            })
        })
    }

    required__All__Uuid_Depatment__By__All__Uuid_DepatmentGroup () {
        this._svMessage.receiveMessage('require__all__uuid_department__from__all__uuid_departmentGroup', { unsubscribe: false }, (message) => {
            const all_uuid_depatmentGroup = JSON.parse(message).all_uuid_depatmentGroup;
            const id = JSON.parse(message).id;

            const s_all_uuid_depatmentGroup = [];
            for (let i = 0; i < all_uuid_depatmentGroup.length; i++) {
                const s_uuid_depatmentGroup = {
                    uuid_departmentGroup: all_uuid_depatmentGroup[i]
                }
                s_all_uuid_depatmentGroup.push(s_uuid_depatmentGroup);
            }

            departmentCRUD.read__All__Uuid__By__All__Uuid_DepatmentGroup(s_all_uuid_depatmentGroup, (allDepartment, err) => {
                if (err) {
                    logEvents(`ServiceMessage (${service}): ${err}`);
                } else {
                    this._svMessage.sendMessage(`feedback__require__all__uuid_department__from__all__uuid_departmentGroup___${id}`, JSON.stringify({id: id, allDepartment: allDepartment }))
                }
            })
        })
    }

    required__All__Uuid_Chest__By__All__Uuid_DepatmentGroup () {
        this._svMessage.receiveMessage('require__all__uuid_chest__from__all__uuid_departmentGroup', { unsubscribe: false }, (message) => {
            const all_uuid_depatmentGroup = JSON.parse(message).all_uuid_depatmentGroup;
            const id = JSON.parse(message).id;

            const s_all_uuid_depatmentGroup = [];
            for (let i = 0; i < all_uuid_depatmentGroup.length; i++) {
                const s_uuid_depatmentGroup = {
                    uuid_departmentGroup: all_uuid_depatmentGroup[i]
                }
                s_all_uuid_depatmentGroup.push(s_uuid_depatmentGroup);
            }

            departmentCRUD.read__All__Uuid_Chest__By__All__Uuid_DepatmentGroup(s_all_uuid_depatmentGroup, (allDepartment, err) => {
                if (err) {
                    logEvents(`ServiceMessage (${service}): ${err}`);
                } else {
                    this._svMessage.sendMessage(`feedback__require__all__uuid_chest__from__all__uuid_departmentGroup___${id}`, JSON.stringify({id: id, allDepartment: allDepartment }))
                }
            })
        })
    }
}

module.exports.default = WithServerGChest;