import { updateObject, getCompleteLines, isComplete } from '../tools'

const newTetris = () => {
  const tetris = []
  for (let i = 0; i < 20; i++) {
    tetris.push([])
    for (let j = 0; j < 10; j++) {
      tetris[i][j] = ''
    }
  }
  return tetris;
}

const getBlackLine = () => ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black']

const getEmptyLine = () => ['', '', '', '', '', '', '', '', '', '']

const addBlackLines = (state, action) => {
  return state.map((line, i) => {
    if (i + action.nbLines < state.length)
      return state[i + action.nbLines]
    return getBlackLine()
  })
}

const putPiece = (state, action) => {
  const { coords, color } = action.piece
  return state.map((line, y) => {
    return line.map((block, x) => {
      for (let i = 0; i < 4; i++) {
        let [px, py] = coords[i]
        if (px===x && py===y)
          return color
      }
      return block
    })
  })
}

const removeLines = state => {
  const output = state.slice()
  for (let y = 0; y < output.length; y++) {
    if (isComplete(output[y])) {
      output.splice(y, 1)
      output.unshift(getEmptyLine())
    }
  }
  return output
}


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
