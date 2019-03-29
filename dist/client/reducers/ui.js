'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ui;

var _tools = require('../tools');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  nickname: '',
  nicknameError: '',
  roomError: '',
  partyCode: ''
};

function ui() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];


  switch (action.type) {

    case 'EDIT_NAME':
      return (0, _tools.updateObject)(state, { nickname: action.value.trim().substr(0, 15).trim() });

    case 'EDIT_CODE':
      return (0, _tools.updateObject)(state, { partyCode: action.value.trim().substr(0, 5).trim() });

    case 'NICKNAME_ERROR':
      return (0, _tools.updateObject)(state, {
        nicknameError: 'Please enter a nickname'
      });

    case 'JOIN_ROOM_ERROR':
      return (0, _tools.updateObject)(state, {
        roomError: action.error
      });

    case 'REMOVE_ERROR':
      return (0, _tools.updateObject)(state, _defineProperty({}, action.name, ''));

    default:
      return state;

  }
}