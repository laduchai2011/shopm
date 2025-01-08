'use strict';
require('dotenv').config();
// const { logEvents } = require('../../../logEvents');
const { v4: uuidv4 } = require('uuid');
const { SvMessage } = require('../../model/svMessage');

const service = process.env.SERVICE;

async function getAllUuidDepartmentGroupFromSVChest(uuid_provider, callback) {
    const svMessage = new SvMessage();
    await svMessage.init();
    const _id = uuidv4();
    
    function getAllUuidDepatmentGroup_(message) {
        const allDepartmentGroup = JSON.parse(message).allDepartmentGroup;
        const id = JSON.parse(message).id;
        if (_id === id) {
            callback(allDepartmentGroup);
            svMessage.close();
        }
    }

    await svMessage.receiveMessage(`feedback__require__all__uuid_departmentGroup__from__uuid_provider___${_id}`, { unsubscribe: true }, getAllUuidDepatmentGroup_);
    svMessage.sendMessage('require__all__uuid_departmentGroup__from__uuid_provider', JSON.stringify({ id: _id, uuid_provider: uuid_provider }));
}

function get__All__Uuid_departmentGroup(req, res, next) {
    const uuid_provider = req.query.uuid_provider;
    getAllUuidDepartmentGroupFromSVChest(uuid_provider, allDepartmentGroup => {
        if (allDepartmentGroup) {
            let all_uuid_depatmentGroup = [];
            for (let i = 0; i < allDepartmentGroup.length; i++) {
                all_uuid_depatmentGroup.push(allDepartmentGroup[i].uuid_departmentGroup);
            }
            req.all_uuid_depatmentGroup = all_uuid_depatmentGroup;
            next();
        } else {
            return res.status(200).json({
                allDepartmentGroup: allDepartmentGroup,
                success: false,
                message: `Get all uuid_departmentGroup is NOT successly (${service}) !`
            })
        }
    })
}

module.exports = { get__All__Uuid_departmentGroup }