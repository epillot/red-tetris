export default class User {

  constructor(socket) {
    this.socket = socket
    this.room = false
    this.indexPiece = 0
    //this.tetris = null
  }

  joinRoom(roomId) {
    this.socket.join(roomId)
    this.room = roomId
  }

  leaveRoom(roomId) {
    this.socket.leave(roomId)
    this.room = false
  }

  sendAction(action) {
    this.socket.emit('action', action)
  }

  sendActionToRoom(roomId, action) {
    this.socket.to(roomId).emit('action', action)
  }

  getData() {
    return {
      name: this.name,
      id: this.socket.id,
      tetris: this.tetris,
    }
  }

  getGhost() {
    return {
      player: this.getData(),
      tetris: this.tetris,
    }
  }

}
