// $(() => {
statu.innerText = "loading"
const sc = io()
sc.on("connect", () => statu.innerText = "alpha")
sc.on("upload:status", stat => statu.innerText = stat)
sc.on("upload:done", url => {
	url = `${location.origin}/${url}`
	statu.innerText = `done`
	lastu.href = url;
	lastu.innerText = url;
	if (openu.checked) open(url)
})
//filei.onchange = ({ target: { files: [file] } }) => { file.text().then(text => zone.value ? alert("Change this alert before release") : zone.value = text) };
ubut.onclick = () => {
	const { files: [file] } = filei;
	filel.innerText = file.name;
	filez.innerText = String(file.size) + "b";
	statu.innerText = "transmitting"
	sc.emit("upload:file", file, file.name)
}
// })