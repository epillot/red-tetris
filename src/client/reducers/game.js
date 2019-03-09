import { updateObject } from '../tools'

const initialState = {
  timer: null,
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

    default:
      return state

  }

}
