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

const socketIoMiddleWare = socket => ({dispatch, getState}) => {
  if (socket)
    socket.on('action', action => {
      dispatch(action)
      const { connecting } = getState()
      if (connecting)
        dispatch({type: 'CONNECTING', connecting: false})
      if (action.type === 'NEW_PIECE') {
        
      }

    })
  return next => action => {
    if (socket && action.type && action.type.indexOf('server/') === 0)
      //dispatch({type: 'CONNECTING', connecting: true})
      socket.emit('action', action)
    // const { playerID } = getState()
    // if (socket && !playerID)
    //   dispatch({
    //     type: 'SET_PLAYER_ID',
    //     id: socket.id,
    //   })
    if (socket && action.hash && action.hash.to === socket.id)
      window.location.hash = action.hash.hash
    return next(action)
  }
}

// const connectingMiddleWare = store => next => action => {
//   let result = next(action)
//   if (action.connected) {
//     store.dispatch({type: 'USER_CONNECTED'})
//   }
//   return result
// }

const parseHash = hash => {
  if (hash[6] !== '[' || hash[hash.length - 1] !== ']' || hash.length - 8 > 15)
    return null
  const roomId = hash.substr(1, 5);
  const name = hash.substr(7, hash.length - 8)
  return {roomId, name}
}

const data = parseHash(window.location.hash)
const query = Object.assign({}, parseHash(window.location.hash))
//console.log(roomId, name)
//console.log(query)
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
