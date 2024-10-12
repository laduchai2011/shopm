'use strict';
const { SvMessage } = require('../../model/svMessage');
const { v4: uuidv4 } = require('uuid');

async function getDepartmentGroup(uuid_departmentGroup, callback) {
    const _id = uuidv4();
    const svMessage = new SvMessage();

    function getDepartmentGroupFc(message) {
        const id = JSON.parse(message).id;
        const departmentGroup = JSON.parse(message).departmentGroup;
        const err = JSON.parse(message).err;
        
        if (_id === id) {
            callback(departmentGroup, err);
        }

        svMessage.close();
    }

    await svMessage.init();

    await svMessage.receiveMessage(`feedback_require__departmentGroup__via__uuid_departmentGroup___${_id}`, { unsubscribe: true }, getDepartmentGroupFc);
    svMessage.sendMessage('require__departmentGroup__via__uuid_departmentGroup', JSON.stringify({ id: _id, uuid_departmentGroup: uuid_departmentGroup }));
}

function getDepartmentGroupMid(req, res, next) {
    const uuid_departmentGroup = req.body.departmentOptions.uuid_departmentGroup;
    getDepartmentGroup(uuid_departmentGroup, (departmentGroup, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: `Can't get departmentGroup !`,
                err: err,
                success: false
            })
        } else {
            if (departmentGroup && departmentGroup!==null) {
                req.departmentGroupMid = departmentGroup;
                next();
            } else {
                return res.status(200).json({
                    success: false,
                    message: `This departmentGroup is NOT your !`,
                })
            }
        }
    })
}

module.exports = { getDepartmentGroup, getDepartmentGroupMid }