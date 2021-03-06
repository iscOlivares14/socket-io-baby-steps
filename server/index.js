var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// express middleware
app.use(express.static('client'));

app.get('/hola-mundo', function(req, res) {
    res.status(200).send('Hola mundo desde NodeJs')
});

var messages = [{
    id: 1,
    text: 'Bienvenido al chat privado de socket.io y nodeJs',
    nickname: "Bot - Victor"
}]

io.on('connection', function(socket){
    console.log("El nodo IP: " + socket.handshake.address + " se ha conectado...");

    socket.emit('messages', messages);

    socket.on('add-message', function(data){
        messages.push(data);

        io.sockets.emit('messages', messages);
    });

});

server.listen(6677, function(){
    console.log('Servidor está funcionando en http://localhost:6677');
});
