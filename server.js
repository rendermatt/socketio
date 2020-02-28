var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

const users = process.env.USERS ? JSON.parse(process.env.USERS) : {"admin": "adminpassword", "user": "userpassword"};



/*
const whoDisBot = {
  botName: "WhoDisBot",
  onJoin: (socket) => {
    setTimeout(this.whoDis, 1000*Math.random());
  },
  whoDis: () => {
    io.emit("chat message", `& <${this.botName}> who dis?`);
  },
  
  onLeave: (socket) => {
    setTimeout(this.whoDat(socket), 1000*Math.random());
  },
  whoDat: () => {
    io.emit("chat message", `& <${this.botName}> who dat?`);
  }
};
*/





app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/chat/index.html');
});

app.get("/favicon.ico", (req, res) => {
  res.sendFile(__dirname + "/favicon/drive.ico");
});

require("./site/module.js")(app); // site urls

// static content
app.get("/chat.js", (req, res) => {
  res.sendFile(__dirname + "/chat/main.js");
});
app.get("/chat.css", (req, res) => {
  res.sendFile(__dirname + "/chat/styles.css");
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});
