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

function scrollToBottom() {
  //selectors
  var messages = jQuery('#messages')
  var newMessage = messages.children('li:last-child')

  //height

  var clientHeight = messages.prop('clientHeight')
  var scrollTop = messages.prop('scrollTop')
  var scrollHeight = messages.prop('scrollHeight') //total height of the browser
  var newMessageHeight = newMessage.innerHeight()
  var lastMessage = newMessage.prev().innerHeight() //prev moves you to previous child

  if (clientHeight + scrollTop + newMessageHeight+lastMessage >= scrollHeight )
  {
    messages.scrollTop(scrollHeight)
  }
}

socket.on('newMessage', function(message) {
  //console.log("new Message" , message)
  var formattedTime = moment(message.createdAt).format('h:mm a')
  var template = jQuery('#message_template').html()
  var html = Mustache.render(template , {
      from: message.from,
      text: message.text,
      createdAt: formattedTime

  })
  // var li = jQuery('<li></li>') //instead of seelecting an element,we are creating an element
  // li.text(`${message.from}  ${formattedTime}: ${message.text}`)
  //
   jQuery('#messages').append(html)
   scrollToBottom()
})


socket.on('newLocationMessage' , function(message) {
var formattedTime = moment(message.createdAt).format('h:mm a')
var template = jQuery("#location_template").html()
var html = Mustache.render(template, {
  from: message.from,
  url: message.url,
  createdAt: formattedTime
})

jQuery('#messages').append(html)
scrollToBottom()


//   var li = jQuery('<li></li>')
//   var a = jQuery('<a target = "_blank"> My current location</a>') //"_blank" so that when someone clicks on the link, it opens ina new tab
//   var formattedTime = moment(message.createdAt).format('h:mm a')
//   li.text(`${message.from} ${formattedTime}`)
//   a.attr('href' , `${message.url}`)
//   li.append(a)
// jQuery('#messages').append(li)
})

// socket.emit('createMessage', {
//   from : 'Frank',
//   text: 'Hi'
// },(messagefromserver)=>{
//   console.log('Got it!', messagefromserver)
// })


jQuery('#message-form').on('submit', function(e){
  e.preventDefault()
  var messageTextBox =  jQuery('[name = message]')

  socket.emit('createMessage' , {
    from: 'User',
    text: messageTextBox.val()
  }, function(){
    messageTextBox.val('')
  })
})


var locationButton =jQuery("#location-button")
locationButton.on('click' , function(){
  if(!navigator.geolocation) {
    return alert("Your browser does not support this feature.")
  }

locationButton.attr('disabled' , 'disabled').text('Sending Location ...')
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send Location')
    socket.emit('createLocationMessage',{
      latitude : position.coords.latitude,
      longitude: position.coords.longitude

    })
  }, function() {
    locationButton.removeAttr('disabled')
    alert('Unable to fetch location')
  })
})
