const path = require('path') //built in. no need to install
const http = require('http') //built in. no need to install

const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')

const express = require('express')
const port = process.env.PORT || 3000

const {generateMessage , generateLocationMessage} = require('./utils/message.js')
const {isRealString} = require('./utils/validation.js')
const {Users} = require('./utils/users.js')

var app = express()

var server = http.createServer(app)
var io = socketIO(server)
var users = new Users()

app.use(express.static(publicPath))  //will let you see the static index.html file

//io lets you listen to the event
io.on('connection' , (socket)=>{ //this socket represents individual socket
  console.log("New user conncted")

  // socket.emit('newMessage' , { //emitting to client //emits to only one connection
  //   from: 'Varsha',
  //   text: 'I got into Yale!',
  //   createdAt: '22'
  // })

//
//shifting these 2 lines below to make them for the room
// socket.emit('newMessage' , generateMessage('Admin' , 'Welcome to the chat app'))
//
//
// //alerts everyone except one user(welcome message for new user and "new user joined " for others)
// socket.broadcast.emit('newMessage' , generateMessage ('Admin' , 'New user joined'))

socket.on('join', (params,callback)=>{
  if (!isRealString(params.name) || !isRealString(params.room)) {
    return callback('Name and Room are required')
  }

  socket.join(params.room)
  //socket.leave('The office fans')

  //io.emit --> emits to every single connected user -->(room equvivalent) -->io.to('roomname').emit
  //socket.broadcast.emit --> EMITS TO EVERYONE EXCEPT THE CURRENT User -->socket.broadcast.to
  //socket.emit --> emits event specifically to one user
  users.removeUser(socket.id)
  users.addUser(socket.id, params.name, params.room)
  io.to(params.room).emit('updateUserList' , users.getUserList(params.room))
  socket.emit('newMessage' , generateMessage('Admin' , 'Welcome to the chat app'))


  //alerts everyone except one user(welcome message for new user and "new user joined " for others)
  socket.broadcast.to(params.room).emit('newMessage' , generateMessage ('Admin' , `${params.name} has joined`))


  callback()
})


socket.on('createMessage' , (message,callback)=> {
  var user = users.getUser(socket.id)
//console.log('message' , message) //Listening from client for a new message "newMessage" from client index.js. that new message will be "emmitted" to every one connected to the server.
if(user && isRealString(message.text)) //so that empty messags cannot be sent
{
  io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
}
callback('This is from the server.')
  })


  socket.on('createLocationMessage' , (coords)=>{
    var user = users.getUser(socket.id)
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
    }

  })

  socket.on('disconnect', ()=>{
    var removedUser = users.removeUser(socket.id)
    //console.log("User Disconnected")
    if(removedUser) {
      io.to(removedUser.room).emit('updateUserList', users.getUserList(users.room))
      io.to(removedUser.room).emit('newMessage' , generateMessage('Admin' , `${removedUser.name} has left the room`))

    }

  })
})



server.listen(port, (req,res)=>{
  console.log(`Listening on port ${port}`)
})
