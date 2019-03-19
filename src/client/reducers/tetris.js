import { updateObject, getCompleteLines, isComplete, isEmpty } from '../tools'

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

const addBlackLines2 = (state, action) => {
  const output = state.slice()
  for (let i = 0; i < action.nbLines; i++) {
    output.push(getBlackLine())
    if (isEmpty(output[0]))
      output.shift()
  }
  return output
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

const putPiece2 = (state, action) => {
  const output = state.slice()
  const { coords, color } = action.piece
  const ymin = Math.min(...coords.map(([x, y]) => y))
  for (let i = 0; i > ymin; i--) {
    output.unshift(getEmptyLine())
  }
  const newCoords = ymin < 0 ? coords.map(([x, y]) => [x, y - ymin]) : coords
  newCoords.forEach(([x, y]) => {
    output[y][x] = color
  })
  return output
}


const removeLines = state => {
  const output = state.slice()
  for (let y = 0; y < output.length; y++) {
    if (isComplete(output[y])) {
      output.splice(y, 1)
      if (output.length < 20)
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
      return putPiece2(state, action)

    case 'REMOVE_LINES':
      return removeLines(state)

    case 'BLACK_LINES':
      return addBlackLines2(state, action)

    default:
      return state

  }

}
