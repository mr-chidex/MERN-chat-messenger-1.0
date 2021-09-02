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

require("./socket");

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
