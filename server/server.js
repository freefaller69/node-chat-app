const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const public = path.join(__dirname, '../public');
app.use(express.static(public));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'dave',
    text: 'Hey, can we meet later?',
    createdAt: new Date()
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from server');
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Running on port ${port}.`);
});