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
    var _this = this;

    _classCallCheck(this, Engine);

    this.io = (0, _socket2.default)(app);

    this.io.on('connection', function (socket) {

      console.log('Socket connected: ' + socket.id);
      var user = new _user2.default(socket);

      var _socket$handshake$que = socket.handshake.query,
          roomId = _socket$handshake$que.roomId,
          name = _socket$handshake$que.name;

      if (roomId && name) {
        user.name = name;
        _this.addUserToRoom(roomId, user);
      }

      user.sendAction({
        type: 'USER_CONNECTED',
        id: user.id
      });

      socket.on('disconnect', function () {
        _this.disconnectUser(user);
      });

      socket.on('action', function (action) {

        if (action.nickname) user.name = action.nickname;

        //console.log(action)
        if (action.type === 'server/ping') socket.emit('action', { type: 'pong' });else if (action.type === 'server/CREATE_ROOM') {
          var room = _game2.default.createRoom(user);
          //console.log(Game.rooms[0].master.name)
          user.sendAction({
            type: 'UPDATE_ROOM',
            room: room.getData(),
            hash: room.getHash(user)
          });
        } else if (action.type === 'server/JOIN_ROOM') {
          _this.addUserToRoom(action.id, user);
        } else if (action.type === 'server/START_GAME') {
          var _room = _game2.default.getRoomByMaster(user);
          if (_room && !_room.isPlaying) {
            _room.initGame();
            _this.sendActionToRoom(_room.id, {
              type: 'NEW_PIECE',
              piece: _room.getNextPiece(0),
              first: true,
              room: _room.getData()
            });
          }
        } else if (action.type === 'server/UPDATE_TETRIS') {

          var _room2 = _game2.default.getRoomById(user.room);
          if (_room2) {
            user.ghost = action.ghost;
            user.sendActionToRoom(_room2.id, {
              type: 'UPDATE_GHOST',
              id: user.id,
              ghost: user.ghost,
              lines: action.lines
            });

            if (action.newPiece) {
              user.indexPiece++;
              user.sendAction({
                type: 'NEW_PIECE',
                piece: _room2.getNextPiece(user.indexPiece)
              });
            }
          }
        } else if (action.type === 'server/GAME_OVER') {

          var _room3 = _game2.default.getRoomById(user.room);
          if (_room3) {
            user.gameOver = true;
            _room3.checkWinner();
            _this.sendActionToRoom(_room3.id, {
              type: 'UPDATE_ROOM',
              room: _room3.getData()
            });
          }
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
  }, {
    key: 'disconnectUser',
    value: function disconnectUser(user) {
      if (user.room) {
        var room = _game2.default.removeUserFromRoom(user.room, user);
        if (room) {
          this.sendActionToRoom(room.id, {
            type: 'UPDATE_ROOM',
            room: room.getData()
          });
        }
      }
    }
  }, {
    key: 'addUserToRoom',
    value: function addUserToRoom(roomId, user) {
      var room = _game2.default.addUserToRoom(roomId, user);
      if (room) {
        this.sendActionToRoom(room.id, {
          type: 'UPDATE_ROOM',
          room: room.getData(),
          hash: room.getHash(user)
        });
      } else {
        user.sendAction({
          type: 'JOIN_ROOM_ERROR',
          error: _game2.default.currentError,
          hash: {
            to: user.id,
            hash: ''
          }
        });
      }
    }
  }, {
    key: 'sendActionToRoom',
    value: function sendActionToRoom(roomId, action) {
      this.io.to(roomId).emit('action', action);
    }
  }]);

  return Engine;
}();

exports.default = Engine;