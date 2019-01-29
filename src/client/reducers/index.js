import * as types from '../constants/actionTypes'
import * as f from '../tools'

const copyState = (state, newState) => Object.assign({}, state, newState)

const updateGhosts = (prevGhosts, newGhosts) => {
  const output = prevGhosts.slice()
  newGhosts.forEach(ghost => {
    const i = prevGhosts.findIndex(g => g.player.id === ghost.player.id)
    if (i === -1)
      output.push(ghost)
    else
      output[i] = ghost
  })
  return output
}

const defaultAnimationState = {
  getStyle: false
}

const reducer = (state = {} , action) => {
  switch(action.type){

    // case types.START_GAME:
    //   return copyState(state, {tetris: newTetris()})

    case types.CREATE_ROOM:
    case types.JOIN_ROOM:
      return copyState(state, {
        connecting: true
      })

    case types.EDIT_NAME:
      return copyState(state, {nickname: action.value.trim().substr(0, 15).trim()})

    case types.EDIT_CODE:
      return copyState(state, {partyCode: action.value.trim().substr(0, 5).trim()})

    case types.NEW_PIECE:
      return copyState(state, {
        ...action.piece,
        //interval: action.interval,
      })

    case 'GRAVITY':
      return copyState(state, {
        interval: action.interval,
      })

    case types.MOVE_PIECE:
      return copyState(state, {
        coords: action.coords,
        rotate: action.rotate !== null ? action.rotate : state.rotate,
      })

    case 'server/UPDATE_TETRIS':
    case types.UPDATE_TETRIS:
      return copyState(state, {
        tetris: action.tetris,
        coords: null,
        ...defaultAnimationState,
      })

    case types.ANIMATION_STEP:
      return copyState(state, {
        getStyle: action.getStyle
      })

    case types.ANIMATION_OVER:
      return copyState(state, {
        getStyle: false,
      })

    case 'USER_CONNECTED':
      return copyState(state, {
        connecting: false,
        playerID: action.id,
      })

    case 'CONNECTING':
      return copyState(state, {
        connecting: action.connecting,
      })

    case 'NICKNAME_ERROR':
      return copyState(state, {
        nicknameError: 'Please enter a nickname',
      })

    case 'JOIN_ROOM_ERROR':
      return copyState(state, {
        roomError: action.error,
        room: null,
      })

    case 'REMOVE_ERROR':
      return copyState(state, {
        [action.name]: '',
      })

    case 'UPDATE_ROOM':
      return copyState(state, {
        room: action.room,
      })

    case 'UPDATE_GHOSTS':
      return copyState(state, {
        playersGhosts: updateGhosts(state.playersGhosts, action.ghosts)
      })

    default:
      return state
  }
}

export default reducer;
