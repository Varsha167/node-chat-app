const expect = require ('expect')

const {Users} = require('./users.js')


describe('Users' , ()=>{
  var seedUsers
  beforeEach(()=>{
    seedUsers = new Users()
    seedUsers.users = [{
      id: '1',
      name: 'Person A',
      room: 'Bollywood'
    },
    {
      id: '2',
      name: 'Person B',
      room: 'Hollywood'
    },
    {
      id: '3',
      name: 'Person C',
      room: 'Bollywood'
    }]

  })

  it('should create new users' , ()=>{
    var testUsers = new Users()
     var user = {
       id: '123',
       name: 'Varsha',
       room: 'Bollywood'
     }

     var resUsers = testUsers.addUser(user.id, user.name, user.room)

     expect(testUsers.users).toEqual([user])
  })

  it('should return names for Bollywood' , ()=>{
    var userList = seedUsers.getUserList('Bollywood')

    expect(userList).toEqual(['Person A' , 'Person C'])
  })

  it('should return names for Hollywood' , ()=>{
    var userList = seedUsers.getUserList('Hollywood')

    expect(userList).toEqual(['Person B'])
  })

  it('should remove a user' , ()=>{
    var userId = '2'
    var removeUserRes = seedUsers.removeUser(userId)

    expect(removeUserRes.id).toBe(userId)
    expect(seedUsers.users.length).toBe(2) //cos it removed id=2 and only 2 elements are left
  })

  it('should not remove a user' , ()=>{
    var userId = '7'
    var removeUserRes = seedUsers.removeUser(userId)
    expect(removeUserRes).toNotExist()
    expect(seedUsers.users.length).toBe(3)
  })

  it('should find a user' , ()=>{
    var userId = '1'
      var getUserRes = seedUsers.getUser(userId)
      expect(getUserRes.id).toBe(userId)
  })

  it('should not find a User' , ()=>{
    var getUserRes = seedUsers.getUser(7)
    expect(getUserRes).toNotExist(

    )
  })
})
