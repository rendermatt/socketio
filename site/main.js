/*global readCookie, createCookie, eraseCookie */
// <style> * {display: inline-block;} </style>

/*(() => {
  const prevFeed = $("#prev-feed")
  const sock = io();
  sock.on("chat message", (msg) => {
    if (prevFeed.children().size() >= 5) {
      prevFeed.children().first().remove();
    }
    prevFeed.append($("<li>").text(msg)); // </li>
  });
});*/

function loadTheme() {
  alert("loading theme");
  fetch("/themes.json")
    .then(resp => {
      let body = resp.body;
      body = body.getReader();
      let nextPart = {done: false};
      let data = "";
      function handler(part) {
        data += part.value || "";
        if (part.done) {
          finish(data);
        } else {
          body.read().then(handler);
        }
  		}
      function finish() {
        alert(`processing theme data:\n${data}`);
        data = JSON.parse(data);
        alert("theme data fetched");
        const ust  = readCookie("theme") || data._default_;
        alert(`got user prefrences: ${ust}`);
        const color= data[ust];
        alert(`which means color ${color}`);
        createCookie("theme", ust, 7);
      }
  	})
    .catch(err => {
      alert(`could not load because ${err.type}: ${err.message}`);
      alert(err.stack);
  	});
}

$(()=> {
  loadTheme();
});