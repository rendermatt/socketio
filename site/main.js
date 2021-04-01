// <style> * {display: inline-block;} </style>
(() => {
  const prevFeed = $("#prev-feed")
  const sock = io();
  sock.on("chat message", (msg) => {
    if (prevFeed.children().size() >= 5) {
      prevFeed.children().first().remove();
    }
    prevFeed.append($("<li>").text(msg)); // </li>
  });
});

async function loadTheme() {
  const data = JSON.parse(await fetch("/themes.json"));
  const ust  = readCookie("theme") || data._default_;
  const color= data[ust];
  createCookie("theme", ust, 7);
}

$(()=> {
  loadTheme();
});