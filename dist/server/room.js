"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Room = function Room(id, master) {
  _classCallCheck(this, Room);

  this.id = id;
  this.master = master;
  this.users = [master];
};

exports.default = Room;