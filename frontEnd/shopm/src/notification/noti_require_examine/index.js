// import { io } from 'socket.io-client';
// import axios from 'axios';

// import { SERVER_ADDRESS_GET_NOTIFICATION_ROOM, SERVER_ADDRESS_NOTI_REQUIRE_EXAMINE } from "config/server";

// class Noti_require_examine {
//     constructor() {
//         this._socketUrl = SERVER_ADDRESS_NOTI_REQUIRE_EXAMINE;
//         this._roomType = 'notification_require_examine';
//     }

//     connect() {
//         this.getNotificationRoom((resData) => {
//             if (resData.success) {
//                 this._socket = io(this._socketUrl, {
//                     path: `/${this._roomType}`,
//                     // transports: ['polling'],
//                     withCredentials: true,
//                     auth: {
//                         secretKey: resData.secretKey,
//                         accessToken: resData.accessToken,
//                         room: resData.notificationRoom.room
//                     }
//                 });
        
//                 this._socket.on("connect", () => {
//                     console.log(this._socket.connected); // true
//                 }); 
        
//                 this._socket.on("connect_error", (err) => {
//                     console.log('connect_error_1', err instanceof Error); // true
//                     console.log('connect_error_2', err.message); // not authorized
//                     console.log('connect_error_3', err.data); // { content: "Please retry later" }
//                 });
        
//                 this._socket.io.on("error", (error) => {
//                     console.error(error);
//                 })
//             } else {
//                 alert(resData.message);
//             }
//         })
//     }

//     disconnect() {
//         this._socket.on("disconnect", (reason) => {
//             console.log(`socket ${this._socket.id} disconnected due to ${reason}`);
//             this._socket.disconnect();
//         });
//     }

//     close() {
//         this._socket.disconnect();
//     }

//     getSocket() {
//         return this._socket;
//     }

//     getNotificationRoom(callback) {
//         let resData;
//         axios({
//             method: 'get',
//             url: `${SERVER_ADDRESS_GET_NOTIFICATION_ROOM}?roomType=${this._roomType}`,
//             withCredentials: true
//         }).then(res => {
//             resData = res.data;
//             console.log(resData)
//         }).catch(error => console.error(error))
//         .finally(() => {
//             callback(resData);
//         })
//     }
// }

// const noti_require_examine = new Noti_require_examine();

// export default noti_require_examine;