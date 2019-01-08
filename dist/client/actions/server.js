'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRoom = exports.startGame = exports.ping = undefined;

var _actionTypes = require('../constants/actionTypes');

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var ping = exports.ping = function ping() {
  return {
    type: 'server/ping'
  };
};

var startGame = exports.startGame = function startGame() {
  return {
    type: types.START_GAME
  };
};

var createRoom = exports.createRoom = function createRoom(nickname) {
  return {
    type: types.CREATE_ROOM,
    nickname: nickname
  };
};