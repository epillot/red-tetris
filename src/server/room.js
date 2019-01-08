
export default class Room {

  constructor(id, master) {
    this.id = id
    this.master = master
    this.users = [master]
  }


}
