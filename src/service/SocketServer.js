import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = require('socket.io')(httpServer);

io.on("connection", (socket) => {
    client.on('completed', data => { console.log(data) });
});

httpServer.listen(3000);