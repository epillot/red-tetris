import { updateObject } from '../tools'

const movePiece = (state, { coords, rotate }) => updateObject(state, {coords, rotate})

export default function piece(state=null, action) {

  switch (action.type) {

    case 'NEW_PIECE':
      return action.piece

    case 'MOVE_PIECE':
      return movePiece(state, action)

    default:
      return state

  }

}
