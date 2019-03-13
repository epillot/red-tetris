import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import io from 'socket.io-client'
import params from '../../../params'
import reducer from '../reducers'
//import { storeStateMiddleWare } from '../middleware/storeStateMiddleWare'
import { socketIoMiddleWare } from '../middleware/socketIoMiddleWare'
import { animationMiddleWare } from '../middleware/animationMiddleWare'

const parseHash = hash => {
  if (hash[6] !== '[' || hash[hash.length - 1] !== ']' || hash.length - 8 > 15)
    return null
  const roomId = hash.substr(1, 5);
  const name = hash.substr(7, hash.length - 8)
  return {roomId, name}
}

const query = Object.assign({}, parseHash(window.location.hash))
const socket = io(params.server.url, {query})


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
          return false
        default: return false
      }
    }
  }))
)

export default store
