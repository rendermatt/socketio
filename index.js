const { socket } = require('server/router');

const express = require('express')();
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.use(express.static('public'))
io.on('connection', (socket) => {
    socket.on('sub_hit_count', hit => {
        console.log(hit)
        io.emit('sub_hit_count', hit.message1, hit.player_name);

    });
});

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});