import { combineReducers } from 'redux'
import * as types from '../constants/actionTypes'
import * as f from '../tools'
import animations from './animations'
import connecting from './connecting'
import game from './game'
import piece from './piece'
import playersGhosts from './playersGhosts'
import room from './room'
import tetris from './tetris'
import ui from './ui'

// const copyState = (state, newState) => Object.assign({}, state, newState)
//
// const updateGhost = (action, state) => {
//   const output = Object.assign({}, state.playersGhosts)
//   output[action.id] = action.tetris
//   //console.log(output)
//   return output
// }
//
// const getPlayersGhostsOld = (room, playerID) => {
//   const output = {}
//   room.users.filter(user => user.id !== playerID).forEach(user => {
//     output[user.id] = user.tetris
//   })
//   return output
// }
//
// const getPlayersGhosts = (room, { playerID, playersGhosts }) => {
//   const output = Object.assign({}, playersGhosts)
//   const users = room.users.filter(user => user.id !== playerID)
//
//   Object.keys(output).forEach(id => {
//     if (!users.find(user => user.id === id))
//       delete output[id]
//   })
//
//   users.forEach(user => {
//     if (!output[user.id])
//       output[user.id] = user.tetris
//   })
//   return output
// }
//
// const newTetris = () => {
//   const tetris = [];
//   for (let i = 0; i < 20; i++) {
//     tetris.push([]);
//     for (let j = 0; j < 10; j++) {
//       tetris[i][j] = '';
//     }
//   }
//   return tetris;
// }
//
// const defaultAnimationState = {
//   getStyle: false
// }
//
// const reducer = (state = {} , action) => {
//   switch(action.type){
//
//     // case types.START_GAME:
//     //   return copyState(state, {
//     //     tetris: newTetris(),
//     //     gameOver: false,
//     //   })
//
//     case types.CREATE_ROOM:
//     case types.JOIN_ROOM:
//       return copyState(state, {
//         connecting: true
//       })
//
//     case types.EDIT_NAME:
//       return copyState(state, {nickname: action.value.trim().substr(0, 15).trim()})
//
//     case types.EDIT_CODE:
//       return copyState(state, {partyCode: action.value.trim().substr(0, 5).trim()})
//
//     case types.NEW_PIECE:
//       return copyState(state, {
//         ...action.piece,
//         isPlaying: true,
//         timer: null,
//         tetris: action.first ? newTetris() : state.tetris,
//         gameOver: action.first ? false : state.gameOver,
//         //interval: action.interval,
//       })
//
//     case 'GRAVITY':
//       return copyState(state, {
//         interval: action.interval,
//       })
//
//     case types.MOVE_PIECE:
//       return copyState(state, {
//         coords: action.coords,
//         rotate: action.rotate !== null ? action.rotate : state.rotate,
//       })
//
//     case 'server/UPDATE_TETRIS':
//     case types.UPDATE_TETRIS:
//       return copyState(state, {
//         tetris: action.tetris,
//         coords: action.newPiece ? null : state.coords.map(([x, y]) => [x, y - action.lines]),
//         ...defaultAnimationState,
//       })
//
//     case types.ANIMATION_STEP:
//       return copyState(state, {
//         getStyle: action.getStyle,
//       })
//
//     case types.ANIMATION_OVER:
//       return copyState(state, {
//         getStyle: false,
//       })
//
//     case 'USER_CONNECTED':
//       return copyState(state, {
//         connecting: false,
//         playerID: action.id,
//       })
//
//     case 'CONNECTING':
//       return copyState(state, {
//         connecting: action.connecting,
//       })
//
//     case 'NICKNAME_ERROR':
//       return copyState(state, {
//         nicknameError: 'Please enter a nickname',
//       })
//
//     case 'JOIN_ROOM_ERROR':
//       return copyState(state, {
//         roomError: action.error,
//         room: null,
//       })
//
//     case 'REMOVE_ERROR':
//       return copyState(state, {
//         [action.name]: '',
//       })
//
//     case 'UPDATE_ROOM':
//       return copyState(state, {
//         room: action.room,
//         playersGhosts: getPlayersGhosts(action.room, state),
//       })
//
//     case 'UPDATE_GHOST':
//       return copyState(state, {
//         playersGhosts: updateGhost(action, state),
//       })
//
//     case 'UPDATE_TIMER':
//       return copyState(state, {
//         timer: action.timer,
//       })
//
//     case 'server/GAME_OVER':
//       return copyState(state, {
//         isPlaying: false,
//         gameOver: true,
//       })
//
//     default:
//       return state
//   }
// }

//export default reducer;

export default combineReducers({
  getStyle: animations,
  connecting,
  game,
  piece,
  playersGhosts,
  room,
  tetris,
  ui,
})
