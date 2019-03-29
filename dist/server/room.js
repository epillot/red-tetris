'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tetris = require('./tetris');

var _tetris2 = _interopRequireDefault(_tetris);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Room = function () {
  function Room(id) {
    _classCallCheck(this, Room);

    this.id = id;
    this.users = [];
    this.pieces = [];
    this.isPlaying = false;
  }

  _createClass(Room, [{
    key: 'getData',
    value: function getData() {
      return {
        id: this.id,
        users: this.users.map(function (user) {
          return user.getData();
        }),
        isPlaying: this.isPlaying
      };
    }
  }, {
    key: 'addUser',
    value: function addUser(user) {
      if (this.users.length >= 5) return false;
      this.users.push(user);
      user.joinRoom(this.id);
      return true;
    }
  }, {
    key: 'removeUser',
    value: function removeUser(user) {
      user.leaveRoom(this.id);
      this.users = this.users.filter(function (u) {
        return u !== user;
      });
      if (!this.users.length) this.isPlaying = false;
    }
  }, {
    key: 'getHash',
    value: function getHash(user) {
      return {
        to: user.id,
        hash: this.id + '[' + user.name + ']'
      };
    }
  }, {
    key: 'initGame',
    value: function initGame() {
      this.pieces = [];
      for (var i = 0; i < 3; i++) {
        this.pieces.push(_tetris2.default.newTetriminos());
      }
      this.users.forEach(function (user) {
        return user.initGame();
      });
      this.isPlaying = true;
    }
  }, {
    key: 'getNextPiece',
    value: function getNextPiece(i) {
      var piece = this.pieces[i];
      this.pieces.push(_tetris2.default.newTetriminos());
      return piece;
    }
  }, {
    key: 'checkWinner',
    value: function checkWinner() {
      var usersLeft = this.users.filter(function (user) {
        return user.isPlaying && user.gameOver !== true;
      });
      if (usersLeft.length <= 1) {
        if (usersLeft.length == 1) usersLeft[0].win = true;
        this.isPlaying = false;
      }
    }
  }]);

  return Room;
}();

exports.default = Room;