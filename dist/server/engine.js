'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Engine = function () {
  function Engine(app) {
    _classCallCheck(this, Engine);

    this.io = (0, _socket2.default)(app);

    this.io.on('connection', function (socket) {
      console.log('Socket connected: ' + socket.id);
      var user = new _user2.default(socket);
      socket.on('action', function (action) {
        //console.log(action)
        if (action.type === 'server/ping') socket.emit('action', { type: 'pong' });
        if (action.type === 'server/CREATE_ROOM') {
          var id = _game2.default.createRoom(user);
          user.name = action.nickname;
          //console.log(Game.rooms[0].master.name)
          user.sendAction({ type: 'ROOM_CREATED', id: id, hash: id + '[' + user.name + ']' });
        }
      });
    });
  }

  _createClass(Engine, [{
    key: 'stop',
    value: function stop() {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      this.io.close(cb);
    }
  }]);

  return Engine;
}();

exports.default = Engine;