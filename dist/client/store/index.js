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

var _storeStateMiddleWare = require('../middleware/storeStateMiddleWare');

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _params = require('../../../params');

var _params2 = _interopRequireDefault(_params);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var newTetris = function newTetris() {
  var tetris = [];
  for (var i = 0; i < 10; i++) {
    tetris.push([]);
    for (var j = 0; j < 20; j++) {
      tetris[i][j] = '';
    }
  }
  return tetris;
};

var initialState = {
  tetris: newTetris(),
  coords: null,
  color: null,
  rotate: 0,
  type: null,
  Isplaying: false,
  animation: false,
  hash: window.location.hash,
  room: null,
  nickname: '',
  nicknameError: ''
};

var socketIoMiddleWare = function socketIoMiddleWare(socket) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;

    if (socket) socket.on('action', dispatch);
    return function (next) {
      return function (action) {
        if (socket && action.type && action.type.indexOf('server/') === 0) socket.emit('action', action);
        if (action.hash) window.location.hash = action.hash;
        return next(action);
      };
    };
  };
};

var socket = (0, _socket2.default)(_params2.default.server.url);

var store = (0, _redux.createStore)(_reducers2.default, initialState, (0, _redux.applyMiddleware)(socketIoMiddleWare(socket), _reduxThunk2.default, (0, _reduxLogger2.default)()));

// const logger = store => {
//   return next => {
//     return action => {
//       console.log('dispatching', action)
//       let result = next(action)
//       console.log('next state', store.getState())
//       return result
//     }
//   }
// }
//
// const lol = store => next => action => {
//   console.log('lolilol ;P XD');
//   return next(action)
// }
//
// function myApplyMiddleware(store, middlewares) {
//   middlewares = middlewares.slice()
//   middlewares.reverse()
//   let dispatch = store.dispatch
//   middlewares.forEach(middleware =>
//     dispatch = middleware(store)(dispatch)
//   )
//   return Object.assign({}, store, { dispatch })
// }
//
// store = myApplyMiddleware(store, [lol, logger])

exports.default = store;