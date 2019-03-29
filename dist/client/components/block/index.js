'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _tools = require('../../tools/');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultStyle = {};

var getBlockClass = function getBlockClass(x, y, tetris, piece) {
  //console.log(x, y);
  if (!tetris) return '';
  // const len = tetris.length - 20
  //const board = tetris.reverse().map(line => line.reverse())
  //console.log(board);

  if (piece && piece.coords /*.map(([px, py]) => [px, py - len])*/.filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        px = _ref2[0],
        py = _ref2[1];

    return px == x && py == y;
  }).length) return piece.color + ' colored';
  var block = tetris[y][x];
  var ghost = (0, _tools.getPieceProjection)(tetris, piece);
  if (ghost && ghost /*.map(([px, py]) => [px, py - len])*/.filter(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        px = _ref4[0],
        py = _ref4[1];

    return px == x && py == y;
  }).length && block === '') return 'ghost';
  if (block) return block + ' colored';
  return block;
};

var block = function block(_ref5) {
  var x = _ref5.x,
      y = _ref5.y,
      blockClass = _ref5.blockClass,
      style = _ref5.style;
  return (/*console.log(`block is rendered`) ||*/_react2.default.createElement('div', { className: 'block ' + blockClass, style: style })
  );
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var x = ownProps.x,
      y = ownProps.y,
      num = ownProps.num;

  var blockClass = /*num === 1 ? 'red' : 'green'*/getBlockClass(x, y, state.tetris, state.piece);
  return {
    blockClass: blockClass,
    //we don't need to animate an empty block
    style: blockClass && state.getStyle[x + y * 10] || defaultStyle
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(block);