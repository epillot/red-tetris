import { updateObject } from '../tools'

const initialState = {
  isPlaying: false,
  gameOver: false,
  timer: null,
}

export default function game(state=initialState, action) {

  switch (action.type) {

    case 'NEW_PIECE':
      return updateObject(state, {
        isPlaying: true,
      })

    case 'UPDATE_TIMER':
      return updateObject(state, {
        timer: action.timer,
      })

    case 'server/GAME_OVER':
      return updateObject(state, {
        isPlaying: false,
        gameOver: true,
      })

    default:
      return state

  }

}
