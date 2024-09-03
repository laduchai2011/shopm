'use strict';
const { SvMessage } = require('../../model/svMessge');
const { v4: uuidv4 } = require('uuid');


class CaseRecordRole {
    constructor() {
        this._svMessage = new SvMessage();
        this._svMessage.init();
        this._roles = ['patient', 'doctorOrPharmacist'];
    }

    setUp({caseRecord: caseRecord, user: user}) {
        this._caseRecord = caseRecord;
        this._user = user;
    }

    async checkRole(callback) {
        const _id = uuidv4();

        const __caseRecord = this._caseRecord;
        const __user = this._user;
        let __caseRecordRole = this._caseRecordRole;
        const __roles = this._roles;
    
        function checkFc(message) {
            const uuid_doctorOrPharmacist = JSON.parse(message).uuid_doctorOrPharmacist;
            const id = JSON.parse(message).id;
            if (_id === id) {
                let uuid_doctorOrPharmacist_m;
        
                if (uuid_doctorOrPharmacist && uuid_doctorOrPharmacist!==null) {
                    uuid_doctorOrPharmacist_m = uuid_doctorOrPharmacist;
                } else {
                    uuid_doctorOrPharmacist_m = __user.uuid;
                }
            
                if(__caseRecord.uuid_user === __user.uuid) {
                    __caseRecordRole = 'patient';
                } else if (__caseRecord.uuid_doctorOrPharmacist === uuid_doctorOrPharmacist) {
                    __caseRecordRole = 'doctorOrPharmacist';
                }

                let isRole = false;
                if (__roles.indexOf(__caseRecordRole) !== -1) {
                    isRole = true;
                }

                const caseRecordRole = __caseRecordRole;

                callback(isRole, caseRecordRole);
            }
        }

        await this._svMessage.receiveMessage(`feedback__Uuid_doctorOrPharmacist__via__uuid_user___${_id}`, { unsubscribe: true }, checkFc);
        this._svMessage.sendMessage('require__Uuid_doctorOrPharmacist__via__uuid_user', JSON.stringify({ id: _id, uuid_user: this._user.uuid }));
    }
}

const caseRecordRole = new CaseRecordRole();

module.exports = { caseRecordRole }