import io from "socket.io-client";

const port = "5000";

class WebsocketService {
    constructor() {
        const uri = window.location.protocol + "//" + window.location.hostname + ":" + port;
        this.socket = io(uri);
    }

    createRoom() {
        this.roomId = Math.floor(Math.random() * 50000);
        this.socket.emit("createRoom", this.roomId);
        return this.roomId;
    }
    
    joinRoom(roomId) {
        this.roomId = roomId;
        this.socket.emit("joinRoom", roomId);
    }

    subscribe(event, callback) {
        this.socket.on(event, callback);
    }

    dispatch(event, data) {
        this.socket.emit(event, {roomId: this.roomId, data});
    }
}

let websocketService = new WebsocketService();
export {websocketService as WebsocketService};