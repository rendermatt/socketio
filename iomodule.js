module.exports = {};
const r = {};
r.io = null;
r.pf = require("./prefixes.js");
const names = {};
const apply_name = module.exports.apply_name = (who, name) => {
  if (rnames[name]) {
    mes(who, "cmdresp", `Name ${name} already authenticated.`);
  } else {
    mes(who.broadcast, "alert", `${names[who.id]} has applied name ${name}.`);
    console.log(`setting rnames[${names[who.id]}] = undefined`);
    rnames[names[who.id]] = undefined;
    console.log(`setting rnames[${name}] = ${who}`);
    rnames[name] = who;
    console.log(`setting names[${who.id}] = ${name}`);
    names[who.id] = name;
    mes(who, "cmdresp", `Name ${name} applied successfully.`);
  }
};

const rnames = {};
const mes = (who, prefix, msg) => {var d = new Date(); who.emit("chat message", `${(d.getHours()+8+12)%24}:${d.getMinutes()} ${r.pf[prefix]}${msg}`);}

const ipToSocket = {};

r.names = names; r.rnames = rnames;

const magic = module.exports.magic = (sender, msg) => {
  if(r.cmdmod(msg, sender)){return true;}
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
      mes(sender, "cmdresp", `You are now annonymous.`);
    case "":
      return true;
    case "/moo":
      mes(sender, "cmdresp", `There are no easter eggs in this program.`); return true;
    //case "/_debug_dump_naming":
    //  mes(sender, "cmdresp", `names: ${JSON.stringify(names)}\nrnames: ${JSON.stringify(rnames)}`);
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
  r.io = io
  r.cmdmod = require("./command-processor.js")(mes);
  /*io.use((client, next) => {
    console.log(io.request.connection.remoteAddress);
    client.ipAddress = io.request.connection.remoteAddress;
    next();
  });*/
  io.on('connection', function(socket){
    names[socket.id] = socket.id.slice(0,8);
    /*if (ipToSocket[socket.ipAddress]) {
      socket.emit("chat message", `${pf.alert} There already is a connection from your IP address. Type "here" to log in here instead, or type "bye" to disconnect.`);
      socket.on("chat message", altMsgHandler(socket));
      return;
    }
    ipToSocket[socket.ipAddress] = socket;*/
    mes(socket, "alert", `Welcome, <${names[socket.id]}>`);
    mes(socket, "alert", `<${names[socket.id]}> has joined.`);
    //whoDisBot.onJoin(socket);
    socket.on('chat message', msg => (
                                     magic(socket, msg) ?
                                     undefined :
                                     format_msg(msg).map((m) => {mes(io, "msg", `<${names[socket.id]}> ${m}`);})
                                     ));
    socket.on("disconnect", () => {
      mes(socket.broadcast, "alert", `<${names[socket.id]}> has left.`);
      //whoDisBot.onLeave(socket);
      names[socket.id] = undefined;
    });
  });
}
