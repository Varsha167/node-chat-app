const path = require('path') //built in. no need to install
const http = require('http') //built in. no need to install
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')

const express = require('express')
const port = process.env.PORT || 3000

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


socket.emit('newMessage' , {
  from: 'Admin',
  text: 'Welcome to the chat',

})

socket.broadcast.emit('newMessage' , { //alerts everyone except one user(welcome message for new user and "new user joined " for others)
  from: 'Admin',
  text: 'new user joined'
})

  socket.on('createMessage' , (message)=>{
    console.log('message' , message) //Listening from client
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
  })

  socket.on('disconnect', ()=>{
    console.log("User Disconnected")
  })
})





server.listen(port, (req,res)=>{
  console.log(`Listening on port ${port}`)
})
