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
  socket.on('chat message', function(id, msg){
    $('#messages').append($('<li>', {id}).text(msg));
    if (notify) {
      notify = manotify;
      alert(msg);
    }
    window.scrollTo(0, document.body.scrollHeight);
  });
  socket.on("ping", (wasTargeted, source) => {
    alert(`${source} has pinged ${wasTargeted ? "you" : "everyone"}!`);
    
  });
  socket.on("edit", (id, msg) => {
    $(`#${id}`).text(msg);
  });
  socket.on("delete", (id, msg) => {
    document.getElementById(id).removeElement();
  });
  socket.on("reload", ()=>{history.go(0);});
  socket.on("linkout", (url)=>{open(url);});
  $.on("blur", ()=>{alert("blur");});
});
