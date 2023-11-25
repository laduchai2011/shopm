'use strict';
const { logEvents } = require('./logEvents');
const { SvMessage } = require('./src/model/svMessge');

(async () => {
    const svMessage = new SvMessage();
    await svMessage.init();
    // await svMessage.reciveMessage('require__Uuid_doctorOrPharmacist__via__uuid_user', (message) => {
    //     const uuid_user = JSON.parse(message).uuid_user;
    //     doctorOrPharmacist.readUuidViaUuid_user(uuid_user, (doctorOrPharmacist, err) => {
    //         if (err) {
    //             logEvents(`serviceMessage: ${err}`);
    //         } else {
    //             const uuid_doctorOrPharmacist = doctorOrPharmacist?.dataValues?.uuid_doctorOrPharmacist;
    //             svMessage.sendMessage('feedback__Uuid_doctorOrPharmacist__via__uuid_user', JSON.stringify({ uuid_doctorOrPharmacist: uuid_doctorOrPharmacist }))
    //         }
    //     })
    // })
    
})();