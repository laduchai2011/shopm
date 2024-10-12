'use strict';

function isProviderDepartmentGroup(req, res, next) {
    const providerMid = req.providerMid;
    const departmentGroup = req.departmentGroupMid;

    if (providerMid?.uuid_provider===departmentGroup.uuid_provider) {
        next();
    } else {
        return res.status(200).send({ 
            message: `This department group is NOT of this provider !`,
            success: false
        })
    }
}

function isNormalDepartmentGroup(req, res, next) {
    const departmentGroupMid = req.departmentGroupMid;

    if (departmentGroupMid?.status==='normal') {
        next();
    } else {
        return res.status(200).send({ 
            message: `Department-group' status is ${departmentGroupMid?.status} !`,
            success: false
        })
    }
}

module.exports = { isProviderDepartmentGroup, isNormalDepartmentGroup }