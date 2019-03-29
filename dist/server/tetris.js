'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tetris = function () {
  function Tetris() {
    _classCallCheck(this, Tetris);
  }

  _createClass(Tetris, [{
    key: 'getTetriminos',
    value: function getTetriminos(name) {
      //square
      if (name === 'square') return {
        coords: [[0, -1], [0, 0], [1, -1], [1, 0]],
        rotate: 0,
        color: 'red',
        type: 'square'
        //T
      };if (name === 'T') return {
        coords: [[0, -1], [0, 0], [-1, 0], [1, 0]],
        rotate: 0,
        color: 'blue',
        type: 'T'
        //L
      };if (name === 'L') return {
        coords: [[0, -2], [0, -1], [0, 0], [1, 0]],
        rotate: 0,
        color: 'yellow',
        type: 'L'
        //reverse L
      };if (name === 'revL') return {
        coords: [[0, 0], [0, -1], [0, -2], [1, -2]],
        rotate: 0,
        color: 'green',
        type: 'revL'
        //ligne
      };if (name === 'line') return {
        coords: [[0, -3], [0, -2], [0, -1], [0, 0]],
        rotate: 0,
        color: 'purple',
        type: 'line'
        //Z
      };if (name === 'Z') return {
        coords: [[1, -1], [0, -1], [0, 0], [-1, 0]],
        rotate: 0,
        color: 'pink',
        type: 'Z'
        //reverse Z
      };if (name === 'revZ') return {
        coords: [[-1, -1], [0, -1], [0, 0], [1, 0]],
        rotate: 0,
        color: 'orange',
        type: 'revZ'
      };
    }
  }, {
    key: 'newTetriminos',
    value: function newTetriminos() {
      var items = ['line', 'L', 'revL', 'Z', 'revZ', 'T', 'square'];
      var name = items[Math.floor(Math.random() * items.length)];
      var t = this.getTetriminos(name);
      var startx = 4;
      var starty = 4;
      for (var i = 0; i < 4; i++) {
        t.coords[i][0] += startx;
        //t.coords[i][1] += starty
      }
      return t;
    }
  }]);

  return Tetris;
}();

exports.default = new Tetris();