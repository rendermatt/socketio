$(function () {
  var manotify = false;
  var notify = false;
  var socket = io();
  /*socket.sockets.on("connection", ()=>{*/socket.emit("authenticate", localStorage.session ? localStorage.session : (localStorage.session = socket.id));
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
  $.on("blur", ()=>{alert("blur");});
});
