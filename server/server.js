const path = require('path') //built in. no need to install
const http = require('http') //built in. no need to install

const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')

const express = require('express')
const port = process.env.PORT || 3000

const {generateMessage , generateLocationMessage} = require('./utils/message.js')

var app = express()

var server = http.createServer(app)
var io = socketIO(server)
//will let you see the static index.html file
app.use(express.static(publicPath))

//io lets you listen to the event
io.on('connection' , (socket)=>{ //this socket represents individual socket
  console.log("New user conncted")

  // socket.emit('newMessage' , { //emitting to client //emits to only one connection
  //   from: 'Varsha',
  //   text: 'I got into Yale!',
  //   createdAt: '22'
  // })

//
socket.emit('newMessage' , generateMessage('Admin' , 'Welcome to the chat app'))


//alerts everyone except one user(welcome message for new user and "new user joined " for others)
socket.broadcast.emit('newMessage' , generateMessage ('Admin' , 'New user joined'))

socket.on('createMessage' , (message,callback)=> {
console.log('message' , message) //Listening from client for a new message "newMessage" from client index.js. that new message will be "emmitted" to every one connected to the server.
io.emit('newMessage', generateMessage(message.from, message.text)) //this code piece enables sending messages to all the connected users
callback('This is from the server.')
  })

  socket.on('createLocationMessage' , (coords)=>{
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  socket.on('disconnect', ()=>{
    console.log("User Disconnected")
  })
})



server.listen(port, (req,res)=>{
  console.log(`Listening on port ${port}`)
})
