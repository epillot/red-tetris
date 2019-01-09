import Room from './room'

class Game {

  constructor() {
    this.rooms = []
  }

  createRoom(master) {
    const room = new Room(this.newRoomId(), master)
    this.rooms.push(room)
    return room
  }

  getRoomById(id) {
    return this.rooms.find(room => room.id === id)
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

}

export default new Game()
