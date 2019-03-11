export const updateObject = (obj, values) => Object.assign({}, obj, values)

const getTetriminos = (name) => {
  //square
  if (name === 'square') return {
    coords: [[0, -1], [0, 0], [1, -1], [1, 0]],
    rotate: 0,
    color: 'red',
    type: 'square',
  }
  //T
  if (name === 'T') return {
    coords: [[0, -1], [0, 0], [-1, 0], [1, 0]],
    rotate: 0,
    color: 'blue',
    type: 'T',
  }
  //L
  if (name === 'L') return {
    coords: [[0, -2], [0, -1], [0, 0], [1, 0]],
    rotate: 0,
    color: 'yellow',
    type: 'L',
  }
  //reverse L
  if (name === 'revL') return {
    coords: [[0, 0], [0, -1], [0, -2], [1, -2]],
    rotate: 0,
    color: 'green',
    type: 'revL',
  }
  //ligne
  if (name === 'line') return {
    coords: [[0, -3], [0, -2], [0, -1], [0, 0]],
    rotate: 0,
    color: 'purple',
    type: 'line',
  }
  //Z
  if (name === 'Z') return {
    coords: [[1, -1], [0, -1], [0, 0], [-1, 0]],
    rotate: 0,
    color: 'pink',
    type: 'Z',
  }
  //reverse Z
  if (name === 'revZ') return {
    coords: [[-1, -1], [0, -1], [0, 0], [1, 0]],
    rotate: 0,
    color: 'orange',
    type: 'revZ',
  }
}

export const newTetriminos = () => {
  const items = ['line', 'L', 'revL', 'Z', 'revZ', 'T', 'square']
  let name = items[Math.floor(Math.random()*items.length)]
  const t = getTetriminos(name)
  const startx = 4
  for (let i = 0; i < 4; i++) {
    t.coords[i][0] += startx
  }
  return t
}


export const isPossible = (tetris, coords) => {
  if (!tetris)
    return true
  let possible = true;
  for (let i = 0; i < 4; i++) {
    let [x, y] = coords[i]
    if (x < 0 || x > 9 || y > 19 || (y >= 0 && tetris[y][x] !== ''))
      possible = false
  }
  return possible
}

export const tryTranslation = (tetris, coords) => {
  const translations = [ [1, 0], [-1, 0], [2, 0], [-2, 0], [0, 1], [0, 2] ]
  let newCoords
  for (let i = 0; i < translations.length; i++) {
    const [x2, y2] = translations[i]
    newCoords = coords.map(([x, y]) => [x + x2, y + y2])
    if (isPossible(tetris, newCoords))
      return newCoords
  }
  return null
}

export const getCompleteLines = (tetris) => {
  const output = []
  let isComplete
  for (let y = 19; y >= 0; y--) {
    isComplete = true
    for (let x = 0; x < 10; x++) {
      if (tetris[y][x] === '' || tetris[y][x] === 'black') {
        isComplete = false
        break
      }
    }
    if (isComplete)
      output.push(y)
  }
  return output
}

export const getPieceProjection = (tetris, piece) => {
  if (!piece) return null
  const newCoords = piece.coords.map(([x, y]) => [x, y])
  while (true) {
    if (!isPossible(tetris, newCoords))
      break
    newCoords.forEach(block => (block[1])++)
  }
  newCoords.forEach(block => (block[1])--)
  return newCoords
}
