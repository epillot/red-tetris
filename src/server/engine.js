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
      if (roomId && name) {
        user.name = name
        this.addUserToRoom(roomId, user)
      }
      user.sendAction({
        type: 'USER_CONNECTED',
      })

      socket.on('disconnect', () => {
        this.disconnectUser(user)
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
            type: 'UPDATE_ROOM',
            room: room.getData(),
            hash: room.getHash(user)
          })
        }

        else if (action.type === 'server/JOIN_ROOM') {
          this.addUserToRoom(action.id, user)
        }

      })
    })

  }

  stop(cb = () => {}) {
    this.io.close(cb)
  }

  disconnectUser(user) {
    if (user.room) {
      const room = Game.removeUserFromRoom(user.room, user)
      if (room) {
        this.sendActionToRoom(room.id, {
          type: 'UPDATE_ROOM',
          room: room.getData(),
        })
      }
    }
  }

  addUserToRoom(roomId, user) {
    const room = Game.addUserToRoom(roomId, user)
    if (room) {
      this.sendActionToRoom(room.id, {
        type: 'UPDATE_ROOM',
        room: room.getData(),
        hash: room.getHash(user),
      })
    } else {
      user.sendAction({
        type: 'JOIN_ROOM_ERROR',
        error: Game.currentError,
        hash: {
          to: user.socket.id,
          hash: '',
        }
      })
    }
  }

  sendActionToRoom(roomId, action) {
    this.io.to(roomId).emit('action', action)
  }

}