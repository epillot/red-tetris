import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import io from 'socket.io-client'
import {storeStateMiddleWare} from '../middleware/storeStateMiddleWare'
import reducer from '../reducers'
import params from '../../../params'
import { gravity, keyEvents } from '../actions'

const newTetris = () => {
  const tetris = [];
  for (let i = 0; i < 10; i++) {
    tetris.push([]);
    for (var j = 0; j < 20; j++) {
      tetris[i][j] = '';
    }
  }
  return tetris;
}

const socketIoMiddleWare = socket => ({dispatch, getState}) => {
  if (socket)
    socket.on('action', action => {
      dispatch(action)
      const { connecting } = getState()
      if (connecting)
        dispatch({type: 'CONNECTING', connecting: false})
      if (action.type === 'NEW_PIECE') {
        addEventListener('keydown', keyEvents)
        dispatch({type: 'GRAVITY', interval: gravity()})
      }
    })
  return next => action => {
    if (socket && action.type && action.type.indexOf('server/') === 0)
      socket.emit('action', action)
    if (socket && action.hash && action.hash.to === socket.id)
      window.location.hash = action.hash.hash
    return next(action)
  }
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
  tetris: newTetris(),
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
}

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(socketIoMiddleWare(socket), thunk, createLogger())
)

export default store
