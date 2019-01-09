import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import io from 'socket.io-client'
import {storeStateMiddleWare} from '../middleware/storeStateMiddleWare'
import reducer from '../reducers'
import params from '../../../params'

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

const initialState = {
  tetris: newTetris(),
  coords: null,
  color: null,
  rotate: 0,
  type: null,
  Isplaying: false,
  animation: false,
  hash: window.location.hash,
  room: null,
  nickname: '',
  nicknameError: '',
  partyCode: '',
}

const socketIoMiddleWare = socket => ({dispatch, getState}) => {
  if(socket) socket.on('action', dispatch)
  return next => action => {
    if(socket && action.type && action.type.indexOf('server/') === 0) socket.emit('action', action)
    if (action.hash)
      window.location.hash = action.hash
    return next(action)
  }
}

const socket = io(params.server.url)

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(socketIoMiddleWare(socket), thunk, createLogger())
)

// const logger = store => {
//   return next => {
//     return action => {
//       console.log('dispatching', action)
//       let result = next(action)
//       console.log('next state', store.getState())
//       return result
//     }
//   }
// }
//
// const lol = store => next => action => {
//   console.log('lolilol ;P XD');
//   return next(action)
// }
//
// function myApplyMiddleware(store, middlewares) {
//   middlewares = middlewares.slice()
//   middlewares.reverse()
//   let dispatch = store.dispatch
//   middlewares.forEach(middleware =>
//     dispatch = middleware(store)(dispatch)
//   )
//   return Object.assign({}, store, { dispatch })
// }
//
// store = myApplyMiddleware(store, [lol, logger])

export default store
