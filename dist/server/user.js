'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
  function User(socket) {
    _classCallCheck(this, User);

    this.socket = socket;
    this.id = socket.id;
    this.room = false;
    this.isPlaying = false;
    //this.tetris = null
  }

  _createClass(User, [{
    key: 'joinRoom',
    value: function joinRoom(roomId) {
      this.socket.join(roomId);
      this.room = roomId;
    }
  }, {
    key: 'leaveRoom',
    value: function leaveRoom(roomId) {
      this.socket.leave(roomId);
      this.room = false;
    }
  }, {
    key: 'sendAction',
    value: function sendAction(action) {
      this.socket.emit('action', action);
    }
  }, {
    key: 'sendActionToRoom',
    value: function sendActionToRoom(roomId, action) {
      this.socket.to(roomId).emit('action', action);
    }
  }, {
    key: 'initGame',
    value: function initGame() {
      this.indexPiece = 0;
      this.isPlaying = true;
      this.gameOver = false;
      this.win = false;
      this.tetris = undefined;
    }
  }, {
    key: 'getData',
    value: function getData() {
      return {
        name: this.name,
        id: this.id,
        ghost: this.ghost,
        isPlaying: this.isPlaying,
        gameOver: this.gameOver,
        win: this.win
      };
    }
  }]);

  return User;
}();

exports.default = User;