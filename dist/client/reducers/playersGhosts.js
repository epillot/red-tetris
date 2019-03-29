'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = playersGhosts;

var _tools = require('../tools');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getPlayersGhosts = function getPlayersGhosts(state, _ref) {
  var room = _ref.room;

  var output = Object.assign({}, state);
  var users = room.users;

  Object.keys(output).forEach(function (id) {
    if (!users.find(function (user) {
      return user.id === id;
    })) delete output[id];
  });

  users.forEach(function (user) {
    if (!output[user.id]) output[user.id] = user.ghost;
  });
  return output;
};

var initGhosts = function initGhosts(state) {
  var output = Object.assign({}, state);
  Object.keys(output).forEach(function (id) {
    output[id] = undefined;
  });
  return output;
};

function playersGhosts() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];


  switch (action.type) {

    case 'UPDATE_ROOM':
      return getPlayersGhosts(state, action);

    case 'UPDATE_GHOST':
      return (0, _tools.updateObject)(state, _defineProperty({}, action.id, action.ghost));

    case 'BEGIN_GAME':
      return initGhosts(state);

    default:
      return state;

  }
}