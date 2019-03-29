'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = room;

var _tools = require('../tools');

function room() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments[1];


  switch (action.type) {

    case 'UPDATE_ROOM':
      return {
        id: action.room.id,
        isPlaying: action.room.isPlaying
      };

    case 'JOIN_ROOM_ERROR':
      return null;

    default:
      return state;

  }
}