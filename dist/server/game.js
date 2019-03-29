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
    value: function createRoom(user) {
      var room = new _room2.default(this.newRoomId());
      room.addUser(user);
      this.rooms.push(room);
      console.log(this.rooms);
      return room;
    }
  }, {
    key: 'deleteRoom',
    value: function deleteRoom(room) {
      this.rooms = this.rooms.filter(function (r) {
        return r !== room;
      });
    }
  }, {
    key: 'getRoomById',
    value: function getRoomById(id) {
      return this.rooms.find(function (room) {
        return room.id === id;
      });
    }
  }, {
    key: 'getRoomByMaster',
    value: function getRoomByMaster(user) {
      return this.rooms.find(function (room) {
        return room.users[0] === user;
      });
    }
  }, {
    key: 'newRoomId',
    value: function newRoomId() {
      var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
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
  }, {
    key: 'addUserToRoom',
    value: function addUserToRoom(roomId, user) {
      var room = this.getRoomById(roomId);
      if (room) {
        if (room.addUser(user)) return room;
        this.currentError = 'This room is full';
        return null;
      }
      this.currentError = 'This room doesn\'t exist';
      return null;
    }
  }, {
    key: 'removeUserFromRoom',
    value: function removeUserFromRoom(roomId, user) {
      var _this = this;

      var room = this.getRoomById(roomId);
      if (room) {
        room.removeUser(user);
        setTimeout(function () {
          if (!room.users.length) {
            console.log('deleting room: ' + room.id);
            _this.deleteRoom(room);
          }
        }, 60000);
      }
      return this.getRoomById(roomId);
    }
  }]);

  return Game;
}();

exports.default = new Game();