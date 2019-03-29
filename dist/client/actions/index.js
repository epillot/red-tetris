'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pause = exports.tryNewPiece = exports.keyEvents = exports.gravity = exports.piece = exports.tetris = exports.ui = exports.server = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

var _tools = require('../tools');

var f = _interopRequireWildcard(_tools);

var _rotations = require('../tools/rotations');

var _rotations2 = _interopRequireDefault(_rotations);

var _animations = require('./animations');

var _ui = require('./ui');

var ui = _interopRequireWildcard(_ui);

var _piece = require('./piece');

var piece = _interopRequireWildcard(_piece);

var _tetris = require('./tetris');

var tetris = _interopRequireWildcard(_tetris);

var _server = require('./server');

var server = _interopRequireWildcard(_server);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.server = server;
exports.ui = ui;
exports.tetris = tetris;
exports.piece = piece;
var gravity = exports.gravity = function gravity() {
  return setInterval(function () {
    _store2.default.dispatch(function (dispatch, getState) {
      var newCoords = getState().piece.coords.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            x = _ref2[0],
            y = _ref2[1];

        return [x, y + 1];
      });
      if (f.isPossible(getState().tetris, newCoords)) {
        dispatch(piece.movePiece(newCoords));
      } else {
        clearInterval(getState().piece.interval);
        removeEventListener('keydown', keyEvents);
        dispatch(nextTurn());
      }
    });
  }, 700);
};

var keyEvents = exports.keyEvents = function keyEvents(_ref3) {
  var keyCode = _ref3.keyCode;
  return _store2.default.dispatch(keyEvent(keyCode));
};

var keyEvent = function keyEvent(keyCode) {
  return function (dispatch, getState) {
    //const { tetris, piece: { coords, rotate, type, interval } } = getState()
    if (keyCode === 37 || keyCode === 39 || keyCode === 40) {
      var i = keyCode === 37 ? -1 : keyCode === 39 ? 1 : 0;
      var j = keyCode === 40 ? 1 : 0;
      var newCoords = getState().piece.coords.map(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            x = _ref5[0],
            y = _ref5[1];

        return [x + i, y + j];
      });
      if (f.isPossible(getState().tetris, newCoords)) {
        dispatch(piece.movePiece(newCoords));
      }
    } else if (keyCode === 38) {
      var change = _rotations2.default[getState().piece.type][getState().piece.rotate];
      var _newCoords = getState().piece.coords.map(function (_ref6, i) {
        var _ref7 = _slicedToArray(_ref6, 2),
            x = _ref7[0],
            y = _ref7[1];

        return [x + change[i][0], y + change[i][1]];
      });
      if (f.isPossible(getState().tetris, _newCoords) || (_newCoords = f.tryTranslation(getState().tetris, _newCoords))) {
        dispatch(piece.movePiece(_newCoords, (getState().piece.rotate + 1) % _rotations2.default[getState().piece.type].length));
      }
    } else if (keyCode === 32) {
      clearInterval(getState().piece.interval);
      removeEventListener('keydown', keyEvents);
      dispatch((0, _animations.spaceAnimation)()).then(function () {
        dispatch(piece.movePiece(f.getPieceProjection(getState().tetris, getState().piece)));
        dispatch(nextTurn());
      });
    }
  };
};

var nextTurn = function nextTurn() {
  return function (dispatch, getState) {
    dispatch((0, _animations.pieceAnimation)()).then(function () {
      dispatch(tetris.putPiece(getState().piece));
      var lines = f.getCompleteLines(getState().tetris).length;
      dispatch((0, _animations.disparitionLinesAnimation)(lines)).then(function () {
        dispatch(tetris.removeLines());
        dispatch(server.updateTetris(lines - 1, true));
      });
    });
  };
};

var tryNewPiece = exports.tryNewPiece = function tryNewPiece(action) {
  return function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
      var len;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!action.first) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return dispatch(startGame());

            case 3:
              len = getState().tetris.length - 20;

              action.piece.coords = action.piece.coords.map(function (_ref9) {
                var _ref10 = _slicedToArray(_ref9, 2),
                    x = _ref10[0],
                    y = _ref10[1];

                return [x, y + len];
              });
              // console.log(action.piece.coords);
              if (f.isPossible(getState().tetris, action.piece.coords)) {
                dispatch(action);
                addEventListener('keydown', keyEvents);
                dispatch({ type: 'GRAVITY', interval: gravity() });
              } else {
                dispatch(server.gameOver());
              }

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref8.apply(this, arguments);
    };
  }();
};

var startGame = function startGame() {
  return function (dispatch, getState) {
    dispatch(beginGame());
    var timer = 3;
    dispatch(updateTimer(timer));
    return new Promise(function (resolve) {
      var interval = setInterval(function () {
        timer--;
        if (timer > 0) {
          dispatch(updateTimer(timer));
        } else {
          clearInterval(interval);
          resolve();
        }
      }, 1000);
    });
  };
};

var updateTimer = function updateTimer(timer) {
  return {
    type: 'UPDATE_TIMER',
    timer: timer
  };
};

var beginGame = function beginGame() {
  return {
    type: 'BEGIN_GAME'
  };
};

var pause = exports.pause = function pause() {
  return function (dispatch, getState) {
    var piece = getState().piece;
    if (piece && piece.interval) {
      clearInterval(piece.interval);
      removeEventListener('keydown', keyEvents);
      dispatch({ type: 'GRAVITY', interval: null });
    } else if (piece) {
      dispatch({ type: 'GRAVITY', interval: gravity() });
      addEventListener('keydown', keyEvents);
    }
  };
};