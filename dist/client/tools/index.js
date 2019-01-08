'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var copyTetris = exports.copyTetris = function copyTetris(tetris) {
  return tetris.map(function (line) {
    return line.map(function (b) {
      return b;
    });
  });
};

var getTetriminos = function getTetriminos(name) {
  //square
  if (name === 'square') return {
    coords: [[0, -1], [0, 0], [1, -1], [1, 0]],
    rotate: 0,
    color: 'red',
    type: 'square'
  };
  //T
  if (name === 'T') return {
    coords: [[0, -1], [0, 0], [-1, 0], [1, 0]],
    rotate: 0,
    color: 'blue',
    type: 'T'
  };
  //L
  if (name === 'L') return {
    coords: [[0, -2], [0, -1], [0, 0], [1, 0]],
    rotate: 0,
    color: 'yellow',
    type: 'L'
  };
  //reverse L
  if (name === 'revL') return {
    coords: [[0, 0], [0, -1], [0, -2], [1, -2]],
    rotate: 0,
    color: 'green',
    type: 'revL'
  };
  //ligne
  if (name === 'line') return {
    coords: [[0, -3], [0, -2], [0, -1], [0, 0]],
    rotate: 0,
    color: 'purple',
    type: 'line'
  };
  //Z
  if (name === 'Z') return {
    coords: [[1, -1], [0, -1], [0, 0], [-1, 0]],
    rotate: 0,
    color: 'pink',
    type: 'Z'
  };
  //reverse Z
  if (name === 'revZ') return {
    coords: [[-1, -1], [0, -1], [0, 0], [1, 0]],
    rotate: 0,
    color: 'orange',
    type: 'revZ'
  };
};

var newTetriminos = exports.newTetriminos = function newTetriminos() {
  var items = ['line', 'L', 'revL', 'Z', 'revZ', 'T', 'square'];
  var name = items[Math.floor(Math.random() * items.length)];
  var t = getTetriminos(name);
  var startx = 4;
  for (var i = 0; i < 4; i++) {
    t.coords[i][0] += startx;
  }
  return t;
};

var putPiece = exports.putPiece = function putPiece(tetris, coords, color) {
  var newTetris = copyTetris(tetris);
  coords.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        x = _ref2[0],
        y = _ref2[1];

    if (y >= 0) newTetris[x][y] = color;
  });
  var lines = getCompleteLines(newTetris);
  if (lines) newTetris = removeLines(newTetris, lines);
  return newTetris;
};

//check si un nouveau block se retrouve a la même position qu'un ancien
var checkBlock = function checkBlock(tetris, prevCoords, newCoord) {
  var _newCoord = _slicedToArray(newCoord, 2),
      x = _newCoord[0],
      y = _newCoord[1];

  for (var i = 0; i < 4; i++) {
    var _prevCoords$i = _slicedToArray(prevCoords[i], 2),
        x2 = _prevCoords$i[0],
        y2 = _prevCoords$i[1];

    if (x === x2 && y === y2) return true;
  }
  return false;
};

var isPossible = exports.isPossible = function isPossible(tetris, coords) {
  var possible = true;
  for (var i = 0; i < 4; i++) {
    var _coords$i = _slicedToArray(coords[i], 2),
        x = _coords$i[0],
        y = _coords$i[1];

    if (x < 0 || x > 9 || y > 19 || y >= 0 && tetris[x][y] !== '') possible = false;
  }
  return possible;
};

var tryTranslation = exports.tryTranslation = function tryTranslation(tetris, coords) {
  var translations = [[1, 0], [-1, 0], [2, 0], [-2, 0], [0, 1], [0, 2]];
  var newCoords = void 0;

  var _loop = function _loop(i) {
    var _translations$i = _slicedToArray(translations[i], 2),
        x2 = _translations$i[0],
        y2 = _translations$i[1];

    newCoords = coords.map(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          x = _ref4[0],
          y = _ref4[1];

      return [x + x2, y + y2];
    });
    if (isPossible(tetris, newCoords)) return {
        v: newCoords
      };
  };

  for (var i = 0; i < translations.length; i++) {
    var _ret = _loop(i);

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }
  return null;
};

var getCompleteLines = exports.getCompleteLines = function getCompleteLines(tetris) {
  var output = [];
  var isComplete = void 0;
  for (var y = 19; y >= 0; y--) {
    isComplete = true;
    for (var x = 0; x < 10; x++) {
      if (tetris[x][y] === '') {
        isComplete = false;
        break;
      }
    }
    if (isComplete) output.push(y);
  }
  return output;
};

var getRevGrid = function getRevGrid(grid) {
  var output = [];
  for (var y = 0; y < grid[0].length; y++) {
    output[y] = [];
    for (var x = 0; x < grid.length; x++) {
      output[y][x] = grid[x][y];
    }
  }
  return output;
};

var removeLinesFirst = exports.removeLinesFirst = function removeLinesFirst(tetris, lines) {
  var output = copyTetris(tetris);
  for (var y = 0; y < 20; y++) {
    if (lines.indexOf(y) !== -1) {
      for (var x = 0; x < 10; x++) {
        output[x][y] = '';
      }
    }
  }
  return output;
};

var removeLines = exports.removeLines = function removeLines(tetris, lines) {
  if (!lines.length) return tetris;
  var newTetris = getRevGrid(tetris);
  lines.reverse().forEach(function (line) {
    newTetris.splice(line, 1);
    newTetris.unshift(['', '', '', '', '', '', '', '', '', '']);
  });
  return getRevGrid(newTetris);
};

var getPieceProjection = exports.getPieceProjection = function getPieceProjection(tetris, coords) {
  if (!coords) return null;
  var newCoords = coords.map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        x = _ref6[0],
        y = _ref6[1];

    return [x, y];
  });
  while (true) {
    if (!isPossible(tetris, newCoords)) break;
    newCoords.forEach(function (block) {
      return block[1]++;
    });
  }
  newCoords.forEach(function (block) {
    return block[1]--;
  });
  return newCoords;
};