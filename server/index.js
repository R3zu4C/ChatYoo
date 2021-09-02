const express = require('express');
const http = require('http');
const socket = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = socket(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"]
  }
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send("Server Running...");
})

io.on('connection', (socket) => {
  console.log(`Connection made with ${socket.id}`);

  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
  });
})

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));