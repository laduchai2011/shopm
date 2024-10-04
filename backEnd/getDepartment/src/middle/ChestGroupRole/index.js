'use strict';

function isReadyToCustom(req, res, next) {
    const chestGroupMid = req.chestGroupMid;

    if (chestGroupMid.status==='ready custom') {
        next();
    } else {
        return res.status(200).json({
            success: false,
            message: 'ChestGroup is NOT ready to custom !'
        })
    }
}

function handleIfNotReadyToCustom(req, res, next) {
    const chestGroupMid = req.chestGroupMid;
    let chestGroupOptions = req.body.chestGroupOptions;
    const newNote = chestGroupOptions.note; // change infor in {note}
    if (chestGroupMid.status!=='ready custom') {
        chestGroupOptions = chestGroupMid;
        chestGroupOptions.note = newNote;
        req.chestGroupOptionsMid = chestGroupOptions;
        next();
    } else {
        return res.status(200).json({
            success: false,
            message: 'handleIfNotReadyToCustom is NOT successly !'
        })
    }
}

function handleDataWithStatusTKS(req, res, next) {
    const chestGroupMid = req.chestGroupMid;
    let chestGroupOptions = req.body.chestGroupOptions;
    chestGroupOptions.status = chestGroupMid.status;
    const newNote = chestGroupOptions.note; // change infor in {note}
    if (chestGroupMid.status==='ready custom') {
        req.chestGroupOptionsMid = chestGroupOptions;
    } else {
        chestGroupOptions = chestGroupMid;
        chestGroupOptions.note = newNote;
        req.chestGroupOptionsMid = chestGroupOptions;
    }
    next();
}

module.exports = { 
    isReadyToCustom,
    handleIfNotReadyToCustom,
    handleDataWithStatusTKS 
}