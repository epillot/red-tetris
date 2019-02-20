export default function tetris(state=null, action) {

  switch (action.type) {

    case 'server/UPDATE_TETRIS':
    case 'UPDATE_TETRIS':
      return action.tetris

    default:
      return state

  }

}
