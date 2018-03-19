const expect = require('expect')

const {isRealString} = require('./validation.js')

describe('validation.js' , ()=>{
  it('should reject non-string values' ,()=>{

    var res = isRealString(123)
    expect(res).toBe(false)
  })
  it('should reject values with spaces' ,()=>{

    var res = isRealString(  )
    expect(res).toBe(false)
  })

  it('should accept string values' ,()=>{

    var res = isRealString('lotr')
    expect(res).toBe(true)
  })

})
