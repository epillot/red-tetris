'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

var _params = require('../../../params');

var _params2 = _interopRequireDefault(_params);

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _socketIoMiddleWare = require('../middleware/socketIoMiddleWare');

var _animationMiddleWare = require('../middleware/animationMiddleWare');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { storeStateMiddleWare } from '../middleware/storeStateMiddleWare'
var parseHash = function parseHash(hash) {
  if (hash[6] !== '[' || hash[hash.length - 1] !== ']' || hash.length - 8 > 15) return null;
  var roomId = hash.substr(1, 5);
  var name = hash.substr(7, hash.length - 8);
  return { roomId: roomId, name: name };
};

var query = Object.assign({}, parseHash(window.location.hash));
var socket = (0, _socket2.default)(_params2.default.server.url, { query: query });

var store = (0, _redux.createStore)(_reducers2.default, {}, (0, _redux.applyMiddleware)((0, _socketIoMiddleWare.socketIoMiddleWare)(socket), _reduxThunk2.default, _animationMiddleWare.animationMiddleWare, (0, _reduxLogger2.default)({
  predicate: function predicate(_, action) {
    switch (action.type) {
      //case 'REMOVE_LINES':
      //case 'PUT_PIECE':
      case 'BLACK_LINES':
      case 'UPDATE_GHOST':
        //case 'MOVE_PIECE':
        return true;
      default:
        return false;
    }
  }
})));

exports.default = store;