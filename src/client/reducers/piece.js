import { updateObject } from '../tools'
import { movePiece, blackLines } from '../tools/reducers'

export default function piece(state=null, action) {

  switch (action.type) {

    case 'NEW_PIECE':
      return action.piece

    case 'MOVE_PIECE':
      return movePiece(state, action)

    case 'PIECE_INTERVAL':
      return updateObject(state, {interval: action.interval})

    case 'PUT_PIECE':
      return null

    case 'BLACK_LINES':
      return state && blackLines(state, action)

    default:
      return state

  }

}
