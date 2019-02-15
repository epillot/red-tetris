import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import io from 'socket.io-client'
import {storeStateMiddleWare} from '../middleware/storeStateMiddleWare'
import reducer from '../reducers'
import params from '../../../params'
import { maybeFirstPiece, gravity, keyEvents, server } from '../actions'
import { isPossible, addBlackLines } from '../tools'


const socketIoMiddleWare = socket => ({dispatch, getState}) => {
  if (socket)
    socket.on('action', action => {
      if (action.type === 'NEW_PIECE' && action.piece) {
        dispatch(maybeFirstPiece(action.first)).then(() => {
          if (isPossible(getState().tetris, action.piece.coords)) {
            dispatch(action)
            addEventListener('keydown', keyEvents)
            dispatch({type: 'GRAVITY', interval: gravity()})
          } else {
            dispatch(server.gameOver())
          }
        })
        return
      } else if (action.type === 'UPDATE_GHOST' && action.lines > 0) {
        dispatch(action)
        //const { interval } = getState()
        //clearInterval(interval)
        //removeEventListener('keydown', keyEvents)

        dispatch(server.updateTetris(addBlackLines(getState().tetris, action.lines), 0, false))
        //addEventListener('keydown', keyEvents)
        //dispatch({type: 'GRAVITY', interval: gravity()})
        return
      }

      dispatch(action)
      const { connecting } = getState()
      if (connecting)
        dispatch({type: 'CONNECTING', connecting: false})
    })
  return next => action => {
    if (socket && action.type && action.type.indexOf('server/') === 0)
      socket.emit('action', action)
    if (socket && action.hash && action.hash.to === socket.id)
      window.location.hash = action.hash.hash
    return next(action)
  }
}

const animationMiddleWare = store => next => action => {
  if (!action.getLoop)
    return next(action)

  return new Promise(resolve => {
    let stopped = false

    const stop = () => {
      console.log('---------stop fired---------', action.name)
      if (document.hidden) {
        stopped = true
        resolve(stop)
      }
    }

    const getStop = () => ({stopped, stop})

    console.log('set up listener', action.name)
    addEventListener('visibilitychange', stop)

    const loop = action.getLoop(store.dispatch, resolve, getStop)
    if (document.hidden || !loop) return resolve(stop)

    requestAnimationFrame(loop)
  }).then((stop) => {
    /*Le seul moyen de remove proprement le listener stop est de le retourner quand la promesse est resolue*/
    console.log('remove listener', action.name)
    removeEventListener('visibilitychange', stop)
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

const initialState = {
  tetris: null,
  coords: null,
  color: null,
  rotate: 0,
  type: null,
  Isplaying: false,
  animation: false,
  room: null,
  nickname: '',
  nicknameError: '',
  roomError: '',
  partyCode: '',
  connecting: true,
  playersGhosts: [],
}

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(socketIoMiddleWare(socket), thunk, animationMiddleWare))//, createLogger()))//{
    // predicate: (_, action) => {
    //   switch (action.type) {
    //     case 'UPDATE_TETRIS':
    //     case 'server/UPDATE_TETRIS':
    //       return true
    //     default: return false
    //   }
    // }
  //}))
//)

export default store
