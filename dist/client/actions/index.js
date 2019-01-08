'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nicknamError = exports.movePiece = exports.newPiece = exports.editName = exports.server = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _actionTypes = require('../constants/actionTypes');

var types = _interopRequireWildcard(_actionTypes);

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

var _tools = require('../tools');

var f = _interopRequireWildcard(_tools);

var _rotations = require('../tools/rotations');

var _rotations2 = _interopRequireDefault(_rotations);

var _animations = require('./animations');

var _server = require('./server');

var server = _interopRequireWildcard(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.server = server;


var gravity = function gravity() {
  return setInterval(function () {
    _store2.default.dispatch(function (dispatch, getState) {
      var _getState = getState(),
          tetris = _getState.tetris,
          coords = _getState.coords,
          interval = _getState.interval;

      var newCoords = coords.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            x = _ref2[0],
            y = _ref2[1];

        return [x, y + 1];
      });
      if (f.isPossible(tetris, newCoords)) {
        dispatch(movePiece(newCoords));
      } else {
        clearInterval(interval);
        removeEventListener('keydown', keyEvents);
        dispatch(nextTurn(coords));
      }
    });
  }, 700);
};

var keyEvents = function keyEvents(_ref3) {
  var keyCode = _ref3.keyCode;
  return _store2.default.dispatch(keyEvent(keyCode));
};

var keyEvent = function keyEvent(keyCode) {
  return function (dispatch, getState) {
    var _getState2 = getState(),
        tetris = _getState2.tetris,
        coords = _getState2.coords,
        rotate = _getState2.rotate,
        type = _getState2.type,
        interval = _getState2.interval;

    if (keyCode === 37 || keyCode === 39 || keyCode === 40) {
      var i = keyCode === 37 ? -1 : keyCode === 39 ? 1 : 0;
      var j = keyCode === 40 ? 1 : 0;
      var newCoords = coords.map(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            x = _ref5[0],
            y = _ref5[1];

        return [x + i, y + j];
      });
      if (f.isPossible(tetris, newCoords)) {
        dispatch(movePiece(newCoords));
      }
    } else if (keyCode === 38) {
      var change = _rotations2.default[type][rotate];
      var _newCoords = coords.map(function (_ref6, i) {
        var _ref7 = _slicedToArray(_ref6, 2),
            x = _ref7[0],
            y = _ref7[1];

        return [x + change[i][0], y + change[i][1]];
      });
      if (f.isPossible(tetris, _newCoords) || (_newCoords = f.tryTranslation(tetris, _newCoords))) {
        dispatch(movePiece(_newCoords, (rotate + 1) % _rotations2.default[type].length));
      }
    } else if (keyCode === 32) {
      clearInterval(interval);
      removeEventListener('keydown', keyEvents);
      var proj = f.getPieceProjection(tetris, coords);
      dispatch((0, _animations.spaceAnimation)(coords, proj)).then(function () {
        dispatch(nextTurn(proj));
      });
    }
  };
};

var nextTurn = function nextTurn(coords) {
  return function (dispatch, getState) {
    var _getState3 = getState(),
        tetris = _getState3.tetris,
        color = _getState3.color;

    var newTetris = f.copyTetris(tetris);
    coords.forEach(function (_ref8) {
      var _ref9 = _slicedToArray(_ref8, 2),
          x = _ref9[0],
          y = _ref9[1];

      if (y >= 0) newTetris[x][y] = color;
    });
    var lines = f.getCompleteLines(newTetris);
    dispatch((0, _animations.pieceAnimation)(coords)).then(function () {
      dispatch((0, _animations.lineAnimation)(lines)).then(function () {
        dispatch(updateTetris(f.removeLinesFirst(newTetris, lines)));
        dispatch((0, _animations.translateAnimation)(newTetris, lines)).then(function () {
          dispatch(updateTetris(f.removeLines(newTetris, lines)));
          var piece = f.newTetriminos();
          if (f.isPossible(newTetris, piece.coords)) dispatch(newPiece(piece));
        });
      });
    });
  };
};

var editName = exports.editName = function editName(value) {
  return {
    type: types.EDIT_NAME,
    value: value
  };
};

var newPiece = exports.newPiece = function newPiece() {
  var piece = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  addEventListener('keydown', keyEvents);
  return {
    type: types.NEW_PIECE,
    piece: piece || f.newTetriminos(),
    interval: gravity()
  };
};

var movePiece = exports.movePiece = function movePiece(coords) {
  var rotate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  return {
    type: types.MOVE_PIECE,
    coords: coords,
    rotate: rotate
  };
};

var putPiece = function putPiece(coords) {
  return {
    type: types.PUT_PIECE,
    coords: coords
  };
};

var updateTetris = function updateTetris(tetris) {
  return {
    type: types.UPDATE_TETRIS,
    tetris: tetris
  };
};

var nicknamError = exports.nicknamError = function nicknamError() {
  return {
    type: 'NICKNAME_ERROR'
  };
};