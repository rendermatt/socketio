const express = require('express');

const { createServer } = require('node:http');

const { Server } = require('socket.io');

const path = require('path');

const port = process.env.PORT || 3000;

const app = express();

const server = createServer(app);

const io = new Server(server);

const users = {};

app.use(express.static(path.join(__dirname, "/html/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/html/index.html");
})

app.post('/users', (req, res) => {
    let id = req.body.id;
    let otherUser = { ...users };
    delete otherUser[id];
    res.status(200).json(otherUser);
})


io.on('connection', (socket) => {
    socket.on('new_user_joined', name => {
        if (name !== 'me' && name != 'server') {
            users[socket.id] = name;
            console.log(`${name} is connected`);
            socket.broadcast.emit('user_joined', name, socket.id);
        } else io.to(socket.id).emit('reload');
    })

    socket.on('send', message => {
        socket.broadcast.emit('message', { message: message, name: users[socket.id] });
    })

    socket.on('personal_send', data => {
        const { message, id } = data;
        if (io.sockets.sockets.has(id)) {
            io.to(id).emit('personal_message', { message, id: socket.id });
        } else {
            console.log('user not found');
        }
    })

    socket.on('typing', (id) => {
        if (id === 'server') {
            socket.broadcast.emit('typing_server');
        } else {
            io.to(id).emit('typing_individual', socket.id);
        }
    })

    socket.on('typingOver', (id) => {
        if (id === 'server') {
            socket.broadcast.emit('typingOver_server');
        } else {
            io.to(id).emit('typingOver_individual', socket.id);
        }
    })

    socket.on('disconnect', () => {
        if (users[socket.id] != null) {
            const disconnectedUserName = users[socket.id];
            delete users[socket.id]; // Remove the user from the users object
            socket.broadcast.emit('user_removed', disconnectedUserName, socket.id);
            console.log(disconnectedUserName + ' is disconnected');
        }
    });
});

server.listen(port, console.log(`Server Start on http://localhost:${port}`));