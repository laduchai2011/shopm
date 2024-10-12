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

    await svMessage.receiveMessage(`feedback__TKS_log_Error___${_id}`, { unsubscribe: true }, handleFeedback);
    svMessage.sendMessage('require__TKS_log_Error', JSON.stringify({ id: _id, logOptions: logOptions }));
}

const logColors = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
    
    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",
    FgGray: "\x1b[90m",
    
    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m",
    BgGray: "\x1b[100m",
}

const devLog = (colors, string) =>{
    if (process.env.NODE_ENV === 'development') {
        console.log('\x1b[33m%s\x1b[0m', string);
    }

    let selectedColor;

    switch(color.code) {
        case 'yellow':
          // code block
            break;
        case y:
          // code block
            break;
        default:
            selectedColor = logColors.FgWhite
      }
}

module.exports = { logEvents, devLog };