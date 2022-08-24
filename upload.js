const { createWriteStream, mkdir } = require("fs")
const { createHash } = require("crypto")

const _setStatus = io => status => io.emit("upload:status", status)
const _done = io => url => io.emit("upload:done", url)

module.exports = io => {
	const setStatus = _setStatus(io)
	const done = _done(io)
	console.log("loaded upload.js")
	io.on("connection", sc => {
		sc.on("upload:file", (file, name) => {
			console.log("Got a file!")
			setStatus("hashing")
			const hash = createHash("sha512")
			hash.update(file)
			const res = hash.digest("hex")
			// const resethash = createHash("md5")
			// resethash.update(file)
			// const resetpw = hash.digest("hex").substr(0, 8)
			setStatus("uploading")
			mkdir(`.uploaded/${res}`, (e, r) => {
				if (e) return setStatus(`ERROR creating directory!\n${e.stack}`)
				console.log(r)
				const ws = createWriteStream(`.uploaded/${res}/${name}`)
				ws.write(file)
				done(`${res}/${name}`)
				// setStatus(resetpw)
			})
		})
	})
}