import { updateObject } from '../tools'

const movePiece = (state, { coords, rotate }) => {
  const update = {coords}
  if (rotate !== null)
    update.rotate = rotate
  return updateObject(state, update)
}

export default function piece(state=null, action) {

  switch (action.type) {

    case 'NEW_PIECE':
      return action.piece

    case 'MOVE_PIECE':
      return movePiece(state, action)

    case 'GRAVITY':
      return updateObject(state, {interval: action.interval})

    case 'PUT_PIECE':
      return null

    case 'BLACK_LINES':
      return state && updateObject(state, {coords: state.coords.map(([x, y]) => [x, y - action.nbLines])})

    default:
      return state

  }

}
