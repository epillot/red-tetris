import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import io from 'socket.io-client'
import {storeStateMiddleWare} from '../middleware/storeStateMiddleWare'
import reducer from '../reducers'
import params from '../../../params'
import { tryNewPiece, movePiece, server, keyEvents, blackLines } from '../actions'
import { isPossible, addBlackLines } from '../tools'

const socketIoMiddleWare = socket => ({dispatch, getState}) => {
  addEventListener('keydown', ({ keyCode }) => {
    if (keyCode === 27 && getState().tetris)
      dispatch(blackLines(2))
  })
  if (socket) {
    socket.on('action', action => {
      if (action.type === 'NEW_PIECE') {
        if (action.room)
          dispatch({type: 'UPDATE_ROOM', room: action.room})
        dispatch(tryNewPiece(action))
      } else if (action.type === 'UPDATE_GHOST' && action.lines > 0) {
        dispatch(action)
        dispatch(server.updateTetris(addBlackLines(getState().tetris, action.lines), 0, false))
      } else if (action.type === 'UPDATE_ROOM') {
        dispatch(action)
        const winner = action.room.users.find(user => user.win === true)
        if (winner && winner.id === getState().connecting.playerID) {
          const piece = getState().piece
          if (piece) {
            clearInterval(piece.interval)
            removeEventListener('keydown', keyEvents)
          }
        }
      } else
        dispatch(action)
    })
  }
  return next => action => {
    if (socket && action.type && action.type.indexOf('server/') === 0)
      socket.emit('action', action)
    if (socket && action.hash && action.hash.to === socket.id)
      window.location.hash = action.hash.hash
    return next(action)
  }
}

const animationMiddleWare = ({ dispatch, getState }) => next => action => {

  if (!action.isAnimation)
    return next(action)

  if (document.hidden) return Promise.resolve()

  const nextAction = () => {
    if (action.type === 'SPACE_ANIMATION') {
      const newCoords = getState().piece.coords.map(([x, y]) => [x, y + 2])
      if (isPossible(getState().tetris, newCoords))
        return movePiece(newCoords)
      return null
    }

    const actions = action.actions

    if (actions.length)
      return actions.shift()
    return null
  }

  return new Promise(resolve => {
    let stopped = false

    const stop = () => {
      console.log('---------stop fired---------')
      if (document.hidden) {
        stopped = true
        resolve()
      }
    }

    addEventListener('visibilitychange', stop)

    const loop = () => {
      const animAction = nextAction()
      if (animAction && !stopped) {
        dispatch(animAction)
        requestAnimationFrame(loop)
      } else {
        resolve()
        removeEventListener('visibilitychange', stop)
      }
    }

    requestAnimationFrame(loop)
  })
}

const parseHash = hash => {
  if (hash[6] !== '[' || hash[hash.length - 1] !== ']' || hash.length - 8 > 15)
    return null
  const roomId = hash.substr(1, 5);
  const name = hash.substr(7, hash.length - 8)
  return {roomId, name}
}

const data = parseHash(window.location.hash)
const query = Object.assign({}, parseHash(window.location.hash))
const socket = io(params.server.url, {query})

// const initialState = {
//   tetris: null,
//   coords: null,
//   color: null,
//   rotate: 0,
//   type: null,
//   Isplaying: false,
//   animation: false,
//   room: null,
//   nickname: '',
//   nicknameError: '',
//   roomError: '',
//   partyCode: '',
//   connecting: true,
//   playersGhosts: [],
// }

const store = createStore(
  reducer,
  {},
  applyMiddleware(socketIoMiddleWare(socket), thunk, animationMiddleWare, createLogger({
    predicate: (_, action) => {
      switch (action.type) {
        case 'REMOVE_LINES':
        case 'PUT_PIECE':
        case 'BLACK_LINES':
        case 'MOVE_PIECE':
          return true
        default: return false
      }
    }
  }))
)

export default store
