'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _board = require('../board/');

var _board2 = _interopRequireDefault(_board);

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var room = function room(_ref) {
  var room = _ref.room;
  return _react2.default.createElement(
    'div',
    { className: 'roomContainer' },
    _react2.default.createElement(
      'div',
      { className: 'roomSide' },
      _react2.default.createElement(
        'div',
        { className: 'roomHeader' },
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            'span',
            null,
            'Party code: '
          ),
          _react2.default.createElement(
            'span',
            { className: 'roomId' },
            room
          )
        ),
        _react2.default.createElement(
          'p',
          { className: 'codeHint' },
          'Share this code with your friends !'
        )
      )
    ),
    _react2.default.createElement(_board2.default, null),
    _react2.default.createElement('div', { className: 'roomSide' })
  );
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    room: state.room
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(room);