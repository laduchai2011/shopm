'use strict';
require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');
const { format } = require('date-fns');
const { v4: uuidv4 } = require('uuid');
const { SvMessage } = require('../src/model/svMessage');


const VM =process.env.VM;
const service = process.env.SERVICE;

// const fileName = path.join(__dirname, '../Logs', 'logs.log');

const logEvents = async ( msg ) => {
    const dateTime = `${format(new Date(), 'dd-MM-yyyy\tss:mm:HH')}`;
    const contentLog = `${dateTime}--------${msg}\n`;
    try {
        // fs.appendFile(fileName, contentLog);
        LogError(contentLog);
    } catch (error) {
        console.error(error)
    }
}

const LogError = async (contentLog) => {
    const svMessage = new SvMessage();
    await svMessage.init();
    const _id = uuidv4();
    const logOptions = {
        VM: VM,
        service: service,
        type: 'error',
        log: contentLog,      
        image: '',
        video: '',
        document: '',
        note: '',
        read: false,
        fixbug: false
    }

    function handleFeedback(message) {
        const log = JSON.parse(message).log;
        const id = JSON.parse(message).id;
        if (_id === id) {
            // do not anything
        }
        svMessage.close();
    }

    await this._svMessage.receiveMessage(`feedback__TKS_log_Error___${_id}`, { unsubscribe: true }, handleFeedback);
    this._svMessage.sendMessage('require__TKS_log_Error', JSON.stringify({ id: _id, logOptions: logOptions }));
}

module.exports = { logEvents };