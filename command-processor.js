const cdict = {};
let mes = null;
const main = module.exports = (_mes) => (msg, from) => {
  mes = _mes;
  if (msg.startsWith("/")) {
    const args = msg.slice(1).split(" ");
    const cmd = args.shift();
    from.emit("chat message", `Command detected! ${cmd}:${args}`);
    switch(cmd) {
      case "funpie":
        mes(from, "cmdresp", `${args[0]} and ${args[1]} are stinky!`); return true;
      default: mes(from, "cmdresp", `Unrecognized command ${cmd}. Run /help for help.`); re
    }
    return true;
  }
  return false;
}
