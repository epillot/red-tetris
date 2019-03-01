import { updateObject } from '../tools'

const initialState = {
  gameOver: false,
  timer: null,
  isAnimating: false,
}

export default function game(state=initialState, action) {

  switch (action.type) {

    case 'NEW_PIECE':
      return updateObject(state, {
        timer: null,
      })

    case 'UPDATE_TIMER':
      return updateObject(state, {
        timer: action.timer,
      })

    // case 'server/GAME_OVER':
    //   return updateObject(state, {
    //     gameOver: true,
    //   })

    case 'ANIMATION_STARTED':
      return updateObject(state, {
        isAnimating: true,
      })

    case 'ANIMATION_OVER':
      return updateObject(state, {
        isAnimating: false,
      })

    default:
      return state

  }

}
