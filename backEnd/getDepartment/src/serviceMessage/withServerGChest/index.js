'use strict';
require('dotenv').config();
const { logEvents } = require('../../../logEvents');
const { departmentCRUD } = require('../../model/CRUDDATABASE/CRUD_Depatment');
const { departmentGroupCRUD } = require('../../model/CRUDDATABASE/CRUD_DepartmentGroup');



const service = process.env.SERVICE;

class WithServerGChest {
    constructor (svMessage) {
        this._svMessage = svMessage;
    }
    required__All__Uuid_DepatmentGroup__By__Uuid_Provider () {
        this._svMessage.receiveMessage('require__all__uuid_depatmentGroup__from__uuid_provider', { unsubscribe: false }, (message) => {
            const uuid_provider = JSON.parse(message).uuid_provider;
            const id = JSON.parse(message).id;
            departmentGroupCRUD.read__All__Uuid__By__Uuid_Provider(uuid_provider, (allDepartmentGroup, err) => {
                if (err) {
                    logEvents(`ServiceMessage (${service}): ${err}`);
                } else {
                    this._svMessage.sendMessage(`feedback__require__all__uuid_depatmentGroup__from__uuid_provider___${id}`, JSON.stringify({id: id, allDepartmentGroup: allDepartmentGroup }))
                }
            })
        })
    }

    required__All__Uuid_Depatment__By__Uuid_DepatmentGroup () {
        this._svMessage.receiveMessage('require__all__uuid_depatment__from__uuid_depatmentGroup', { unsubscribe: false }, (message) => {
            const uuid_depatmentGroup = JSON.parse(message).uuid_depatmentGroup;
            const id = JSON.parse(message).id;
            departmentCRUD.read__All__Uuid__By__Uuid_DepatmentGroup(uuid_depatmentGroup, (allDepartment, err) => {
                if (err) {
                    logEvents(`ServiceMessage (${service}): ${err}`);
                } else {
                    this._svMessage.sendMessage(`feedback__require__all__uuid_depatment__from__uuid_depatmentGroup___${id}`, JSON.stringify({id: id, allDepartment: allDepartment }))
                }
            })
        })
    }
}

module.exports.default = WithServerGChest;