'use strict';
const { logEvents } = require('./logEvents');
const { SvMessage } = require('./src/model/svMessage');
const { departmentGroupCRUD } = require('./src/model/CRUDDATABASE/CRUD_DepartmentGroup');

(async () => {
    const svMessage = new SvMessage();
    await svMessage.init();

    await svMessage.receiveMessage('require__departmentGroup__via__uuid_departmentGroup', { unsubscribe: false }, (message) => {
        console.log('\x1b[33m%s\x1b[0m', 'require__departmentGroup__via__uuid_departmentGroup');
        const uuid_departmentGroup = JSON.parse(message).uuid_departmentGroup;
        const id = JSON.parse(message).id;
        departmentGroupCRUD.readWithUid(uuid_departmentGroup, (departmentGroup, err) => {
            if (err) {
                logEvents(`serviceMessage: ${err}`);
            } 

            svMessage.sendMessage(`feedback_require__departmentGroup__via__uuid_departmentGroup___${id}`, JSON.stringify({id: id, departmentGroup: departmentGroup, err: err }));
        })
    })
})();