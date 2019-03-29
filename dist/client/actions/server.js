'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var startGame = exports.startGame = function startGame() {
  return {
    type: 'server/START_GAME'
  };
};

var createRoom = exports.createRoom = function createRoom(nickname) {
  return {
    type: 'server/CREATE_ROOM',
    nickname: nickname
  };
};

var joinRoom = exports.joinRoom = function joinRoom(id, nickname) {
  return {
    type: 'server/JOIN_ROOM',
    id: id,
    nickname: nickname
  };
};

// export const updateTetris = (tetris, lines) => {
//
//   return {
//     type: 'server/UPDATE_TETRIS',
//     tetris,
//     lines,
//   }
// }

var getGhostData = function getGhostData(tetris) {
  var nbLine = 0;
  for (var y = tetris.length - 1; y >= 0; y--) {
    if (tetris[y][0] === 'black') nbLine++;else break;
  }
  var data = [];
  var firstY = void 0;
  for (var x = 0; x < 10; x++) {
    firstY = -1;
    for (var _y = 0; _y < tetris.length; _y++) {
      if (tetris[_y][x] !== '') {
        firstY = _y;
        break;
      }
    }
    data.push(firstY);
  }
  return {
    nbLine: nbLine,
    data: data,
    length: tetris.length
  };
};

var updateTetris = exports.updateTetris = function updateTetris() {
  var lines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var newPiece = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function (dispatch, getState) {
    var ghost = getGhostData(getState().tetris);
    dispatch({
      type: 'server/UPDATE_TETRIS',
      ghost: ghost,
      lines: lines,
      newPiece: newPiece
    });
  };
};

var gameOver = exports.gameOver = function gameOver() {
  return {
    type: 'server/GAME_OVER'
  };
};