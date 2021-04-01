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
  alert("loading theme");
  const data = JSON.parse(await fetch("/themes.json"));
  alert("theme data fetched");
  const ust  = readCookie("theme") || data._default_;
  alert(`got user prefrences: ${ust}`);
  const color= data[ust];
  alert(`which means color ${color}`);
  createCookie("theme", ust, 7);
}

$(()=> {
  loadTheme();
});
