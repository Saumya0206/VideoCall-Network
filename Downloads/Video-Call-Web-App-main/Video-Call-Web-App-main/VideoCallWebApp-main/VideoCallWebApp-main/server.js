const express = require('express');
const app = express();
const { v4: uuidV4 } = require('uuid')
const { ExpressPeerServer } = require('peer');

const server = require('http').Server(app);
const peerServer = ExpressPeerServer(server, {
  debug: true
});
const io = require('socket.io')(server)
app.use(express.static('public'))
app.use('/peerjs', peerServer);

app.set('view engine', 'ejs');
app.get('/', (req, res) => { //default 

  res.redirect(`/${uuidV4()}`) //random room id generated

})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })

})


server.listen(process.env.PORT || 3030);

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit('user-connected', userId);
    socket.on('message', message => {
      io.to(roomId).emit('createMessage', message);
    })
    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId)
    });

  })
})


