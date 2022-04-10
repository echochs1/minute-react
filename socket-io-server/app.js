const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 3001;
const index = require("./routes/index");
const app = express();


var cors = require('cors');
app.use(index);
app.use(cors());
const server = http.createServer(app);
const wss = new WebSocket.Server({server})
app.post("/", (req, res) => console.log("temp"));
const io = socketIo(server, {cors: {origin: "*"}}); // < Interesting!

wss.on("connection", function connection(ws) {
    console.log("new connection initiated");
})

const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
  };

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

io.on("completed", (res) => {
    console.log(res.data);
})


server.listen(port, () => console.log(`Listening on port ${port}`));