'use strict';

function notification_require_examine () {
    require('dotenv').config();
    const express = require('express');
    const { createServer } = require("http");
    const { Server } = require("socket.io");
    const cookieParser = require('socket.io-cookie-parser');
    const { Notification_Authentication } = require('../../auth/Notification_Authentication');

    const baseURL_shopm = process.env.NODE_ENV_BASEURL_SHOPM || 'http://172.18.240.1:3000';
    
    let secure_cookie = false;
    if (process.env.NODE_ENV !== 'development') {
        secure_cookie = true;
    }

    const app = express();
    const httpServer = createServer(app);

    const io = new Server(httpServer, { 
        path: '/notification_require_examine', 
        cors: {
            origin: baseURL_shopm,
            methods: ["GET", "POST"],
            credentials: true
        },
        cookie: {
            name: 'notification_require_examine',
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: secure_cookie
        }
    });
    
    io.use(cookieParser());
    io.use(Notification_Authentication);
    
    io.on("connection", (socket) => {
    
        socket.on('begin', msg => {
            console.log(msg)
        })
    
        socket.on("disconnect", (reason) => {
            console.log(`socket ${socket.id} disconnected due to ${reason}`);
            socket.disconnect(true);
        });
    });

    const PORT = process.env.NODE_SERVER_PORT_KEY ? (process.env.NODE_SERVER_PORT_KEY + 100) : 2100;

    httpServer.listen(PORT, '0.0.0.0', () => {
        console.log(`( notification_require_examine ) Listening on port ${PORT}!`);
    });
}

module.exports = notification_require_examine;