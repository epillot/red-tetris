'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _room = require('./room');

var _room2 = _interopRequireDefault(_room);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.rooms = [];
  }

  _createClass(Game, [{
    key: 'createRoom',
    value: function createRoom(socketId) {
      var room = new _room2.default(this.newRoomId(), socketId);
      this.rooms.push(room);
      return room.id;
    }
  }, {
    key: 'newRoomId',
    value: function newRoomId() {
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var id = "";
      while (true) {
        for (var i = 0; i < 5; i++) {
          id += possible.charAt(Math.floor(Math.random() * possible.length));
        }if (this.rooms.map(function (room) {
          return room.id;
        }).indexOf(id) !== -1) {
          id = "";
          continue;
        }
        return id;
      }
    }
  }]);

  return Game;
}();

exports.default = new Game();