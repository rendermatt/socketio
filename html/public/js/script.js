// this is a container which show chats your and senders
let container = document.querySelector('.container');
// this is button id which which click we send message
let send = document.getElementById('send');
// this is a input field which contains input message
let message = document.getElementById('message');
// it contain all user div
let users = document.querySelectorAll('.user');
// it contain all user div
let chat_users = document.querySelector('.chat-users');
// it contain all chatroom like container, message box 
let chat_room = document.querySelector('.chat-room');
// it contain name tag of sender
let name = document.getElementById('name');
// it contain a receive notification tune
const audio = new Audio('./tune/tune.mp3');
// server is alwase a starting active chat
let activeChat = 'server';
// search input
let search = document.getElementById('search');

// here we contain all chats
const chats = { 'server': [{ 'server': 'Welcome to the Gapshap Server' }] };

// here we contain all chaters
const chaters = { 'server': { name: 'Our Server Group', value: 0, chat: 0} };

// this button is when button press for chat
send.addEventListener('click', () => {
    if (message.value != '') {
        createDiv(message.value, "me");
        if (activeChat === 'server')
            send_message(message.value);
        else
            send_personal_message(message.value, activeChat);
        message.value = '';
    }
})

// when i click enter then it work to send message
message.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        send.click();
    }
})

// when i start focus on typing
message.addEventListener('focus',()=>{
    typing(activeChat);
})

message.addEventListener('blur', ()=>{
    typingOver(activeChat);
})

// it scroll container at getting message
function scrollToBottom() {
    container.scrollTop = container.scrollHeight;
}

// it add a div to chatusers when new user join chat
function addUser(name, id) {
    let div = document.createElement('div');
    div.id = id;
    div.classList.add('user');
    let html;
    if (id === 'server')
        html = `<div class="icon"><i class="fa fa-users"></i></div><div class="name">${name} <p class="typing">someone is typing <span class="typing-indicator"></span></p></div>`;
    else
        html = `<div class="icon"><i class="fa fa-user"></i></div><div class="name">${name} <p class="typing">typing <span class="typing-indicator"></span></p></div>`;
    div.innerHTML = html;
    chat_users.append(div);
    users = document.querySelectorAll('.user');
}

// it remove that user div when any user leave server
function removeUser(id) {
    let div = document.getElementById(id);
    chat_users.removeChild(div);
}

// this is a div which create a div for message in container for sender and me
function createDiv(message, classname) {
    let div = document.createElement('div');
    div.classList.add(classname);
    let chat = `<p></p>`;
    div.innerHTML = chat;
    div.querySelector('p').textContent = message;
    container.append(div);
    scrollToBottom();
}

// this create a div for private sender
function createPrivateSenderDiv(message) {
    let div = document.createElement('div');
    div.classList.add('sender');
    let chat = `<p class='personal'></p>`
    div.innerHTML = chat;
    div.querySelector('p').textContent = message;
    container.append(div);
    scrollToBottom();
}

// this create a div for sender pulicly at server chat 
function createSenderDiv(message, name) {
    let div = document.createElement('div');
    div.classList.add('sender');
    let chat = `<div class="chat"><span>${name}</span><p></p></div>`;
    div.innerHTML = chat;
    div.querySelector('.chat p').textContent = message;
    container.append(div);
    scrollToBottom();
}

// it when i click and user div
document.querySelector('.users').addEventListener('click', function (event) {
    const userElement = event.target.closest('.user');
    if (userElement) {
        document.querySelector('.users').classList.add('small');
        document.querySelector('.select').classList.remove('select');
        userElement.classList.add('select');

        removeRemain(userElement.id);
        if (userElement.id !== activeChat) {
            activeChat = userElement.id;
            loadChatRoom(userElement.id);
        }
    }
});

// it use for responsive design to show users of chat room at a time
document.getElementById('close').addEventListener('click', () => {
    document.querySelector('.users').classList.remove('small');
})

// when new user join it insert all previous user
function insertOldUser(datas) {
    for (const dataId in datas) {
        if (!(dataId in chats)) {
            addUser(datas[dataId], dataId);
            chats[dataId] = [];
            chaters[dataId] = { name: datas[dataId], value: 0 , chat: 0};
        }
    }
}

// it tell a how many new message arrived
function addRemain(id) {
    let p;
    const div = document.getElementById(id);
    if (chaters[id].value == 0) {
        p = document.createElement('p');
        p.classList.add('remain');
    } else {
        p = document.querySelector(`#${id} .remain`);
    }
    chaters[id].value++;
    p.innerText = chaters[id].value;
    document.title = "Gapshap - New Message";
    div.append(p);
}

// it remove all new message arived when i checked
function removeRemain(id) {
    if (chaters[id].value > 0) {
        const div = document.getElementById(id);
        let p = div.childNodes[2];
        div.removeChild(p);
        document.title = "Gapshap";
        chaters[id].value = 0;
    }
}

