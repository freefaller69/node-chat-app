const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const public = path.join(__dirname, '../public');
app.use(express.static(public));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined chat'));

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);

    io.emit('newMessage', generateMessage(message.from, message.text));

  });

  socket.on('disconnect', () => {
    console.log('User disconnected from server');
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Running on port ${port}.`);
});