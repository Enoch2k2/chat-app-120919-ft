const express = require("express");
const socket = require("socket.io");
const app = express();


app.use(express.static('public'));

app.get('/', (req, resp) => resp.sendFile('index.html'));

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('listening on port: 3000')
})

const io = socket(server);

const users = [];

// const io = socket(server); adds a socket.io listener to our server

io.on('connection', function (socket) {
  console.log('made socket connection', socket.id);

  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data);
  })

  socket.on('message', function (data) {
    io.sockets.emit('message', data);
  })

  socket.on('login', function (data) {
    let user = { ...data, id: socket.id };
    users.push(user);
    io.sockets.emit('login', { user: data, users: users });
  })

  socket.on('disconnect', function () {
    let user = users.find(user => user.id === socket.id);
    let index = users.indexOf(user);
    users.splice(index, 1);
    io.sockets.emit('logout', { user, users });
  })
})

// responds to clients connecting to our server
// io.on('connection', function (socket) {
//   console.log('made socket connection', socket.id);
// }

/*
  io.sockets.emit - emits to all clients including yours

  socket.broadcast.emit - emits to all clients excluding yours
*/