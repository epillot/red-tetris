'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _app = require('./containers/app');

var _app2 = _interopRequireDefault(_app);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _alert = require('./actions/alert');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

addEventListener('keydown', function (_ref) {
  var keyCode = _ref.keyCode;
  return console.log(keyCode);
});

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: _store2.default },
  _react2.default.createElement(_app2.default, null)
), document.getElementById('tetris'));

_store2.default.dispatch((0, _alert.alert)('Soon, will be here a fantastic Tetris ...'));