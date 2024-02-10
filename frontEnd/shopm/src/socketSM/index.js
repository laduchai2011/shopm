import { io } from 'socket.io-client';
import axios from 'axios';

import { SERVER_ADDRESS_GET_SOCKETSM_ROOM, SERVER_ADDRESS_SOCKETSM } from "config/server";


/**
*@typedef {
*room: string,           // notification-chat2
*type: string,
*status: string,
*uuid_user: uuid
*} socketSMRoomOptions
*/
    


class SocketSM {
    constructor() {
        this._Url = SERVER_ADDRESS_GET_SOCKETSM_ROOM;
        this._socketUrl = SERVER_ADDRESS_SOCKETSM;
        this._roomType = 'socketSM';
    }

    connect(callback) {
        this.getSocketSMRoom((resData) => {
            if (resData?.success) {
                this._socket = io(this._socketUrl, {
                    path: `/${this._roomType}`,
                    // transports: ['polling'],
                    withCredentials: true,
                    auth: {
                        secretKey: resData.secretKey,
                        accessToken: resData.accessToken,
                        room: resData.socketSMRoom.room
                    }
                });
        
                this._socket.on("connect", () => {
                    callback();
                }); 
        
                this._socket.on("connect_error", (err) => {
                    // console.log('connect_error_1', err instanceof Error); // true
                    // console.log('connect_error_2', err.message); // not authorized
                    // console.log('connect_error_3', err.data); // { content: "Please retry later" }
                });
        
                this._socket.io.on("error", (error) => {
                    console.error('Error SocketSM', error);
                })
            } else {
                console.log(`socketSM: ${resData?.message}`)
                // alert(`socketSM: ${resData.message}`);
            }
        })
    }

    onDisconnect(callback) {
        this._socket.on("disconnect", (reason) => {
            console.log(`socket ${this._socket.id} disconnected due to ${reason}`);
            this._socket.disconnect();
            callback();
        });
    }

    close() {
        this._socket.disconnect();
    }

    getSocket() {
        return this._socket;
    }

    getSocketSMRoom(callback) {
        let resData;
        axios({
            method: 'get',
            url: `${this._Url}?status=normal&type=notification`,
            withCredentials: true
        }).then(res => {
            resData = res.data;
            // console.log('getSocketSMRoom', resData)
        }).catch(error => console.error(error))
        .finally(() => {
            callback(resData);
        })
    }
}

const socketSM = new SocketSM();

export default socketSM;