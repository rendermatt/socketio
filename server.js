var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var iom = require("./iomodule.js");
iom.main(io);

const users = process.env.USERS ? JSON.parse(process.env.USERS) : {"admin": "adminpassword", "user": "userpassword"};

process.on("uncaughtException", e => {
  iom.mes(io, "crash", "Unfortunately, NoMoreNotes has crashed.");
  iom.mes(io, "crash", "The complete stack trace is logged below:");
  e.stack.split("\n").forEach((s, i) => iom.mes(io, "crash", `{i.padStart(4, 0)}  {s}`));
  iom.mes(io, "crash", "If this happened an even number of times before, the restart should happen soon.");
  iom.mes(io, "crash", "If this happened an odd number of times before, please wait for Nathan to manually restart the server.");
});

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
app.use('/lib', express.static(__dirname + '/lib'))
app.get("/favicon.ico", (req, res) => {
  res.sendFile(__dirname + "/favicon/drive.ico");
});
app.get("/story.txt", (req, res) => {
  res.sendFile(__dirname + "/story.txt");
});
app.get("/themes.json", (req, res) => {
  res.sendFile(__dirname + "/themes.json");
});

require("./site/module.js")(app); // site urls
require("./chat/module.js")(app); // chat urls
require("./login/module.js")(app); // login urls
require("./test/module.js")(app); // will always give a fake error
require("./vis/module.js")(app); // edit ALL the saveables

app.get("/banned", (req, res) => {
  res.sendFile(__dirname + "/banned.html");
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
