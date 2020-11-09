const cdict = {};
let mes = null;
const catchBadCommand = false;
const {r} = require("./iomodule.js");
const main = module.exports = (_mes) => (msg, from) => {
  mes = _mes;
  if (msg.startsWith("/")) {
    const args = msg.slice(1).split(" ");
    const cmd = args.shift();
    if(from._debug_command_detection) {from.emit("chat message", `Command detected! ${cmd}:${args}`)};
    switch(cmd) {
      case "funpie":
        mes(from, "cmdresp", `${args[0]} and ${args[1]} are stinky!`); return true;
      
      case "tellraw":
        mes(from, "none", args.join(" ")); return true;
      case "_debug_command_detection_enable":
        from._debug_command_detection = true; return true;
      case "release":
        r.rnames[args[0]] = 0; return true;
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
}
