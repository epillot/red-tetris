import Tetris from './tetris'

export default class Room {

  constructor(id) {
    this.id = id
    this.users = []
    this.pieces = []
    this.isPlaying = false
  }

  getData() {
    return {
      id: this.id,
      users: this.users.map(user => user.getData()),
      isPlaying: this.isPlaying,
    }
  }

  addUser(user) {
    if (this.users.length >= 5)
      return false
    this.users.push(user)
    user.joinRoom(this.id)
    return true
  }

  removeUser(user) {
    user.leaveRoom(this.id)
    this.users = this.users.filter(u => u !== user)
    if (!this.users.length)
      this.isPlaying = false
  }

  getHash(user) {
    return {
      to: user.id,
      hash: this.id + '[' + user.name + ']',
    }
  }

  initGame() {
    this.pieces = []
    for (let i = 0; i < 3; i++) {
      this.pieces.push(Tetris.newTetriminos())
    }
    this.users.forEach(user => user.initGame())
    this.isPlaying = true
  }

  getNextPiece(i) {
    const piece = this.pieces[i]
    this.pieces.push(Tetris.newTetriminos())
    return piece
  }


}
