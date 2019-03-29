'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _actionTypes = require('../constants/actionTypes');

var types = _interopRequireWildcard(_actionTypes);

var _tools = require('../tools');

var f = _interopRequireWildcard(_tools);

var _animations = require('./animations');

var _animations2 = _interopRequireDefault(_animations);

var _connecting = require('./connecting');

var _connecting2 = _interopRequireDefault(_connecting);

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

var _piece = require('./piece');

var _piece2 = _interopRequireDefault(_piece);

var _playersGhosts = require('./playersGhosts');

var _playersGhosts2 = _interopRequireDefault(_playersGhosts);

var _room = require('./room');

var _room2 = _interopRequireDefault(_room);

var _roomUsers = require('./roomUsers');

var _roomUsers2 = _interopRequireDefault(_roomUsers);

var _tetris = require('./tetris');

var _tetris2 = _interopRequireDefault(_tetris);

var _ui = require('./ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = (0, _redux.combineReducers)({
  getStyle: _animations2.default,
  connecting: _connecting2.default,
  game: _game2.default,
  piece: _piece2.default,
  playersGhosts: _playersGhosts2.default,
  room: _room2.default,
  roomUsers: _roomUsers2.default,
  tetris: _tetris2.default,
  ui: _ui2.default
});