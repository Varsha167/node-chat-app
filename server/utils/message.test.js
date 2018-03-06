const expect = require('expect')
const {generateMessage} = require('./message.js')

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
