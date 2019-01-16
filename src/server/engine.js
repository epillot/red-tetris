import io from 'socket.io'
import Game from './game'
import User from './user'

export default class Engine {

  constructor(app) {

    this.io = io(app)

    this.io.on('connection', (socket) => {
      console.log('Socket connected: ' + socket.id)
      const user = new User(socket)
      const { roomId, name } = socket.handshake.query
      // if (roomId && name) {
      //   const room = Game.addUserToRoom(roomId, user)
      //   if (room) {
      //
      //   }
      // }
      user.sendAction({
        type: 'USER_CONNECTED',
      })
      socket.on('action', (action) => {

        if (action.nickname)
          user.name = action.nickname

        //console.log(action)
        if(action.type === 'server/ping')
          socket.emit('action', {type: 'pong'})

        else if (action.type === 'server/CREATE_ROOM') {
          const room = Game.createRoom(user)
          //console.log(Game.rooms[0].master.name)
          user.sendAction({
            type: 'ROOM_JOINED',
            room: room.getData(),
            hash: room.id + '[' + user.name + ']',
          })
        }

        else if (action.type === 'server/JOIN_ROOM') {
          const room = Game.addUserToRoom(action.id, user)
          if (room) {
            user.sendAction({
              type: 'ROOM_JOINED',
              room: room.getData(),
              hash: room.id + '[' + user.name + ']',
            })
            user.sendActionToRoom(room.id, {
              type: 'NEW_ROOM_USER',
              room: room.getData(),
            })
          } else {
            user.sendAction({
              type: 'JOIN_ROOM_ERROR',
              error: Game.currentError,
            })
          }
        }

      })
    })

  }

  stop(cb = () => {}) {
    this.io.close(cb)
  }

  sendActionToRoom(roomId, action) {
    this.io.to(roomId).emit('action', action)
  }

}
