'use strict';
const { logEvents } = require('./logEvents');
const { SvMessage } = require('./src/model/svMessage');
const { doctorOrPharmacist } = require('./src/model/CRUDDATABASE/CRUDDOCTORORPHARMACIST');

(async () => {
    const svMessage = new SvMessage();
    await svMessage.init();

    await svMessage.receiveMessage('require__Uuid_doctorOrPharmacist__via__uuid_user', { unsubscribe: false }, (message) => {
        const uuid_user = JSON.parse(message).uuid_user;
        const id = JSON.parse(message).id;
        doctorOrPharmacist.readUuidViaUuid_user(uuid_user, (doctorOrPharmacist, err) => {
            if (err) {
                logEvents(`serviceMessage: ${err}`);
            } else {
                const uuid_doctorOrPharmacist = doctorOrPharmacist?.dataValues?.uuid_doctorOrPharmacist;
                svMessage.sendMessage(`feedback__Uuid_doctorOrPharmacist__via__uuid_user___${id}`, JSON.stringify({id: id, uuid_doctorOrPharmacist: uuid_doctorOrPharmacist }))
            }
        })
    })
})();