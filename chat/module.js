module.exports = (app) => {
  app.get('/chat', function(req, res){
    res.sendFile(__dirname + '/chat/index.html');
  });
  app.get("/chat.js", (req, res) => {
    res.sendFile(__dirname + "/chat/main.js");
  });
  app.get("/chat.css", (req, res) => {
    res.sendFile(__dirname + "/chat/styles.css");
  });
}
