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

var getBlocks = function getBlocks(tetris, piece, pieceColor, getStyle) {
  var ghost = (0, _tools.getPieceProjection)(tetris, piece);
  return tetris.map(function (col, i) {
    return col.map(function (color, j) {
      if (color) color += ' colored';
      var style = {};
      if (getStyle) style = getStyle(i, j);
      if (piece && piece.filter(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            x = _ref2[0],
            y = _ref2[1];

        return x == i && y == j;
      }).length) color = pieceColor + ' colored';
      if (ghost && ghost.filter(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            x = _ref4[0],
            y = _ref4[1];

        return x == i && y == j;
      }).length && color === '') color = 'ghost';
      return _react2.default.createElement('div', { key: '' + i + j, className: 'block ' + color, style: style });
    });
  });
};

var board = function board(_ref5) {
  var tetris = _ref5.tetris,
      coords = _ref5.coords,
      color = _ref5.color,
      getStyle = _ref5.getStyle;
  return _react2.default.createElement(
    'div',
    { className: 'board' },
    getBlocks(tetris, coords, color, getStyle)
  );
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    tetris: state.tetris,
    coords: state.coords,
    color: state.color,
    getStyle: state.getStyle
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(board);