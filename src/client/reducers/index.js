import * as types from '../constants/actionTypes'
import * as f from '../tools'

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

const copyState = (state, newState) => Object.assign({}, state, newState)

const defaultAnimationState = {
  getStyle: false
}

const reducer = (state = {} , action) => {
  switch(action.type){

    case types.START_GAME:
      return copyState(state, {tetris: newTetris()})

    case types.CREATE_ROOM:
      return copyState(state, {room: null})

    case types.EDIT_NAME:
      return copyState(state, {nickname: action.value.trim().substr(0, 15).trim()})

    // case types.NEW_PIECE:
    //   return copyState(state, {
    //     ...action.piece,
    //     tetris: f.putPiece(f.copyTetris(state.tetris), action.piece.coords, action.piece.color),
    //     ghost: f.getPieceGhost(state.tetris, action.piece.coords)
    //   })

    case types.NEW_PIECE:
      return copyState(state, {
        ...action.piece,
        interval: action.interval,
        ghost: f.getPieceGhost(state.tetris, action.piece.coords),
      })

    // case types.MOVE_PIECE:
    //   const newGrid = f.movePiece(f.copyTetris(state.tetris), state.coords, action.coords, state.color)
    //   return copyState(state, {
    //     tetris: newGrid,
    //     coords: action.coords,
    //     rotate: action.rotate !== null ? action.rotate : state.rotate,
    //     ghost: f.getPieceGhost(newGrid, action.coords)
    //   })

    case types.MOVE_PIECE:
      return copyState(state, {
        coords: action.coords,
        rotate: action.rotate !== null ? action.rotate : state.rotate,
        ghost: f.getPieceGhost(state.tetris, action.coords)
      })

    case types.UPDATE_TETRIS:
      return copyState(state, {
        tetris: action.tetris,
        coords: null,
        ghost: null,
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

    default:
      return state
  }
}

export default reducer;
