// Require dependencies
var app = require('http').createServer(handler)
, fs = require('fs')
, io = require('socket.io').listen(app);  // I used socket.io here
 
// creating the server ( localhost:8000 )
app.listen(8000);
 
// once the server starts, we can load the client.html page
function handler(req, res) {
  fs.readFile(__dirname + '/client.html', function(err, data) {
    if(err) {
      console.log(err);
      res.writeHead(500);
      return res.end('Error loading client.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}
 
// creating a new websocket to keep the content updated in the absecence of any AJAX request
io.sockets.on('connection', function(socket) {
 
  socket.on('set nickname', function(nickname) {
    // 'nickname' is the name of the user which connects
    socket.set('nickname', nickname, function() {
      console.log('Connected:', nickname);
      var connected_msg = '<b>' + nickname + ' is now connected.</b>';
 
      io.sockets.volatile.emit('broadcast_msg', connected_msg); // This message appears in the log
    });
  });
 
  socket.on('emit_msg', function (msg) {
    // Get the variable 'nickname'
    socket.get('nickname', function (err, nickname) {
      console.log('Chat message by', nickname);
      io.sockets.volatile.emit( 'broadcast_msg' , nickname + ': ' + msg );
    });
  });
 
  // Handle disconnection of clients
  socket.on('disconnect', function () {
    socket.get('nickname', function (err, nickname) {
      console.log('Disconnect', nickname);
      var disconnected_msg = '<b>' + nickname + ' has disconnected.</b>'
 
      // Broadcast to all users the disconnection message
      io.sockets.volatile.emit( 'broadcast_msg' , disconnected_msg);
    });
  });
});