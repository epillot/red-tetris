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

        if (action.nickname)
          user.name = action.nickname

        //console.log(action)
        if(action.type === 'server/ping')
          socket.emit('action', {type: 'pong'})

        else if (action.type === 'server/CREATE_ROOM') {
          const room = Game.createRoom(user)
          //console.log(Game.rooms[0].master.name)
          socket.join(room.id)
          user.sendAction({
            type: 'ROOM_CREATED',
            room: room.getData(),
            hash: room.id + '[' + user.name + ']',
          })
        }

        else if (action.type === 'server/JOIN_ROOM') {
          const room = Game.getRoomById(action.id)
          let error
          if (room) {
            if (room.addUser(user)) {
              socket.join(room.id)
              user.sendActionToRoom(room.id, {
                type: 'NEW_ROOM_USER',
                room: room.getData(),
                hash: room.id + '[' + user.name + ']',
              })
            } else error = 'The room is full'
          } else error = 'This room doesn\'t exist'
          if (error) {
            user.sendAction({
              type: 'JOIN_ROOM_ERROR',
              error,
            })
          }
        }

      })
    })

  }

  stop(cb = () => {}) {
    this.io.close(cb)
  }

}
