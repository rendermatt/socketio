const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
const users = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("set username", (user) => {
    users.push({
      id: socket.id,
      ...user,
    });
  });

  socket.on("chat message", (msg) => {
    const user = users.filter((user) => user.id === socket.id)[0];

    io.emit("chat message", { msg, ...user });
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
