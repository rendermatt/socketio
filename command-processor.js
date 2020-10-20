const main = module.exports = (msg, from) => {
	if (msg.startsWith("/")) {
        from.emit("chat message", "Command detected!");
    }
}