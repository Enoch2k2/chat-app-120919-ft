const express = require("express");
const app = express();


app.use(express.static('public'));

app.get('/', (req, resp) => resp.sendFile('index.html'));

app.listen(process.env.PORT || 3000, () => {
  console.log('listening on port: 3000')
})


// const io = socket(server); adds a socket.io listener to our server

// responds to clients connecting to our server
// io.on('connection', function (socket) {
//   console.log('made socket connection', socket.id);
// }

/*
  io.sockets.emit - emits to all clients including yours

  socket.broadcast.emit - emits to all clients excluding yours
*/