const cdict = {};
const silent = {missing:false,handled:true}
let mes = null;
const main = module.exports = (_mes) => (msg, from) => {
  mes = _mes;
  if (msg.startsWith("/")) {
    const args = msg.slice(1).split(" ");
    const cmd = args.shift();
    from.emit("chat message", `Command detected! ${cmd}:${args}`);
    switch(cmd) {
      case "funpie":
        mes(from, "cmdresp", `${args[0]} and ${args[1]} are stinky!`); return silent.handled;
      
      case "tellraw":
        mes(from, "none", args.join(" ")); return silent.handled;
      default:
        mes(from, "cmdresp", `Unrecognized command ${cmd}. Run /help for help.`); return silent.missing;
    }
    return true;
  }
  return false;
}
