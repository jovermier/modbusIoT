var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ModbusRTU = require("./modbus-serial/index");
var client = new ModbusRTU();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
/*
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
*/

io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', 'jason');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


// open connection to a tcp line
client.connectTCP("10.11.18.155");

setInterval(function() {
    client.readHoldingRegisters(139, 19, function(err, data) {
        io.emit('chat message', data.data);
    });
}, 1000);

