import io from "socket.io-client";

const port = "5000";

class WebsocketService {
    constructor() {
        const uri = window.location.protocol + "//" + window.location.hostname + ":" + port;
        this.socket = io(uri);
    }

    subscribe(event, callback) {
        this.socket.on(event, callback);
    }

    dispatch(event, data) {
        this.socket.emit(event, data);
    }
}

let websocketService = new WebsocketService();
export {websocketService as WebsocketService};