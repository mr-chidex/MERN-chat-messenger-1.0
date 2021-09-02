const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected - ", socket.id);

  //join room
  socket.on("joinRoom", ({ username, room }) => {
    socket.join(room);

    console.log(`${username} joined romm - ${room}`);

    //emits to current user only
    // socket.emit("message", {
    //   action: "USER_JOINED_ROOM",
    //   payload: `Welcome to ${room}`,
    // });

    //emits to all users except cuurent user in a particular room(group)
    // socket.broadcast.to(room).emit("message", {
    //   action: "NOTIFY_USERS",
    //   payload: `${username} just joined`,
    // });
  });

  socket.on("sendMessage", (data) => {
    console.log(data);

    // socket.broadcast.to(data.room).emit("message", {
    //   action: "Notify_Users",
    //   payload: { data },
    // });

    //emits to all user but yourself
    socket.to(data.room).emit("recieveMessage", {
      action: "Notify_Users",
      payload: { data },
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});
