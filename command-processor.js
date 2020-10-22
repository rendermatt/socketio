const main = module.exports = (msg, from) => {
	if (msg.startsWith("/")) {
      const args = msg.slice(1).split(" ");
      const cmd = msg.unshift();
      from.emit("chat message", `Command detected! ${cmd}:${args}`);
    }
}
