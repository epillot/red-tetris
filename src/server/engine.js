import io from 'socket.io'
import Game from './game'
import User from './user'

export default class Engine {

  constructor(app) {

    this.io = io(app)

    this.io.on('connection', (socket) => {
      console.log('Socket connected: ' + socket.id)
      const user = new User(socket)
      socket.on('action', (action) => {
        //console.log(action)
        if(action.type === 'server/ping')
          socket.emit('action', {type: 'pong'})
        if (action.type === 'server/CREATE_ROOM') {
          const id = Game.createRoom(user)
          user.name = action.nickname
          //console.log(Game.rooms[0].master.name)
          user.sendAction({type: 'ROOM_CREATED', id, hash: id + '[' + user.name + ']'})
        }
      })
    })

  }

  stop(cb = () => {}) {
    this.io.close(cb)
  }

}
