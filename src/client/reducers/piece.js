import { updateObject } from '../tools'

const movePiece = (state, { coords, rotate }) => {
  const update = {coords}
  if (rotate !== null)
    update.rotate = rotate
  return updateObject(state, update)
}

const blackLines = (state, { nbLines, tetris }) => {
  const startY = tetris.length - 20
  const maxY =  Math.max(...state.coords.map(([x, y]) => y))
  let yi
  if (maxY > startY) {
    yi = nbLines
    while (maxY - yi < startY - 1)
      yi--
  } else {
    yi = maxY - startY
  }
  return updateObject(state, {coords: state.coords.map(([x, y]) => [x, y - yi])})
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
      return state && blackLines2(state, action)

    default:
      return state

  }

}
