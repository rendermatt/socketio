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
  socket.on("delete", (id) => {
    document.getElementById(id).removeElement();
  });
  socket.on("reload", ()=>{history.go(0);});
  socket.on("linkout", (url)=>{open(url);});
  $.on("blur", ()=>{alert("blur");});
  $("#m").on("paste",  (event) => {
    var items = (event.clipboardData || event.originalEvent.clipboardData).items;
    alert(JSON.stringify(items)); // will give you the mime types
    for (index in items) {
      var item = items[index];
      if (item.kind === 'file') {
        var blob = item.getAsFile();
        var reader = new FileReader();
        reader.onload = function(event){
        socket.emit("image", event.target.result)}; // data url!
        reader.readAsDataURL(blob);
    }
  }
}

});
