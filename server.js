const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'views')));
app.set('views', (path.join(__dirname, 'views')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) =>{
    res.render('index.html');
});

let messages = [];

io.on('connection', socket => {
    console.log('Novo usuário conectado: ', socket.id);

    socket.on('enviarMsg', data => {
        messages.push(data);
        socket.broadcast.emit('mensagemRecebida', data)
    });
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log('Server on | PORT: ' + PORT);
});