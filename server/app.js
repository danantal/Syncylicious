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
    console.log("User connected.");
    socket.on("drawing", (data) => socket.broadcast.emit("drawing", data));
    socket.on("disconnect", () => console.log("User disconnected."))
});

module.exports = app;