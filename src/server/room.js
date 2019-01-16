
export default class Room {

  constructor(id, master) {
    this.id = id
    this.master = master
    this.users = [master]
    master.joinRoom(id)
  }

  getData() {
    return {
      id: this.id,
      master: this.master.getData(),
      users: this.users.map(user => user.getData()),
    }
  }

  addUser(user) {
    if (this.users.length >= 5)
      return false
    this.users.push(user)
    user.joinRoom(this.id)
    return true
  }
}
