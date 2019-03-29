'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socketIoMiddleWare = undefined;

var _actions = require('../actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var socketIoMiddleWare = exports.socketIoMiddleWare = function socketIoMiddleWare(socket) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;


    addEventListener('keydown', function (_ref2) {
      var keyCode = _ref2.keyCode;

      if (keyCode === 27 && getState().tetris) dispatch(actions.tetris.blackLines(2));
    });

    if (socket) {
      socket.on('action', function (action) {
        if (action.hash && action.hash.to === socket.id) window.location.hash = action.hash.hash;
        if (action.type === 'NEW_PIECE') {
          if (action.room) dispatch({ type: 'UPDATE_ROOM', room: action.room });
          dispatch(actions.tryNewPiece(action));
        } else if (action.type === 'UPDATE_GHOST') {
          dispatch(action);
          if (action.lines > 0 && getState().roomUsers.find(function (user) {
            return user.id === socket.id && user.isPlaying;
          })) {
            dispatch(actions.tetris.blackLines(action.lines));
            dispatch(actions.server.updateTetris());
          }
        } else if (action.type === 'UPDATE_ROOM') {
          dispatch(action);
          var winner = action.room.users.find(function (user) {
            return user.win === true;
          });
          if (winner && winner.id === socket.id) {
            var piece = getState().piece;
            if (piece) {
              clearInterval(piece.interval);
              removeEventListener('keydown', actions.keyEvents);
            }
          }
        } else dispatch(action);
      });
    }
    return function (next) {
      return function (action) {
        if (socket && action.type && action.type.indexOf('server/') === 0) socket.emit('action', action);
        return next(action);
      };
    };
  };
};