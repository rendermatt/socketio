const app = require("express")();
const http = require("http").Server(app);
const sio = require("socket.io");
const port = process.env.PORT || 4000;

const io = new sio.Server(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.get("/", (_req, res) => {
  res.status(200).json({ hola: "mundo" });
});

io.on("connection", (socket) => {
  socket.on("frontendToBackend", (msg) => {
    io.emit("backendToFrontend", `Message from frontend: ${msg}`);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
