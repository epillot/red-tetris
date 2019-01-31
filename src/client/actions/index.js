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
      const { tetris, coords, interval } = getState()
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
  const { tetris, coords, rotate, type, interval } = getState()
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
    const proj = f.getPieceProjection(tetris, coords)
    dispatch(spaceAnimation(coords, proj)).then(() => {
      dispatch(nextTurn(proj))
    })
  }
}

const nextTurn = (coords) => (dispatch, getState) => {
  const { tetris, color } = getState()
  let newTetris = f.copyTetris(tetris)
  coords.forEach(([x, y]) => {
    if (y >= 0)
      newTetris[x][y] = color
  });
  const lines = f.getCompleteLines(newTetris)
  dispatch(pieceAnimation(coords)).then(() => {
    dispatch(lineAnimation(lines)).then(() => {
      dispatch(updateTetris(f.removeLinesFirst(newTetris, lines)))
      dispatch(translateAnimation(newTetris, lines)).then(() => {
        dispatch(server.updateTetris(f.removeLines(newTetris, lines), lines.length - 1))
        // const piece = f.newTetriminos()
        // if (f.isPossible(newTetris, piece.coords))
        //   dispatch(newPiece(piece))
      })
    })
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

export const newPiece = (piece=null) => {
  addEventListener('keydown', keyEvents)
  return {
    type: types.NEW_PIECE,
    piece: piece || f.newTetriminos(),
    interval: gravity(),
  }
}

export const movePiece = (coords, rotate=null) => {
  return {
    type: types.MOVE_PIECE,
    coords,
    rotate,
  }
}

const putPiece = (coords) => {
  return {
    type: types.PUT_PIECE,
    coords,
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
