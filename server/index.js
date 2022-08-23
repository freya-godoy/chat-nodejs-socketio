let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola-mundo', function (req, res) {
    res.status(200).send('Hola mundo desde una ruta');
});

let messages = [{
    id: 1,
    text: 'Bienvenido al chat privado de Socket.io y NodeJS',
    nickname: 'GatitoEspacial.1'
}];
//conexion al socket 
//evento connection (se encarga de las conexiones al socket)

io.on('connection', function (socket) {
    console.log("El cliente  con IP: " + socket.handshake.address + " se ha conectado...");

    socket.emit('messages', messages);

    socket.on('add-message', function (data) {
        messages.push(data);

        io.sockets.emit('messages', messages);
    });
});

server.listen(6677, function () {
    console.log('Servidor funcionando en http://localhost:6677');
});