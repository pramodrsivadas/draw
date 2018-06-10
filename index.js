var express = require('express');
var fs = require('fs');
var socket = require('socket.io')
const port = 8081;

var app = express();
var server = app.listen(port, function(){
    console.log('listening to port' + port);
});
//static files
app.use(express.static('public'));

//socket setup
var io = socket(server);

var line_history = [];
io.on('connection', function (socket) {
    for (var i in line_history) {
        socket.emit('draw_line', { line: line_history[i] } );
     }
     socket.on('draw_line', function (data) {
        // add received line to history 
        line_history.push(data.line);
        // send line to all clients
        io.emit('draw_line', { line: data.line });
     });
    }
);