'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var START_GAME = exports.START_GAME = 'START_GAME';

var startGame = exports.startGame = function startGame(data) {
  return {
    type: START_GAME,
    data: data
  };
};