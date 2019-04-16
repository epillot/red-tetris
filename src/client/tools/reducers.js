import { updateObject, isComplete, isEmpty } from '.'

export const movePiece = (state, { coords, rotate }) => {
  const update = {coords}
  if (rotate !== null)
    update.rotate = rotate
  return updateObject(state, update)
}

export const blackLines = (state, { nbLines, tetris }) => {
  const startY = tetris.length - 20
  const maxY = Math.max(...state.coords.map(([x, y]) => y))
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

export const getPlayersGhosts = (state, { room }) => {
  const output = Object.assign({}, state)
  const users = room.users

  Object.keys(output).forEach(id => {
    if (!users.find(user => user.id === id))
      delete output[id]
  })

  users.forEach(user => {
    if (!output[user.id])
      output[user.id] = user.ghost
  })
  return output
}

export const initGhosts = state => {
  const output = Object.assign({}, state)
  Object.keys(output).forEach(id => {
    output[id] = undefined
  })
  return output
}

export const newTetris = () => {
  const tetris = []
  for (let i = 0; i < 20; i++) {
    tetris.push([])
    for (let j = 0; j < 10; j++) {
      tetris[i][j] = ''
    }
  }
  return tetris;
}

const getBlackLine = (len) => {
  const output = []
  for (let i = 0; i < len; i++) {
    output.push('black')
  }
  return output
}

const getEmptyLine = (len) => {
  const output = []
  for (let i = 0; i < len; i++) {
    output.push('')
  }
  return output
}

export const addBlackLines = (state, action) => {
  const output = state.slice()
  for (let i = 0; i < action.nbLines; i++) {
    output.push(getBlackLine(state[0].length))
    if (isEmpty(output[0]))
      output.shift()
  }
  return output
}

export const putPiece = (state, action) => {
  const output = state.map(line => line.map(b => b))
  const { coords, color } = action.piece
  const ymin = Math.min(...coords.map(([x, y]) => y))
  for (let i = 0; i > ymin; i--) {
    output.unshift(getEmptyLine(state[0].length))
  }
  const newCoords = ymin < 0 ? coords.map(([x, y]) => [x, y - ymin]) : coords
  newCoords.forEach(([x, y]) => {
    output[y][x] = color
  })
  return output
}


export const removeLines = state => {
  const output = state.slice()
  let count = 0;
  for (let y = output.length - 1; y >= 0; y--) {
    if (isComplete(output[y])) {
      count++
      output.splice(y, 1)
    }
  }
  while (count > 0 && output.length < 20)
    output.unshift(getEmptyLine(state[0].length))
  return output
}
