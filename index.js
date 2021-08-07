const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let num = 0;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  num++;
  console.log(`${num} users are connected"`);
  console.log(`${socket.id} connected!`);
  // io.emit("chat message", `${socket.id} connected!`);
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    num--;
    console.log(`${socket.id} disconnected!`);
    console.log(`${num} users are connected`);
    io.emit("chat message", `${socket.id} disconnected!`);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
