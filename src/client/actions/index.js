import * as types from '../constants/actionTypes'
import store from '../store'
import * as f from '../tools'
import rotations from '../tools/rotations'
import { spaceAnimation, pieceAnimation, disparitionLinesAnimation } from './animations'
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
        dispatch(nextTurn2())
      }
    })
  }, 700)
}

export const keyEvents = ({ keyCode }) => store.dispatch(keyEvent(keyCode))

const keyEvent = keyCode => (dispatch, getState) => {
  //const { tetris, piece: { coords, rotate, type, interval } } = getState()
  if (keyCode === 37 || keyCode === 39 || keyCode === 40) {
    const i = keyCode === 37 ? -1 : (keyCode === 39 ? 1 : 0)
    const j = keyCode === 40 ? 1 : 0
    const newCoords = getState().piece.coords.map(([x, y]) => [x+i, y+j])
    if (f.isPossible(getState().tetris, newCoords)) {
      dispatch(movePiece(newCoords))
    }
  } else if (keyCode === 38) {
    const change = rotations[getState().piece.type][getState().piece.rotate];
    let newCoords = getState().piece.coords.map(([x, y], i) => [x + change[i][0], y + change[i][1]])
    if (f.isPossible(getState().tetris, newCoords) || (newCoords = f.tryTranslation(getState().tetris, newCoords))) {
      dispatch(movePiece(newCoords, (getState().piece.rotate+1)%rotations[getState().piece.type].length))
    }
  } else if (keyCode === 32) {
    clearInterval(getState().piece.interval)
    removeEventListener('keydown', keyEvents)
    dispatch(spaceAnimation()).then(() => {
      dispatch(movePiece(f.getPieceProjection(getState().tetris, getState().piece)))
      dispatch(nextTurn2())
    })
  }
}

const ev = new CustomEvent('animations over')

const nextTurn = () => (dispatch, getState) => {

  console.log('before', getState().piece.coords);
  dispatch({type: 'ANIMATION_STARTED'})
  dispatch(pieceAnimation()).then(() => {
    console.log('after', getState().piece.coords);
    const { tetris, piece: { color } } = getState()
    let newTetris = f.copyTetris(getState().tetris)
    dispatch(blackLines(8))
    getState().piece.coords.forEach(([x, y]) => {
      if (y >= 0)
        newTetris[y][x] = color
    })
    const lines = f.getCompleteLines(newTetris)
    dispatch(lineAnimation(lines)).then(() => {
      dispatch(updateTetris(f.removeLinesFirst(newTetris, lines)))
      dispatch(translateAnimation(newTetris, lines)).then(() => {
        dispatch(updateTetris(f.removeLines(newTetris, lines), lines.length - 1))
        dispatchEvent(ev)
        dispatch({type: 'ANIMATION_OVER'})
      })
    })
  })
  // setTimeout(() => {
  //   dispatch(server.updateTetris(f.addBlackLines(getState().tetris, 2), 0, false, 2))
  // }, 250)
}

const nextTurn2 = () => (dispatch, getState) => {
  dispatch(pieceAnimation()).then(() => {
    dispatch(putPiece(getState().piece))
    dispatch(disparitionLinesAnimation()).then(() => {
      dispatch(removeLines())
      dispatch(tryNewPiece(newPiece()))
    })
  })
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

export const putPiece = piece => {
  return {
    type: 'PUT_PIECE',
    piece,
  }
}

export const blackLines = nbLines => {
  return {
    type: 'BLACK_LINES',
    nbLines,
    shouldWait: true,
  }
}

const removeLines = () => {
  return {
    type: 'REMOVE_LINES'
  }
}
