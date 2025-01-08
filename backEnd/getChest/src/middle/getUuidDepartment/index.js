'use strict';
require('dotenv').config();
// const { logEvents } = require('../../../logEvents');
const { v4: uuidv4 } = require('uuid');
const { SvMessage } = require('../../model/svMessage');

const service = process.env.SERVICE;

async function getAllUuidDepartmentFromSVChest(all_uuid_depatmentGroup, callback) {
    const svMessage = new SvMessage();
    await svMessage.init();
    const _id = uuidv4();
    
    function getAllUuidDepatment_(message) {
        const allDepartment = JSON.parse(message).allDepartment;
        const id = JSON.parse(message).id;
        if (_id === id) {
            callback(allDepartment);
            svMessage.close();
        }
    }

    await svMessage.receiveMessage(`feedback__require__all__uuid_department__from__all__uuid_departmentGroup___${_id}`, { unsubscribe: true }, getAllUuidDepatment_);
    svMessage.sendMessage('require__all__uuid_department__from__all__uuid_departmentGroup', JSON.stringify({ id: _id, all_uuid_depatmentGroup: all_uuid_depatmentGroup }));
}

function get__All__Uuid_department(req, res, next) {
    const all_uuid_depatmentGroup = req.all_uuid_depatmentGroup;
    getAllUuidDepartmentFromSVChest(all_uuid_depatmentGroup, allDepartment => {
        if (allDepartment) {
            let all_uuid_depatment = [];
            for (let i = 0; i < allDepartment.length; i++) {
                all_uuid_depatment.push(allDepartment[i].uuid_department);
            }
            req.all_uuid_depatment = all_uuid_depatment;
            next();
        } else {
            return res.status(200).json({
                allDepartment: allDepartment,
                success: false,
                message: `Get all uuid_department is NOT successly (${service}) !`
            })
        }
    })
}

module.exports = { get__All__Uuid_department }