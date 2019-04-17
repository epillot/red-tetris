//import store from '../store'
import * as f from '../tools'
import rotations from '../tools/rotations'
import { spaceAnimation, pieceAnimation, disparitionLinesAnimation } from './animations'
import * as ui from './ui'
import * as piece from './piece'
import * as tetris from './tetris'
import * as server from './server'

export {server, ui, tetris, piece}

// export const gravity = () => {
//   return setInterval(() => {
//     store.dispatch((dispatch, getState) => {
//       const newCoords = getState().piece.coords.map(([x, y]) => [x, y+1])
//       if (f.isPossible(getState().tetris, newCoords)) {
//         dispatch(piece.movePiece(newCoords))
//       } else {
//         clearInterval(getState().piece.interval)
//         removeEventListener('keydown', keyEvents)
//         dispatch(nextTurn())
//       }
//     })
//   }, 700)
// }


const gravity = () => (dispatch, getState) => {
  const interval = setInterval(() => {
    dispatch(() => {
      const newCoords = getState().piece.coords.map(([x, y]) => [x, y+1])
      if (f.isPossible(getState().tetris, newCoords)) {
        dispatch(piece.movePiece(newCoords))
      } else {
        clearInterval(interval)
        dispatch(piece.interval(null))
        //removeEventListener('keydown', keyEvents)
        removeKeyEvents()
        dispatch(nextTurn())
      }
    })
  }, 700)
  dispatch(piece.interval(interval))
}

let keyEvents

export const setKeyEvents = () => (dispatch) => {
  keyEvents = ({ keyCode }) => dispatch(keyEvent(keyCode))
  addEventListener('keydown', keyEvents)
}

const removeKeyEvents = () => {
  if (keyEvents) {
    removeEventListener('keydown', keyEvents)
    keyEvents = undefined
  }
}

//export const keyEvents = ({ keyCode }) => store.dispatch(keyEvent(keyCode))

const keyEvent = keyCode => (dispatch, getState) => {
  //const { tetris, piece: { coords, rotate, type, interval } } = getState()
  if (keyCode === 37 || keyCode === 39 || keyCode === 40) {
    const i = keyCode === 37 ? -1 : (keyCode === 39 ? 1 : 0)
    const j = keyCode === 40 ? 1 : 0
    const newCoords = getState().piece.coords.map(([x, y]) => [x+i, y+j])
    if (f.isPossible(getState().tetris, newCoords)) {
      dispatch(piece.movePiece(newCoords))
    }
  } else if (keyCode === 38) {
    const change = rotations[getState().piece.type][getState().piece.rotate];
    let newCoords = getState().piece.coords.map(([x, y], i) => [x + change[i][0], y + change[i][1]])
    if (f.isPossible(getState().tetris, newCoords) || (newCoords = f.tryTranslation(getState().tetris, newCoords))) {
      dispatch(piece.movePiece(newCoords, (getState().piece.rotate+1)%rotations[getState().piece.type].length))
    }
  } else if (keyCode === 32) {
    clearInterval(getState().piece.interval)
    //removeEventListener('keydown', keyEvents)
    removeKeyEvents()
    dispatch(spaceAnimation()).then(() => {
      dispatch(piece.movePiece(f.getPieceProjection(getState().tetris, getState().piece)))
      dispatch(nextTurn())
    })
  }
}

const nextTurn = () => (dispatch, getState) => {
  dispatch(pieceAnimation()).then(() => {
    dispatch(tetris.putPiece(getState().piece))
    const lines = f.getCompleteLines(getState().tetris).length
    dispatch(disparitionLinesAnimation(lines)).then(() => {
      dispatch(tetris.removeLines())
      dispatch(server.updateTetris(lines - 1, true))
    })
  })
}

export const tryNewPiece = action => async (dispatch, getState) => {
  if (action.first)
    await dispatch(startGame())
  const len = getState().tetris.length - 20
  action.piece.coords = action.piece.coords.map(([x, y]) => [x, y + len])
  // console.log(action.piece.coords);
  if (f.isPossible(getState().tetris, action.piece.coords)) {
    dispatch(action)
    //addEventListener('keydown', keyEvents)
    dispatch(setKeyEvents())
    //dispatch({type: 'GRAVITY', interval: gravity()})
    dispatch(gravity())
  } else {
    dispatch(server.gameOver())
  }
}

const startGame = () => (dispatch, getState) => {
  dispatch(beginGame())
  let timer = 3
  dispatch(updateTimer(timer))
  return new Promise(resolve => {
    const interval = setInterval(() => {
      timer--
      if (timer > 0) {
        dispatch(updateTimer(timer))
      } else {
        clearInterval(interval)
        resolve()
      }
    }, 1000)
  })
}

const updateTimer = (timer) => {
  return {
    type: 'UPDATE_TIMER',
    timer,
  }
}

const beginGame = () => {
  return {
    type: 'BEGIN_GAME',
  }
}

export const pause = () => (dispatch, getState) => {
  if (getState().piece && getState().piece.interval) {
    clearInterval(getState().piece.interval)
    removeKeyEvents()
    dispatch(piece.interval(null))
  } else if (getState().piece) {
    dispatch(gravity())
    dispatch(setKeyEvents())
  }
}
