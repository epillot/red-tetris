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
