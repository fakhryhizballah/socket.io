var app = require('express')();
const http = require('http').createServer(app);

const server = require('http').createServer(app)
const io = require('socket.io')(http, {})



app.get('/', (req, res) => {
//  res.sendFile(__dirname + '/index.php')
 res.send('<h1>Hello room 1</h1>')
});
app.get('/index.php', (req, res) => {
//   res.send('<h1>Hello room 1</h1>');
res.sendFile(__dirname + '/index.html')
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

let countUserOnline = 1
io.on('connection', socket => {
    socket.on('join', param => {
        console.log('user join')
        countUserOnline++;
        io.emit('countUserOnline', countUserOnline)
    })
    socket.on('message', param => {
        console.log('user mengirim pesan')
        console.log(param)
        io.emit('message', param)
    })
    socket.on('disconnect', param => {
        console.log('user keluar')
        countUserOnline--;
        io.emit('countUserOnline', countUserOnline)

    })
})