export const copyTetris = tetris => tetris.map(line => line.map(b => b))

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

export const putPiece = (tetris, coords, color) => {
  let newTetris = copyTetris(tetris)
  coords.forEach(([x, y]) => {
    if (y >= 0)
      newTetris[x][y] = color
  });
  const lines = getCompleteLines(newTetris)
  if (lines)
    newTetris = removeLines(newTetris, lines)
  return newTetris
}

//check si un nouveau block se retrouve a la même position qu'un ancien
const checkBlock = (tetris, prevCoords, newCoord) => {
  const [x, y] = newCoord
  for (let i = 0; i < 4; i++) {
    let [x2, y2] = prevCoords[i]
    if (x === x2 && y === y2)
      return true
  }
  return false
}


export const isPossible = (tetris, coords) => {
  let possible = true;
  for (let i = 0; i < 4; i++) {
    let [x, y] = coords[i]
    if (x < 0 || x > 9 || y > 19 || (y >= 0 && tetris[x][y] !== ''))
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
      if (tetris[x][y] === '' || tetris[x][y] === 'black') {
        isComplete = false
        break
      }
    }
    if (isComplete)
      output.push(y)
  }
  return output
}

const getRevGrid = (grid) => {
  const output = []
  for (let y = 0; y < grid[0].length; y++) {
    output[y] = []
    for (let x = 0; x < grid.length; x++) {
      output[y][x] = grid[x][y]
    }
  }
  return output
}

export const removeLinesFirst = (tetris, lines) => {
  const output = copyTetris(tetris)
  for (let y = 0; y < 20; y++) {
    if (lines.indexOf(y) !== -1) {
      for (let x = 0; x < 10; x++) {
        output[x][y] = ''
      }
    }
  }
  return output
}

export const removeLines = (tetris, lines) => {
  if (!lines.length) return tetris
  const newTetris = getRevGrid(tetris)
  lines.reverse().forEach(line => {
    newTetris.splice(line, 1)
    newTetris.unshift(['', '', '', '', '', '', '', '', '', ''])
  })
  return getRevGrid(newTetris)
}

export const getPieceProjection = (tetris, coords) => {
  if (!coords) return null
  const newCoords = coords.map(([x, y]) => [x, y])
  while (true) {
    if (!isPossible(tetris, newCoords))
      break
    newCoords.forEach(block => (block[1])++)
  }
  newCoords.forEach(block => (block[1])--)
  return newCoords
}

export const addBlackLines = (tetris, lines) => {
  const newTetris = getRevGrid(tetris)
  for (let i = 0; i < lines; i++) {
    newTetris.splice(0, 1)
    newTetris.push(['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black'])
  }
  return getRevGrid(newTetris)
}
