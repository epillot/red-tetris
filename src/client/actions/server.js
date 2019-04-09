import { getGhostData } from '../tools'

export const startGame = () => {
  return {
    type: 'server/START_GAME',
  }
}

export const createRoom = (nickname) => {
  return {
    type: 'server/CREATE_ROOM',
    nickname,
  }
}

export const joinRoom = (id, nickname) => {
  return {
    type: 'server/JOIN_ROOM',
    id,
    nickname,
  }
}

export const updateTetris = (lines=0, newPiece=false) => (dispatch, getState) => {
  const ghost = getGhostData(getState().tetris)
  dispatch({
    type: 'server/UPDATE_TETRIS',
    ghost,
    lines,
    newPiece,
  })
}

export const gameOver = () => {
  return {
    type: 'server/GAME_OVER',
  }
}
