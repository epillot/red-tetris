'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = piece;

var _tools = require('../tools');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var movePiece = function movePiece(state, _ref) {
  var coords = _ref.coords,
      rotate = _ref.rotate;

  var update = { coords: coords };
  if (rotate !== null) update.rotate = rotate;
  return (0, _tools.updateObject)(state, update);
};

var blackLines = function blackLines(state, _ref2) {
  var nbLines = _ref2.nbLines,
      tetris = _ref2.tetris;

  var startY = tetris.length - 20;
  var maxY = Math.max.apply(Math, _toConsumableArray(state.coords.map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        x = _ref4[0],
        y = _ref4[1];

    return y;
  })));
  var yi = void 0;
  if (maxY > startY) {
    yi = nbLines;
    while (maxY - yi < startY - 1) {
      yi--;
    }
  } else {
    yi = maxY - startY;
  }
  return (0, _tools.updateObject)(state, { coords: state.coords.map(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          x = _ref6[0],
          y = _ref6[1];

      return [x, y - yi];
    }) });
};

function piece() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments[1];


  switch (action.type) {

    case 'NEW_PIECE':
      return action.piece;

    case 'MOVE_PIECE':
      return movePiece(state, action);

    case 'GRAVITY':
      return (0, _tools.updateObject)(state, { interval: action.interval });

    case 'PUT_PIECE':
      return null;

    case 'BLACK_LINES':
      return state && blackLines(state, action);

    default:
      return state;

  }
}