import io from 'socket.io'

export default class Engine {

  constructor(app) {

    this.rooms = []
    this.io = io(app)

    this.io.on('connection', (socket) => {
      console.log('Socket connected: ' + socket.id)
      socket.on('action', (action) => {
        console.log(action)
        if(action.type === 'server/ping')
          socket.emit('action', {type: 'pong'})
        if (action.type === 'server/create_game') {
          const room = new Game(this.newRoomId())
        }
      })
    })

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

  stop(cb = () => {}) {
    this.io.close(cb)
  }

}
