'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var movePiece = exports.movePiece = function movePiece(coords) {
  var rotate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  return {
    type: 'MOVE_PIECE',
    coords: coords,
    rotate: rotate
  };
};