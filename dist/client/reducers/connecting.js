'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connecting;

var _tools = require('../tools');

var initialState = {
  roomLoading: false
};

function connecting() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];


  switch (action.type) {

    case 'server/CREATE_ROOM':
    case 'server/JOIN_ROOM':
      return (0, _tools.updateObject)(state, {
        roomLoading: true
      });

    case 'USER_CONNECTED':
      return (0, _tools.updateObject)(state, {
        playerID: action.id
      });

    case 'UPDATE_ROOM':
    case 'JOIN_ROOM_ERROR':
      return (0, _tools.updateObject)(state, {
        roomLoading: false
      });

    default:
      return state;

  }
}