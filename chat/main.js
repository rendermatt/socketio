$(function () {
  var manotify = false;
  var notify = false;
  var socket = io();
  socket.on("hello", ()=>{
    socket.emit("hello", localStorage.session ? localStorage.session : (localStorage.session = socket.id));
  });
  $('#send').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
    if (notify) {
      notify = manotify;
      alert(msg);
    }
    window.scrollTo(0, document.body.scrollHeight);
  });
  socket.on("ping", (wasTargeted, source) => {
    alert(`${source} has pinged ${wasTargeted ? "you" : "everyone"}!`);
    
  });
  socket.on("reload", ()=>{history.go(0)});
  socket.on("linkout", (url)=>{open(url)});
  $.on("blur", ()=>{alert("blur");});
});
