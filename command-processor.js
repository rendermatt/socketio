const cdict = {};
let mes = null;
const catchBadCommand = false;
const {r} = require("./iomodule.js");
const apply_name = module.exports.apply_name = (who, name) => {
  if (r.rnames[name]) {
    mes(who, "cmdresp", `Name ${name} already authenticated.`);
  } else {
    mes(who.broadcast, "alert", `${r.names[who.id]} has applied name ${name}.`);
    console.log(`setting rnames[${r.names[who.id]}] = undefined`);
    r.rnames[r.names[who.id]] = undefined;
    console.log(`setting r.rnames[${name}] = ${who}`);
    r.rnames[name] = who;
    console.log(`setting r.names[${who.id}] = ${name}`);
    r.names[who.id] = name;
    mes(who, "cmdresp", `Name ${name} applied successfully.`);
  }
};
const main = module.exports = (_mes) => (msg, from, sudo) => {
  mes = _mes;
  if (msg.startsWith("/")) {
    const args = msg.slice(1).split(" ");
    const cmd = args.shift();
    if(from._debug_command_detection) {from.emit("chat message", `Command detected! ${cmd}:${args}`);}
    switch(cmd) {
      case "funpie":
        mes(from, "cmdresp", `${args[0]} and ${args[1]} are stinky!`); return true;
      case "iam":
        apply_name(from, args[0]); return true;
      case "attendance":
        r.attendance.forEach((item) => {
          mes(from, "cmdresp", `Here: ${r.io.sockets[item].id}`);            
        }); return true;
      case "tellraw":
        mes(from, "none", args.join(" ")); return true;
      case "_debug_command_detection_enable":
        from._debug_command_detection = true; return true;
      case "youare":
        let torename = r.rnames[args[1]];
        if (torename) {
          apply_name(torename, args[0]);
        } else {
          mes(from, "cmdresp", `Could not rename nonexistent ${args[1]}.`);
        } return true;
      case "release":
        r.rnames[args[0]] = 0; return true;
      case "w":
        let toname = args.shift();
        let to = r.rnames[toname];
        let msg = args.join(" ");
        if (to) {
          mes(to, "msg", `(-> you) <${r.names[from.id]}> ${msg}`);
          mes(from, "msg", `(-> ${toname}) <${r.names[from.id]}> ${msg}`);
        } else {
          mes(from, "cmdresp", `Cannot message a nonexistent user.`);
        } return true;
      case "linkout":
        let tolink = args.shift();
        let tol = r.rnames[tolink];
        let link = args.join(" ");
        if (tol) {
          tol.emit("linkout", link);
          mes(from, "cmdresp", `Ok, ${tolink} is on ${link} now.`);
        } else {
          mes(from, "cmdresp", `I don't know who ${tolink} is.`);
        } return true;
        
      case "op":
        let top = r.rnames[args[0]];
        if (top == undefined && args[0]) {mes(from, "cmdresp", "Nothing loads."); return true;}
        if (args[0]) {
          mes(from, "cmdresp", `${args[0]} ${top.admin ? "seems more powerful." : "seems about the same."}`);
          top.admin = true;
          return true;
        } else {
          mes(from, "cmdresp", `Dude, wtf?? You can't op EVERYONE.`);
          return true;
        }
      case "deop":
        let teop = r.rnames[args[0]];
        if (teop == undefined && args[0]) {mes(from, "cmdresp", "Nothing loads."); return true;}
        if (args[0]) {
          mes(from, "cmdresp", `${args[0]} ${teop.admin ? "seems about the same" : "seems less powerful."}`);
          teop.admin = false;
          return true;
        } else {
          mes(from, "cmdresp", `So THIS is why all our staff disappeared.`);
          return true;
        }
      case "spam":
        let count = parseInt(args.shift());
        if (isNaN(count)) {mes(from, "cmdresp", `That's not a number, silly!`);}
        else if (count < 0) {mes(from, "cmdresp", `How am I supposed to remove spam?`);}
        else if (count == 0) {mes(from, "cmdresp", `Nothing is spammed.`);}
        else {for (i = 0; i <= count; i++) {r.sendmsg(from)(args.join(" "));}}
        return true;
      case "reload":
        let toload = r.rnames[args[0]];
        if (toload == undefined && args[0]) {mes(from, "cmdresp", "Nothing loads."); return true;}
        if (args[0]) {
          mes(from, "cmdresp", `${args[0]} has loaded again!`);
          toload.emit("reload");
          return true;
        } else {
          mes(from, "cmdresp", `Look at the chaos. Everyone reloading.`);
          from.broadcast.emit("reload");
          return true;
        }
      case "kick":
        let tokick = r.rnames[args[0]];
        if (tokick) {
          mes(tokick, "alert", `You were kicked from NoMoreNotes by ${r.names[from.id]}.`);
          mes(from, "cmdresp", `Kicked ${r.names[tokick.id]}`);
          tokick.disconnect(true);
        } else {
          mes(from, "cmdresp", `Could not kick ${args[0]}.`);
        } return true;
      default:
        mes(from, "cmdresp", `Unrecognized command ${cmd}. Run /help for help.`); return catchBadCommand;
    }
    return catchBadCommand;
  }
  return false;
};
