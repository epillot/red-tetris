// export default function animations(state=false, action) {
//
//   switch (action.type) {
//
//     case 'ANIMATION_STEP':
//       return action.getStyle
//
//     case 'server/UPDATE_TETRIS':
//     case 'UPDATE_TETRIS':
//       return false
//
//     default:
//       return state
//
//   }
//
// }

export default function animations(state=[], action) {

  switch (action.type) {

    case 'ANIMATION_STEP':
      return action.getStyle

    case 'server/UPDATE_TETRIS':
    case 'UPDATE_TETRIS':
    case 'END_ANIMATION':
      return []

    default:
      return state

  }

}
