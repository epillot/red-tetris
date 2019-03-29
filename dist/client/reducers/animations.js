'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = animations;
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

function animations() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];


  switch (action.type) {

    case 'ANIMATION_STEP':
      return action.getStyle;

    case 'REMOVE_LINES':
      return [];

    default:
      return state;

  }
}