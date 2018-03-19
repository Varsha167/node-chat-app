class Users {
  constructor() {
    this.users = [] //initiaising empty array
  }  addUser (id,name,room) {
    var user= {id, name, room} //object
    this.users.push(user)
    return user
  }

  getUser(id) {
    var userId = this.users.filter((user)=>{
      return user.id === id
  })
    return userId[0]

  }

  removeUser(id) {
  var user = this.getUser(id)
   if(user) {
     this.users = this.users.filter((user)=>{
       return user.id !== id
     })
   }
  return user
  }

  getUserList(room) {
    var users = this.users.filter((user)=>{ //get all of the users whose room matches the room specified here.
      return user.room === room
    })

      var namesArray =  users.map((user)=>{ //convert array of objects into array of strings. we only want the names

      return user.name

    })
      return namesArray
  }


}

module.exports = {Users}
