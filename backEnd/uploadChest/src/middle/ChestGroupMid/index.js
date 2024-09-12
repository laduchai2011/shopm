'use strict';

class ChestGroupMid {
    constructor() {}

    setChestGroup(chestGroup) {
        this._chestGroup = chestGroup;
    }

    isReady() {
        if (this._chestGroup?.status==='ready') {
            return true;
        } else {
            return false;
        }
    }

    isReadyToCustom() {
        if (this._chestGroup?.status==='ready custom') {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = { ChestGroupMid }