var express = require('express')
var app = express();
const path = require('path')
const http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname+'/public/index.html');
});

http.listen(4000, function(){
  console.log('listening on *:3000');
});

io.on('connection',function(socket){
	socket.on('event',function(msg){
		console.log('socket');
		io.emit('event',msg);
	});
	console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
