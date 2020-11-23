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
      case "ping":
        let toping = r.rnames[args[0]];
        if (toping == undefined && args[0]) {mes(from, "cmdresp", "Your ping did not hit anything.");}
        mes(from, "cmdresp", `You ring a bell in${toping ? (names[toping]+"'s ear") : "to an amplifier"}.`);
        (toping ? toping : r.io).emit("ping", !!toping, names[from.id]); return true;
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
