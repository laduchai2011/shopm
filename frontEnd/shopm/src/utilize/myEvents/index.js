class MyEvents {
    constructor() {
        this._events = [];
    }

    on(event, callback) {
        function* listenEvent() {
            while(true) {
                let result = yield 1;
                callback(result);
            }
        }
        
        const eventIndex = this._events.length - 1;
        let indexOf = null;
        for (let i = 0; i <= eventIndex; i++) {
            if (this._events[i].event === event) {
                indexOf = i;
            }
        }

        // start callback
        const listenEvent_m = listenEvent();
        listenEvent_m.next();

        if (indexOf !== null) {
            this._events[indexOf].listenEvent = listenEvent_m;
        } else {
            const newEvent = {
                listenEvent: listenEvent_m,
                event: event,
            }
            this._events.push(newEvent);
        }
    }

    emit(event, data) {
        const eventIndex = this._events.length - 1;
        for (let i = 0; i <= eventIndex; i++) {
            if (this._events[i].event === event) {
                this._events[i].listenEvent.next(data);
            }
        }
    }

    destroy(event) {
        let indexOf = null;
        const eventIndex = this._events.length - 1;
        for (let i = 0; i <= eventIndex; i++) {
            if (this._events[i].event === event) {
                indexOf = i;
            }
        }

        this._events.splice(indexOf, 1);
    }
}

const myEvents = new MyEvents();

export default myEvents;