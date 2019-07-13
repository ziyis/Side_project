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
		io.emit('event',msg);
	});
	console.log('a user connected', socket.id);
  socket.on('disconnect', function(){
    console.log('user disconnected',socket.id);
  });
	socket.on('chat', function(data){
		io.emit('chat', data);
	});

	socket.on('enterroom', function(data){
		socket.broadcast.emit('enterroom', data);
	});

	// Handle typing event
	socket.on('typing', function(data){
		socket.broadcast.emit('typing', data);
	});
});
