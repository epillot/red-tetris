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

export default function tetris(state=null, action) {

  switch (action.type) {

    case 'NEW_PIECE':
      return action.first ? newTetris() : state

    case 'server/UPDATE_TETRIS':
    case 'UPDATE_TETRIS':
      return action.tetris

    default:
      return state

  }

}
