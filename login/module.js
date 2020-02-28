module.exports = (app) => {
  app.get('/login', function(req, res){
    res.sendFile(__dirname + '/login/index.html');
  });
  app.get("/login.js", (req, res) => {
    res.sendFile(__dirname + "/login/main.js");
  });
  app.get("/login.css", (req, res) => {
    res.sendFile(__dirname + "/login/styles.css");
  });
}
