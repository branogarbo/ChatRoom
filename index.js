const express = require('express');
const socket = require('socket.io');
const path = require('path');
const port = 3000;

const app = express();
const server = app.listen(port, console.log(`listening on port ${port}`));

app.use(express.static(path.join(__dirname,'public')));

// socket setup

let io = socket(server);

io.on('connection', socket=>{
   console.log('made socket connection. socket id:',socket.id);

   socket.on('chat', data=>{
      io.sockets.emit('chat', data);
   });

   socket.on('typing', data=>{
      socket.broadcast.emit('typing', data);
   });
});