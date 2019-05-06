import { newTetris, addBlackLines, putPiece, removeLines } from '../tools/reducers'

export default function tetris(state=null, action) {

  switch (action.type) {

    case 'BEGIN_GAME':
      return newTetris()

    case 'PUT_PIECE':
      return putPiece(state, action)

    case 'REMOVE_LINES':
      return removeLines(state)

    case 'BLACK_LINES':
      return addBlackLines(state, action)

    default:
      return state

  }

}
