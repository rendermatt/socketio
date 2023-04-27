
require("dotenv").config();
const app = require("express")();
const http = require("http").Server(app);
const sio = require("socket.io");
const port = process.env.PORT || 4000;
const { Configuration, OpenAIApi}  = require('openai')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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
    console.log(msg);
  });

  socket.on("botsent", (msg) => {
    io.emit("botreceive", `Message from frontend: ${msg}`);
    console.log(msg);
    openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: msg}],
      })
      .then((completion) => {
        console.log(completion.data.choices[0].message.content);
        completion.data.choices.forEach((choice) => {
          io.emit("botreceive", choice.message.content);
        });
      })
      .catch((x) => console.error("catch:", x));
  });

});


http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
