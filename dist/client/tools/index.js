'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var updateObject = exports.updateObject = function updateObject(obj, values) {
  return Object.assign({}, obj, values);
};

var getTetriminos = function getTetriminos(name) {
  //square
  if (name === 'square') return {
    coords: [[0, -1], [0, 0], [1, -1], [1, 0]],
    rotate: 0,
    color: 'red',
    type: 'square'
    //T
  };if (name === 'T') return {
    coords: [[0, -1], [0, 0], [-1, 0], [1, 0]],
    rotate: 0,
    color: 'blue',
    type: 'T'
    //L
  };if (name === 'L') return {
    coords: [[0, -2], [0, -1], [0, 0], [1, 0]],
    rotate: 0,
    color: 'yellow',
    type: 'L'
    //reverse L
  };if (name === 'revL') return {
    coords: [[0, 0], [0, -1], [0, -2], [1, -2]],
    rotate: 0,
    color: 'green',
    type: 'revL'
    //ligne
  };if (name === 'line') return {
    coords: [[0, -3], [0, -2], [0, -1], [0, 0]],
    rotate: 0,
    color: 'purple',
    type: 'line'
    //Z
  };if (name === 'Z') return {
    coords: [[1, -1], [0, -1], [0, 0], [-1, 0]],
    rotate: 0,
    color: 'pink',
    type: 'Z'
    //reverse Z
  };if (name === 'revZ') return {
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

var isPossible = exports.isPossible = function isPossible(tetris, coords) {
  if (!tetris) return true;
  var possible = true;
  for (var i = 0; i < 4; i++) {
    var _coords$i = _slicedToArray(coords[i], 2),
        x = _coords$i[0],
        y = _coords$i[1];

    if (x < 0 || x >= tetris[0].length || y >= tetris.length || y >= 0 && tetris[y][x] !== '') possible = false;
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

    newCoords = coords.map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          x = _ref2[0],
          y = _ref2[1];

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

var isEmpty = exports.isEmpty = function isEmpty(line) {
  for (var i = 0; i < line.length; i++) {
    if (line[i] !== '') return false;
  }
  return true;
};

var isComplete = exports.isComplete = function isComplete(line) {
  if (line[0] === 'black') return false;
  for (var i = 0; i < line.length; i++) {
    if (line[i] === '') return false;
  }
  return true;
};

var getCompleteLines = exports.getCompleteLines = function getCompleteLines(tetris) {
  var output = [];
  tetris.forEach(function (line, y) {
    if (isComplete(line)) output.push(y);
  });
  return output;
};

var getPieceProjection = exports.getPieceProjection = function getPieceProjection(tetris, piece) {
  if (!piece) return null;
  var newCoords = piece.coords.map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        x = _ref4[0],
        y = _ref4[1];

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