const socket = io();

// jab ham apna nam dal k andar ayenge tab ye kam krega
function new_user_joined(name) {
    socket.emit('new_user_joined', name);
    fetch('/users', {
        method: 'POST',
        body: JSON.stringify({ id: socket.id }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => response.json())
        .then(data => {
            insertOldUser(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function send_message(message) {
    chats['server'].push({ 'me': message });
    socket.emit('send', message);
}

function send_personal_message(message, id) {
    chats[id].push({ 'me': message });
    socket.emit('personal_send', { message: message, id: id });
}

function typing(id){
    socket.emit('typing', id);
}

function typingOver(id){
    socket.emit('typingOver', id);
}

socket.on('user_joined', (name, id) => {
    if (name != null) {
        updateMessage('server', 'server', `${name} is join chat`);
        addUser(name, id);
        chats[id] = [];
        chaters[id] = { name: name, value: 0, chat: 0 };
    }
})

socket.on('personal_message', data => {
    updateMessage(data.id, 'personal', data.message);
})

socket.on('user_removed', (name, id) => {
    if (name !== null) {
        if (activeChat === id){
            loadChatRoom('server');
            document.getElementById('server').click();
        }
        updateMessage('server', 'server', `${name} is left chat`);
        removeUser(id);
        delete chats[id];
        delete chaters[id];
    }
})

socket.on('message', data => {
    updateMessage('server', data.name, data.message);
})

socket.on('typing_server', () => {
    chaters['server'].chat++;
    onTypingIndicator('server');
})

socket.on('typing_individual', (id) => {
    chaters[id].chat++;
    onTypingIndicator(id);
})

socket.on('typingOver_server',()=>{
    chaters['server'].chat--;
    offTypingIndicator('server');
})

socket.on('typingOver_individual',(id)=>{
    chaters[id].chat--;
    offTypingIndicator(id);
})

socket.on('reload', () => {
    window.location.reload();
})