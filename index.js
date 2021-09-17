const express = require('express')
const app = new express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const srcDir = require('app-root-path');
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');

});
// app.use(express.static(`${srcDir}/scripts`));

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
