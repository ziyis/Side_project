var express = require('express')
var socket = require('socket.io')

var app = express();
var server = app.listen(4000, function(){
	console.log('listening');
});

//files
app.use(express.static('public'));

//setup socket
var io = socket(server);

io.on('connection',function(socket){
	console.log('made connection',socket.id);
});
