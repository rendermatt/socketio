module.exports = (app) => {
  app.get("/site.js", (req, res) => {
    res.sendFile(__dirname + "/site/main.js");
  });
  app.get("/site.css", (req, res) => {
    res.sendFile(__dirname + "/site/styles.css");
  });
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/site/index.html");
  });
};
