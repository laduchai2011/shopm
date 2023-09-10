// class testObservable {
//     constructor() {
//         this._events = [];
//     }

//     on(event, callback) {
//         function* listenEvent() {
//             while(true) {
//                 callback(yield 1);
//             }
//         }
        
//         const newEvent = {
//             listenEvent: listenEvent(),
//             event: event,
//         }
//         this._events.push(newEvent);
//     }

//     emit(event, data) {
//         const eventIndex = this._events.length - 1;
//         for (let i = 0; i <= eventIndex; i++) {
//             if (this._events[i].event === event) {
//                 this._events[i].listenEvent.next(data);
//             }
//         }
//     }
// }

// const testObservable_m = new testObservable();

// testObservable_m.on('data', (data) => {
//     console.log('data', data)
// })

// setInterval(() => {
//     // console.log('setInterval');
//     testObservable_m.emit('data', 'hello 1111111111')
// }, 1000)

const arr = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

for (let i = 0; i < arr.length; i++) {
    if (arr.indexOf(1) !== -1) {
        arr.splice(arr.indexOf(1), 1)
    }
    console.log(arr)
}