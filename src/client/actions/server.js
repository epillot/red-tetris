export const startGame = () => {
  return {
    type: 'server/START_GAME',
  }
}

export const createRoom = (nickname) => {
  return {
    type: 'server/CREATE_ROOM',
    nickname,
  }
}

export const joinRoom = (id, nickname) => {
  return {
    type: 'server/JOIN_ROOM',
    id,
    nickname,
  }
}

// export const updateTetris = (tetris, lines) => {
//
//   return {
//     type: 'server/UPDATE_TETRIS',
//     tetris,
//     lines,
//   }
// }

const getGhostData = (tetris) => {
  let nbLine = 0
  for (let y = tetris.length - 1; y >= 0; y--) {
    if (tetris[y][0] === 'black')
      nbLine++
    else
      break
  }
  const data = []
  let firstY
  for (let x = 0; x < 10; x++) {
    firstY = -1
    for (let y = 0; y < tetris.length; y++) {
      if (tetris[y][x] !== '') {
        firstY = y
        break
      }
    }
    data.push(firstY)
  }
  return {
    nbLine,
    data,
    length: tetris.length,
  }
}

export const updateTetris = (lines=0, newPiece=false) => (dispatch, getState) => {
  const ghost = getGhostData(getState().tetris)
  dispatch({
    type: 'server/UPDATE_TETRIS',
    ghost,
    lines,
    newPiece,
  })
}

export const gameOver = () => {
  return {
    type: 'server/GAME_OVER',
  }
}
