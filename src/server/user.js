export default class User {

  constructor(socket) {
    this.socket = socket
    this.id = socket.id
    this.room = false
    this.isPlaying = false
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

  initGame() {
    this.indexPiece = 0
    this.isPlaying = true
  }

  getData() {
    return {
      name: this.name,
      id: this.id,
      tetris: this.tetris,
      isPlaying: this.isPlaying,
    }
  }

}
