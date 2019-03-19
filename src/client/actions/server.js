import * as types from '../constants/actionTypes'

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

export const updateTetris = (tetris, lines) => {

  return {
    type: 'server/UPDATE_TETRIS',
    tetris,
    lines,
  }
}

export const gameOver = () => {
  return {
    type: 'server/GAME_OVER',
  }
}
