import * as types from '../constants/actionTypes'

export const ping = () => {
  return {
    type: 'server/ping'
  }
}

export const startGame = () => {
  return {
    type: types.START_GAME,
  }
}

export const createRoom = (nickname) => {
  return {
    type: types.CREATE_ROOM,
    nickname,
  }
}

export const joinRoom = (id, nickname) => {
  return {
    type: types.JOIN_ROOM,
    id,
    nickname,
  }
}

export const updateTetris = (tetris, lines=0, newPiece=true, wl=0) => {

  return {
    type: 'server/UPDATE_TETRIS',
    tetris,
    lines,
    newPiece,
    wl,
  }
}

export const gameOver = () => {
  return {
    type: 'server/GAME_OVER',
  }
}
