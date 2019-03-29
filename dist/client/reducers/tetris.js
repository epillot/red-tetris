'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = tetris;

var _tools = require('../tools');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var newTetris = function newTetris() {
  var tetris = [];
  for (var i = 0; i < 20; i++) {
    tetris.push([]);
    for (var j = 0; j < 10; j++) {
      tetris[i][j] = '';
    }
  }
  return tetris;
};

var getBlackLine = function getBlackLine() {
  return ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black'];
};

var getEmptyLine = function getEmptyLine() {
  return ['', '', '', '', '', '', '', '', '', ''];
};

var addBlackLines = function addBlackLines(state, action) {
  var output = state.slice();
  for (var i = 0; i < action.nbLines; i++) {
    output.push(getBlackLine());
    if ((0, _tools.isEmpty)(output[0])) output.shift();
  }
  return output;
};

var putPiece = function putPiece(state, action) {
  var output = state.slice();
  var _action$piece = action.piece,
      coords = _action$piece.coords,
      color = _action$piece.color;

  var ymin = Math.min.apply(Math, _toConsumableArray(coords.map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        x = _ref2[0],
        y = _ref2[1];

    return y;
  })));
  for (var i = 0; i > ymin; i--) {
    output.unshift(getEmptyLine());
  }
  var newCoords = ymin < 0 ? coords.map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        x = _ref4[0],
        y = _ref4[1];

    return [x, y - ymin];
  }) : coords;
  newCoords.forEach(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        x = _ref6[0],
        y = _ref6[1];

    output[y][x] = color;
  });
  return output;
};

var removeLines = function removeLines(state) {
  var output = state.slice();
  var count = 0;
  for (var y = output.length - 1; y >= 0; y--) {
    if ((0, _tools.isComplete)(output[y])) {
      count++;
      output.splice(y, 1);
    }
  }
  while (count > 0 && output.length < 20) {
    output.unshift(getEmptyLine());
  }return output;
};

function tetris() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments[1];


  switch (action.type) {

    case 'BEGIN_GAME':
      return newTetris();

    case 'PUT_PIECE':
      return putPiece(state, action);

    case 'REMOVE_LINES':
      return removeLines(state);

    case 'BLACK_LINES':
      return addBlackLines(state, action);

    default:
      return state;

  }
}