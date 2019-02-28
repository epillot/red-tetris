import * as types from '../constants/actionTypes'
import store from '../store'
import * as f from '../tools'
import rotations from '../tools/rotations'
import { lineAnimation, spaceAnimation, translateAnimation, pieceAnimation } from './animations'
import * as server from './server'

export {server}

export const gravity = () => {
  return setInterval(() => {
    store.dispatch((dispatch, getState) => {
      const { tetris, piece: { coords, interval } } = getState()
      const newCoords = coords.map(([x, y]) => [x, y+1])
      if (f.isPossible(tetris, newCoords)) {
        dispatch(movePiece(newCoords))
      } else {
        clearInterval(interval)
        removeEventListener('keydown', keyEvents)
        dispatch(nextTurn(coords))
      }
    })
  }, 700)
}

export const keyEvents = ({ keyCode }) => store.dispatch(keyEvent(keyCode))

const keyEvent = keyCode => (dispatch, getState) => {
  const { tetris, piece: { coords, rotate, type, interval } } = getState()
  if (keyCode === 37 || keyCode === 39 || keyCode === 40) {
    const i = keyCode === 37 ? -1 : (keyCode === 39 ? 1 : 0)
    const j = keyCode === 40 ? 1 : 0
    const newCoords = coords.map(([x, y]) => [x+i, y+j])
    if (f.isPossible(tetris, newCoords)) {
      dispatch(movePiece(newCoords))
    }
  } else if (keyCode === 38) {
    const change = rotations[type][rotate];
    let newCoords = coords.map(([x, y], i) => [x + change[i][0], y + change[i][1]])
    if (f.isPossible(tetris, newCoords) || (newCoords = f.tryTranslation(tetris, newCoords))) {
      dispatch(movePiece(newCoords, (rotate+1)%rotations[type].length))
    }
  } else if (keyCode === 32) {
    clearInterval(interval)
    removeEventListener('keydown', keyEvents)
    const proj = f.getPieceProjection(tetris, {coords})
    dispatch(spaceAnimation(coords, proj)).then(() => {
      dispatch(nextTurn(proj))
    })
  }
}

const nextTurn = () => (dispatch, getState) => {

  console.log('before', getState().piece.coords);
  dispatch(pieceAnimation()).then(() => {
    console.log('after', getState().piece.coords);
    const { tetris, piece: { color } } = getState()
    let newTetris = f.copyTetris(getState().tetris)
    dispatch(server.updateTetris(f.addBlackLines(getState().tetris, 2), 0, false, 2))
    getState().piece.coords.forEach(([x, y]) => {
      if (y >= 0)
        newTetris[y][x] = color
    })
    const lines = f.getCompleteLines(newTetris)
    dispatch(lineAnimation(lines)).then(() => {
      dispatch(updateTetris(f.removeLinesFirst(newTetris, lines)))
      dispatch(translateAnimation(newTetris, lines)).then(() => {
        dispatch(updateTetris(f.removeLines(newTetris, lines), lines.length - 1))
      })
    })
  })
  // setTimeout(() => {
  //   dispatch(server.updateTetris(f.addBlackLines(getState().tetris, 2), 0, false, 2))
  // }, 250)
}

export const tryNewPiece = action => async (dispatch, getState) => {
  if (action.first)
    await dispatch(startGame())
  if (f.isPossible(getState().tetris, action.piece.coords)) {
    dispatch(action)
    addEventListener('keydown', keyEvents)
    dispatch({type: 'GRAVITY', interval: gravity()})
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

export const editName = (value) => {
  return {
    type: types.EDIT_NAME,
    value,
  }
}

export const editCode = (value) => {
  return {
    type: types.EDIT_CODE,
    value,
  }
}

export const movePiece = (coords, rotate=null) => {
  return {
    type: types.MOVE_PIECE,
    coords,
    rotate,
  }
}

const updateTetris = (tetris) => {
  return {
    type: types.UPDATE_TETRIS,
    tetris,
    newPiece: true,
  }
}


export const nicknameError = () => {
  return {
    type: 'NICKNAME_ERROR',
  }
}

export const removeError = (name) => {
  return {
    type: 'REMOVE_ERROR',
    name,
  }
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

export const newPiece = () => {
  const piece = f.newTetriminos()
  return {
    type: 'NEW_PIECE',
    piece,
  }
}
