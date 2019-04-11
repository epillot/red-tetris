import { newTetris, addBlackLines, putPiece, removeLines } from '../tools/reducers'

// const newTetris = () => {
//   const tetris = []
//   for (let i = 0; i < 20; i++) {
//     tetris.push([])
//     for (let j = 0; j < 10; j++) {
//       tetris[i][j] = ''
//     }
//   }
//   return tetris;
// }
//
// const getBlackLine = () => ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black']
//
// const getEmptyLine = () => ['', '', '', '', '', '', '', '', '', '']
//
// const addBlackLines = (state, action) => {
//   const output = state.slice()
//   for (let i = 0; i < action.nbLines; i++) {
//     output.push(getBlackLine())
//     if (isEmpty(output[0]))
//       output.shift()
//   }
//   return output
// }
//
// const putPiece = (state, action) => {
//   const output = state.slice()
//   const { coords, color } = action.piece
//   const ymin = Math.min(...coords.map(([x, y]) => y))
//   for (let i = 0; i > ymin; i--) {
//     output.unshift(getEmptyLine())
//   }
//   const newCoords = ymin < 0 ? coords.map(([x, y]) => [x, y - ymin]) : coords
//   newCoords.forEach(([x, y]) => {
//     output[y][x] = color
//   })
//   return output
// }
//
//
// const removeLines = state => {
//   const output = state.slice()
//   let count = 0;
//   for (let y = output.length - 1; y >= 0; y--) {
//     if (isComplete(output[y])) {
//       count++
//       output.splice(y, 1)
//     }
//   }
//   while (count > 0 && output.length < 20)
//     output.unshift(getEmptyLine())
//   return output
// }


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
