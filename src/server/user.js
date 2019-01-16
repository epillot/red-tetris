export default class User {

  constructor(socket) {
    this.socket = socket
  }

  joinRoom(roomId) {
    this.socket.join(roomId)
  }

  leaveRoom(roomId) {
    this.socket.leave(roomId)
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
    }
  }

}
