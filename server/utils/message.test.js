const expect = require('expect')
const {generateMessage, generateLocationMessage} = require('./message.js')

describe ('generateMessage' ,()=>{
  it('should generate correct message object' , ()=>{

    var from = 'Yale'
    var text = 'Welcome to Yale'
    var message = generateMessage(from,text)

    expect(message.createdAt).toBeA('number')
    expect(message).toInclude({
      from: from,
      text: text
    })
   })
})


describe('generateLocationMessage' ,()=>{
  it('should generate correct location object' , ()=>{

    var from = 'User'
    var latitude = 1
    var longitude = 1
    var message = generateLocationMessage(from,latitude,longitude)

expect(message.createdAt).toBeA('number')
expect(message.url).toBe('https://www.google.com/maps?q=1,1')

  })
})
