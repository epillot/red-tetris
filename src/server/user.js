export default class User {

  constructor(socket) {
    this.socket = socket
  }

  sendAction(action) {
    this.socket.emit('action', action)
  }

}
