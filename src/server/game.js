import Room from './room'

class Game {

  constructor() {
    this.rooms = []
  }

  createRoom(user) {
    const room = new Room(this.newRoomId())
    room.addUser(user)
    this.rooms.push(room)
    console.log(this.rooms)
    return room
  }

  deleteRoom(room) {
    this.rooms = this.rooms.filter(r => r !== room)
  }

  getRoomById(id) {
    return this.rooms.find(room => room.id === id)
  }

  getRoomByMaster(user) {
    return this.rooms.find(room => room.users[0] === user)
  }

  newRoomId() {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let id = ""
    while (true) {
      for (let i = 0; i < 5; i++)
        id += possible.charAt(Math.floor(Math.random() * possible.length))
      if (this.rooms.map(room => room.id).indexOf(id) !== -1) {
        id = ""
        continue
      }
      return id
    }
  }

  addUserToRoom(roomId, user) {
    const room = this.getRoomById(roomId)
    if (room) {
      if (room.addUser(user))
        return room
      this.currentError = 'This room is full'
      return null
    }
    this.currentError = 'This room doesn\'t exist'
    return null
  }

  removeUserFromRoom(roomId, user) {
    const room = this.getRoomById(roomId)
    if (room) {
      room.removeUser(user)
      setTimeout(() => {
        if (!room.users.length) {
          console.log('deleting room: ' +room.id)
          this.deleteRoom(room)
        }
      }, 60000)
    }
    return this.getRoomById(roomId)
  }

}

export default new Game()
