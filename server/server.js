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

  socket.emit('newMessage' , { //emitting to client
    from: 'Varsha',
    text: 'I got into Yale!',
    createdAt: '22'
  })

  socket.on('createMessage' , (createnewchat)=>{
    console.log(createnewchat) //Listening from client
  })

  socket.on('disconnect', ()=>{
    console.log("User Disconnected")
  })
})





server.listen(port, (req,res)=>{
  console.log(`Listening on port ${port}`)
})
