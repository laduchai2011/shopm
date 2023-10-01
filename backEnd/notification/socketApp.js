'use strict';
require('dotenv').config();
const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const socketApp = express.call();

let secure_cookie = false;
if (process.env.NODE_ENV !== 'development') {
    secure_cookie = true;
}

const httpServer = createServer(app);
const io = new Server(httpServer, { 
    path: '/notification', 
    cors: {
        origin: baseURL_shopm,
        methods: ["GET", "POST"],
        credentials: true
    },
    cookie: {
        name: 'myNotification',
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: secure_cookie
    }
});

io.use(cookieParser());
// io.use(Authentication);

io.on("connection", (socket) => {

    socket.on('begin', msg => {
        console.log(msg, socket.request.cookies)
        socket.request.cookies.testCookie = 'testCookie'
    })

    socket.on("disconnect", (reason) => {
        console.log(`socket ${socket.id} disconnected due to ${reason}`);
        socket.disconnect(true);
    });
});