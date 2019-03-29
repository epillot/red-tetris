'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = game;

var _tools = require('../tools');

var initialState = {
  timer: null
};

function game() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];


  switch (action.type) {

    case 'NEW_PIECE':
      return (0, _tools.updateObject)(state, {
        timer: null
      });

    case 'UPDATE_TIMER':
      return (0, _tools.updateObject)(state, {
        timer: action.timer
      });

    default:
      return state;

  }
}