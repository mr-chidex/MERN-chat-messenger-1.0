const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5050;

const users = require("./routes/users");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", users);

//conect db and start server
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected...");
    server.listen(PORT, () => console.log(`server running on ${PORT}...`));
  })
  .catch((err) => console.log(err));

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected - ", socket.id);

  //join room
  socket.on("joinRoom", (roomData) => {
    socket.join(roomData.room);
    console.log(`${roomData.user.username} joined romm - ${roomData.room}`);

    // emits to current user only
    socket.emit("message", {
      action: "USER_JOINED_ROOM",
      payload: `Welcome to ${roomData.room}`,
    });

    //emits to all users except cuurent user in a particular room(group)
    socket.broadcast.to(roomData.room).emit("message", {
      action: "NOTIFY_USERS",
      payload: `${roomData.user.username} just joined`,
    });
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
