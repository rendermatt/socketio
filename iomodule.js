module.exports = {};
const pf = require("./prefixes.js");
const cmdmod = require("./command-processor.js");
const names = {};
const apply_name = module.exports.apply_name = (who, name) => {
  who.broadcast.emit("chat message", `${pf.alert} ${names[who.id]} has applied name ${name}.`);
  names[who.id] = name;
  who.emit("chat message", `${pf.cmdresp} Name applied successfully.`);
};

const ipToSocket = {};

const magic = module.exports.magic = (sender, msg) => {
  cmdmod(msg, sender);
  switch (msg) {
    case "/iam AFilledPool":
      apply_name(sender, "PoolloverNathan"); return true;
    //case "/iam Freshdude":
    //  apply_name(sender, "DarkWolf129"); return true;
    case "/iam Adam":
      //sender.disconnect(); return true;
      apply_name(sender, "Azandfer"); return true;
    //case "/iam pokepat12":
    //  apply_name(sender, "Poképat12"); return true;
    case "/imnot":
      names[sender.id] = sender.id.slice(0,8);
      sender.emit("chat message", `${pf.cmdresp} You are now annonymous.`);
    case "":
      return true;
    case "/moo":
      sender.emit("chat message", `${pf.cmdresp} There are no easter eggs in this program.`); return true;
    default:
      if (msg.startsWith("/iam")) return true;
      return false;
  }
};


const format_msg = module.exports.format_msg = msg => msg.replace("\\\\", "\f") // temp rm \\
                                                         .replace("\\r\\n", "\n")
                                                         .replace("\\r", "\\n")
                                                         .replace("\\n", "<br/>")
                                                         .replace("\\t", "\t")
                                                         .replace("\f", "\\\\")
                                                         .replace(/ass+ /i, "but")
                                                         .replace(/fuck/i, "truck")
                                                         .replace(/shit/i, "ship")
                                                         .replace(/bitch/i, "female dog")
                                                         .replace(/shut up/i, "shut down")
                                                         .split("<br/>");

module.exports.main = (io) => {
  
  /*io.use((client, next) => {
    console.log(io.request.connection.remoteAddress);
    client.ipAddress = io.request.connection.remoteAddress;
    next();
  });
  io.on('connection', function(socket){
    names[socket.id] = socket.id.slice(0,8);
    if (ipToSocket[socket.ipAddress]) {
      socket.emit("chat message", `${pf.alert} There already is a connection from your IP address. Type "here" to log in here instead, or type "bye" to disconnect.`);
      socket.on("chat message", altMsgHandler(socket));
      return;
    }
    ipToSocket[socket.ipAddress] = socket;*/
    socket.emit("chat message", `${pf.alert} Welcome, <${names[socket.id]}>`);
    socket.broadcast.emit("chat message", `${pf.alert} <${names[socket.id]}> has joined.`);
    //whoDisBot.onJoin(socket);
    socket.on('chat message', msg => (
                                     magic(socket, msg) ?
                                     undefined :
                                     format_msg(msg).map((m) => {io.emit("chat message", `${pf.msg} <${names[socket.id]}> ${m}`);})
                                     ));
    socket.on("disconnect", () => {
      io.emit("chat message", `${pf.alert} <${names[socket.id]}> has left.`);
      //whoDisBot.onLeave(socket);
      names[socket.id] = undefined;
    });
  });
}
