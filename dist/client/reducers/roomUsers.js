'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = roomUsers;

var _tools = require('../tools');

function roomUsers() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];


  switch (action.type) {

    case 'UPDATE_ROOM':
      return action.room.users;

    default:
      return state;

  }
}