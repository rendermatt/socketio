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
  return new Promise((res, rej) => {
    alert("loading theme");
    fetch("/themes.json")
      .then(data => {
        data = JSON.parse(data);
        alert("theme data fetched");
        const ust  = readCookie("theme") || data._default_;
        alert(`got user prefrences: ${ust}`);
        const color= data[ust];
        alert(`which means color ${color}`);
        createCookie("theme", ust, 7);
        res(color);
      })
      .catch(err => {
        alert(`could not load because ${err.type}: ${err.message}`);
        alert(err.stack);
        rej(err);
      });
  });
}

$(()=> {
  loadTheme();
});