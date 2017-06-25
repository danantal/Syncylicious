// server/app.js
const express = require("express");
const app = express();
const io = require("socket.io");

// // Serve static assets
// app.use(express.static(path.resolve(__dirname, "..", "build")));

// // API middleware
// app.use("/api", routerApi);

// // Always return the main index.html, so react-router render the route in the client
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
// });

const PORT = process.env.PORT || 5000;

const http = app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

const socketServer = io(http);
socketServer.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("createRoom", (roomId) => {
        socket.join(roomId);
        console.log(`User: ${socket.id} created room: ${roomId}`);
        socketServer.sockets.to(socket.id).emit("roomJoined", {roomId});
    });
    socket.on("joinRoom", (roomId) => {
        if(socketServer.sockets.adapter.rooms[roomId] != null) {
            socket.join(roomId);
            console.log(`User joined room: ${roomId}`);
            socketServer.sockets.to(socket.id).emit("roomJoined", {roomId});
        }
    });
    socket.on("drawing", (payload) => socket.broadcast.to(payload.roomId).emit("drawing", payload.data));
    socket.on("disconnect", () => console.log("User disconnected."))
});

module.exports = app;