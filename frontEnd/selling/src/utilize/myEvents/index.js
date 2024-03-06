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

        // start callback
        const listenEvent_m = listenEvent();
        listenEvent_m.next();

        const eventIndex = this._events.length - 1;
        let indexOf = null;
        for (let i = 0; i <= eventIndex; i++) {
            if (this._events[i].event === event) {
                indexOf = i;
            }
        }

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

    onFirst(event, callback) {
        function* listenEvent() {
            while(true) {
                let result = yield 1;
                callback(result);
            }
        }

        // start callback
        const listenEvent_m = listenEvent();
        listenEvent_m.next();

        const eventIndex = this._events.length - 1;
        let indexOf = null;
        for (let i = 0; i <= eventIndex; i++) {
            if (this._events[i].event === event) {
                indexOf = i;
            }
        }

        if (indexOf !== null) {
            this._events[indexOf].listenEvent = listenEvent_m;
        } else {
            const newEvent = {
                listenEvent: listenEvent_m,
                event: event,
                finish: true
            }
            this._events.push(newEvent);
        }
    }

    emitFirst(event, data) {
        const eventIndex = this._events.length - 1;
        for (let i = 0; i <= eventIndex; i++) {
            if ((this._events[i].event === event) && this._events[i].finish) {
                this._events[i].finish = false;
                this._events[i].listenEvent.next(data);
            }
        }
    }

    finishFirst(event) {
        const eventIndex = this._events.length - 1;
        for (let i = 0; i <= eventIndex; i++) {
            if ((this._events[i].event === event)) {
                this._events[i].finish = true;
            }
        }
    }
}

const myEvents = new MyEvents();

export default myEvents;