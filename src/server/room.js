import Tetris from './tetris'

export default class Room {

  constructor(id, master) {
    this.id = id
    this.users = []
    this.pieces = []
    this.isPlaying = false
    // this.master = master
    // master.joinRoom(id)
  }

  getData() {
    return {
      id: this.id,
      master: this.master.getData(),
      users: this.users.map(user => user.getData()),
      isPlaying: this.isPlaying,
    }
  }

  getGhosts(user) {
    return this.users.map(u => u.getGhost())
    //filter(u => u !== user)
  }

  setMaster(user) {
    this.master = user
  }

  addUser(user) {
    if (this.users.length >= 5)
      return false
    this.users.push(user)
    if (this.users.length === 1)
      this.setMaster(user)
    user.joinRoom(this.id)
    return true
  }

  removeUser(user) {
    user.leaveRoom(this.id)
    this.users = this.users.filter(u => u.socket.id !== user.socket.id)
    if (this.users.length && this.master === user)
      this.setMaster(this.users[0])
    if (!this.users.length)
      this.isPlaying = false
  }

  getHash(user) {
    return {
      to: user.socket.id,
      hash: this.id + '[' + user.name + ']',
    }
  }

  initGame() {
    for (let i = 0; i < 3; i++) {
      this.pieces.push(Tetris.newTetriminos())
    }
    this.isPlaying = true
  }

  getNextPiece(i) {
    const piece = this.pieces[i]
    this.pieces.push(Tetris.newTetriminos())
    return piece
  }


}
