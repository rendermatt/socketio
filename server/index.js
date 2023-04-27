require("dotenv").config();
const app = require("express")();
const http = require("http").Server(app);
const sio = require("socket.io");
const port = process.env.PORT || 4000;
const { Configuration, OpenAIApi } = require("openai");
const users = require("../users.json");

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
    if (msg.indexOf("/users") !== 0) {
      io.emit("backendToFrontend", `Message from frontend: ${msg}`);
    } else {
      openai
        .createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Given the following user list ${JSON.stringify(
                users
              )} ${msg.replace("/users", "")}`,
            },
          ],
        })
        .then((completion) => {
          completion.data.choices.forEach((choice) => {
            io.emit("backendToFrontend", choice.message.content);
          });
        });
    }
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
