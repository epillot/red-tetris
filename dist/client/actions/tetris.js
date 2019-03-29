'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var putPiece = exports.putPiece = function putPiece(piece) {
  return {
    type: 'PUT_PIECE',
    piece: piece
  };
};

var blackLines = exports.blackLines = function blackLines(nbLines) {
  return function (dispatch, getState) {
    return dispatch({
      type: 'BLACK_LINES',
      nbLines: nbLines,
      tetris: getState().tetris
    });
  };
};

var removeLines = exports.removeLines = function removeLines() {
  return {
    type: 'REMOVE_LINES'
  };
};