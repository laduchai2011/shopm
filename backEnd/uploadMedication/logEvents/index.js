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

const logError = async ( msg ) => {
    const dateTime = `${format(new Date(), 'dd-MM-yyyy\tss:mm:HH')}`;
    const contentLog = `${dateTime}--------${msg}\n`;
    try {
        // fs.appendFile(fileName, contentLog);
        Log(contentLog, 'error');
    } catch (error) {
        console.error(error)
    }
}

const logWarn = async ( msg ) => {
    const dateTime = `${format(new Date(), 'dd-MM-yyyy\tss:mm:HH')}`;
    const contentLog = `${dateTime}--------${msg}\n`;
    try {
        // fs.appendFile(fileName, contentLog);
        Log(contentLog, 'warn');
    } catch (error) {
        console.error(error)
    }
}

const logEvent = async ( msg ) => {
    const dateTime = `${format(new Date(), 'dd-MM-yyyy\tss:mm:HH')}`;
    const contentLog = `${dateTime}--------${msg}\n`;
    try {
        // fs.appendFile(fileName, contentLog);
        Log(contentLog, 'event');
    } catch (error) {
        console.error(error)
    }
}

const logEvents = async ( msg ) => {
    const dateTime = `${format(new Date(), 'dd-MM-yyyy\tss:mm:HH')}`;
    const contentLog = `${dateTime}--------${msg}\n`;
    try {
        // fs.appendFile(fileName, contentLog);
        Log(contentLog, 'error');
    } catch (error) {
        console.error(error)
    }
}

const logEvents1 = async ( content ) => {
    const dateTime = `${format(new Date(), 'dd-MM-yyyy\tss:mm:HH')}`;
    const contentLog = {
        time: dateTime,
        content: content
    }
    try {
        Log(contentLog, 'error');
    } catch (error) {
        console.error(error)
    }
}

const Log = async (contentLog, type) => {
    const svMessage = new SvMessage();
    await svMessage.init();
    const _id = uuidv4();
    const logOptions = {
        VM: VM,
        service: service,
        type: type,
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

    await svMessage.receiveMessage(`feedback__TKS_log_Error___${_id}`, { unsubscribe: true }, handleFeedback);
    svMessage.sendMessage('require__TKS_log_Error', JSON.stringify({ id: _id, logOptions: logOptions }));
}

module.exports = { 
    logEvents, 
    logEvents1, 
    logEvent, 
    logError, 
    logWarn 
};