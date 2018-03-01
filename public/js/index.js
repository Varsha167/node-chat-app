var socket = io()

socket.on('connect' ,()=>{ //variablesocket is already there. so no socket argument required
  console.log("Connected to server")
})

// socket.emit('createMessage' , {
//   from:'varsha',
//   text:'Welcome to Yale'
// })

socket.on('disconnect', ()=>{
  console.log("Disconnected from server")
})

socket.on('newMessage', function(chat) {
  console.log("new Message" , chat)
})