// it update a message to container and chat data
function updateMessage(position, from, message) {
    if (position === 'server') {
        let messageObject = {};
        messageObject[from] = message;
        chats[position].push(messageObject);
        const notification = `<b>${from} </b>: ${message}`;
        notifyMe(position, notification);
        addRemain(position)
        if (position === activeChat) {
            if (from === 'server')
                createDiv(message, from);
            else createSenderDiv(message, from);
            if (screen.width > 900) removeRemain(position);
        }

    } else {
        chats[position].push({ 'sender': message });
        let name = document.getElementById(position).innerText;
        const notification = `<b>${name} </b>: ${message}`;
        notifyMe(name, notification);
        addRemain(position);
        if (position === activeChat) {
            createPrivateSenderDiv(message);
            if (screen.width > 900) removeRemain(position);
        }
    }
}

// it load message at every user
function loadMessage(id) {
    container.innerHTML = '';
    let chatArray = chats[id];
    if (id === 'server') {
        for (let i = 0; i < chatArray.length; i++) {
            for (const [name, value] of Object.entries(chatArray[i])) {
                if (name === 'me') createDiv(value, name);
                else if (name === 'server') createDiv(value, name);
                else createSenderDiv(value, name)
            }
        }
    } else {
        for (let i = 0; i < chatArray.length; i++) {
            for (const [name, value] of Object.entries(chatArray[i])) {
                if (name === 'me') createDiv(value, name);
                else if (name === 'sender') createPrivateSenderDiv(value);
            }
        }
    }
}

// it load a chat room for every user
function loadChatRoom(id) {
    if (id === 'server') {
        chat_room.childNodes[1].childNodes[3].childNodes[1].innerHTML = `<i class="fa fa-users"></i>`;
        document.querySelector('.chat-room').querySelector('.typing').innerHTML = 'someone is typing <span class="typing-indicator"></span>';
    } else {
        chat_room.childNodes[1].childNodes[3].childNodes[1].innerHTML = `<i class="fa fa-user"></i>`;
        document.querySelector('.chat-room').querySelector('.typing').innerHTML = 'typing <span class="typing-indicator"></span>';
    }
    if(chaters[id].chat > 0){
        document.querySelector('.chat-room').querySelector('.typing').style.display = 'block';
        typingIndicator(document.querySelector('.chat-room').querySelector('.typing'))
    }
    else
        document.querySelector('.chat-room').querySelector('.typing').style.display = 'none';
    name.innerText = chaters[id].name;
    loadMessage(id);
}

// it give a notification when i get a new message
function notifyMe(position, message) {
    if (!("Notification" in window)) {
        alert(message);
    } else if (Notification.permission === 'granted') {
        const notification = new Notification(position, { body: message, icon: './image/gapshap.png' });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                const notification = new Notification(position, { body: message, icon: './image/gapshap.png' });
            }
        })
    }
    audio.play()
}

// search users
let timeout;
search.addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        if (search.value != '') {
            chat_users.innerHTML = '';
            addUser(chaters['server'].name, 'server');
            if (chaters['server'].value > 0) {
                chaters['server'].value--;
                addRemain('server');
            }
            document.getElementById('server').classList.add('select');
            const usersKey = getUsers(search.value);

            for (const key of usersKey) {
                addUser(chaters[key].name, key);
                if (chaters[key].value > 0) {
                    chaters[key].value--;
                    addRemain(key);
                }
            }
        } else {
            chat_users.innerHTML = '';
            for (const key in chaters) {
                addUser(chaters[key].name, key);
                if (chaters[key].value > 0) {
                    chaters[key].value--;
                    addRemain(key);
                }
            }
            document.getElementById(activeChat).classList.add('select');
        }
    }, 800);
})

function getUsers(name) {
    const availableUsers = [];
    // Convert the search string to lowercase for case-insensitive comparison
    const lowerCaseName = name.toLowerCase();
    // Iterate over the keys of the 'chaters' object
    for (const key in chaters) {
        if (chaters.hasOwnProperty(key) && key != 'server') {
            // Convert the name property to lowercase for case-insensitive comparison
            const lowerCaseUserName = chaters[key].name.toLowerCase();

            // Check if the lowercased name property contains the lowercased search string
            if (lowerCaseUserName.includes(lowerCaseName)) {
                // Add the user to the availableUsers object
                availableUsers.push(key);
            }
        }
    }

    return availableUsers;
}

// new fnction for implementation
function onTypingIndicator(id) {
    let div = document.getElementById(id);
    let p = div.querySelector('.typing');
    p.style.display = 'block';
    if(id === activeChat){
        document.querySelector('.chat-room').querySelector('.typing').style.display = 'block';
        typingIndicator(document.querySelector('.chat-room').querySelector('.typing'));
    }
    typingIndicator(p);
}

function offTypingIndicator(id){
    let div = document.getElementById(id);
    let p = div.querySelector('.typing');
    if(document.querySelector('.chat-room').querySelector('.typing').style.display == 'block')
        document.querySelector('.chat-room').querySelector('.typing').style.display = 'none';
    p.style.display = 'none';
}

function typingIndicator(div){
    let typingIndicator = div.querySelector('.typing-indicator');
    typingIndicator.innerHTML = ''; // Reset the content

    // Simulate typing animation with dots
    const numDots = 3;
    const typingInterval = setInterval(() => {
        const currentDots = typingIndicator.innerHTML;
        if (currentDots.length < numDots) {
            typingIndicator.innerHTML += '.';
        } else {
            typingIndicator.innerHTML = '';
        }
    }, 600);
}