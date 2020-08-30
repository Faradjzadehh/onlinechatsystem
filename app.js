const express = require('express');
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const users = [];
const messages = [];

app.get("/",(req,res) => {
    res.sendFile(__dirname+"/index.html");
});

io.on("connection",(socket) => {
    socket.on("newUser",(userName) => {
        users.push({
            id:socket.id,
            name : userName
        });
        io.emit("users",users)
    });
    socket.on("sendMessageClient",(info) => {
        messages.push(info);
        io.emit("messagesServer",messages);
    });
});

http.listen(3000,() => {
    console.log(`Server running..`)
});