require('dotenv').config();
const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const cookieParser = require('socket.io-cookie-parser');
const { SocketSM_Authentication } = require('./src/auth/SocketSM_Authentication');

const baseURL_shopm = process.env.NODE_ENV_BASEURL_SHOPM || 'http://192.168.5.129:3000';

let secure_cookie = false;
if (process.env.NODE_ENV !== 'development') {
    secure_cookie = true;
}

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, { 
    path: '/socketSM', 
    cors: {
        origin: baseURL_shopm,
        methods: ["GET", "POST"],
        credentials: true
    },
    cookie: {
        name: 'socketSM',
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: secure_cookie
    }
});

io.use(cookieParser());
io.use(SocketSM_Authentication);

io.on("connection", (socket) => {
    const room = socket.handshake.auth.room;
    socket.join(room);

    socket.on("disconnect", (reason) => {
        // console.log(`socket ${socket.id} disconnected due to ${reason}`);
        const room = socket.handshake.auth.room;
        socket.leave(room);
        socket.disconnect(true);
    });
});

const PORT = process.env.NODE_SERVER_PORT_KEY || 2100;

httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`( SocketSM ) Listening on port ${PORT}!`);
});