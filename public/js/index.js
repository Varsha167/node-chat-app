var socket = io()

socket.on('connect' ,()=>{ //variable socket is already there. so no socket argument required
  console.log("Connected to server")
})

// socket.emit('createMessage' , {
//   from:'varsha',
//   text:'Welcome to Yale'
// })

socket.on('disconnect', ()=>{
  console.log("Disconnected from server")
})

socket.on('newMessage', function(message) {
  console.log("new Message" , message)

  var li = jQuery('<li></li>') //instead of seelecting an element,we are creating an element
  li.text(`${message.from} : ${message.text}`)

  jQuery('#messages').append(li)
})

// socket.emit('createMessage', {
//   from : 'Frank',
//   text: 'Hi'
// },(messagefromserver)=>{
//   console.log('Got it!', messagefromserver)
// })


jQuery('#message-form').on('submit', function(e){
  e.preventDefault()

  socket.emit('createMessage' , {
    from: 'User',
    text: jQuery('[name = message]').val()
  }, function(){

  })
})
