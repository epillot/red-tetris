'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var actions = _interopRequireWildcard(_actions);

var _room = require('../components/room/');

var _room2 = _interopRequireDefault(_room);

var _app = require('./app.css');

var _app2 = _interopRequireDefault(_app);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App(_ref) {
  var nickname = _ref.nickname,
      nicknameError = _ref.nicknameError,
      partyCode = _ref.partyCode,
      room = _ref.room,
      roomError = _ref.roomError,
      editName = _ref.editName,
      editCode = _ref.editCode,
      createRoom = _ref.createRoom,
      joinRoom = _ref.joinRoom,
      removeError = _ref.removeError,
      isLoading = _ref.isLoading,
      roomLoading = _ref.roomLoading;

  if (isLoading || roomLoading) {
    return _react2.default.createElement(
      'div',
      { className: 'appContainer' },
      _react2.default.createElement(
        'div',
        { className: 'grid-container' },
        _react2.default.createElement(
          'div',
          { className: 'test' },
          _react2.default.createElement(
            'div',
            { className: 'main-container' },
            _react2.default.createElement(
              'h1',
              null,
              'Red Tetris'
            ),
            _react2.default.createElement(
              'div',
              { className: 'connecting' },
              'Connecting...'
            )
          )
        )
      )
    );
  }
  return _react2.default.createElement(
    'div',
    { className: 'appContainer' },
    room !== null ? _react2.default.createElement(_room2.default, null) : _react2.default.createElement(
      'div',
      { className: 'grid-container' },
      _react2.default.createElement(
        'div',
        { className: 'test' },
        _react2.default.createElement(
          'div',
          { className: 'main-container' },
          _react2.default.createElement(
            'h1',
            null,
            'Red Tetris'
          ),
          _react2.default.createElement(
            'div',
            { className: 'loginForm' },
            _react2.default.createElement('input', { id: 'nickname', autoComplete: 'off', className: nicknameError ? 'formError' : '', placeholder: 'Login', value: nickname, onSelect: removeError('nicknameError'), onChange: editName, autoFocus: 'autofocus' }),
            _react2.default.createElement('input', { id: 'partyCode', autoComplete: 'off', className: roomError ? 'formError' : '', value: partyCode, onSelect: removeError('roomError'), placeholder: 'Game code', onChange: editCode })
          ),
          _react2.default.createElement(
            'button',
            { onClick: createRoom },
            'Start game'
          ),
          _react2.default.createElement(
            'button',
            { onClick: joinRoom },
            'Join game'
          )
        )
      )
    )
  );
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    createRoom: function createRoom() {
      return dispatch(function (_, getState) {
        var nickname = getState().ui.nickname;

        if (!nickname) dispatch(actions.ui.nicknameError());else dispatch(actions.server.createRoom(nickname));
      });
    },
    joinRoom: function joinRoom() {
      return dispatch(function (_, getState) {
        var _getState$ui = getState().ui,
            nickname = _getState$ui.nickname,
            partyCode = _getState$ui.partyCode;

        if (!nickname) dispatch(actions.ui.nicknameError());else dispatch(actions.server.joinRoom(partyCode, nickname));
      });
    },
    editName: function editName(e) {
      dispatch(actions.ui.editName(e.target.value));
    },
    editCode: function editCode(e) {
      dispatch(actions.ui.editCode(e.target.value));
    },
    removeError: function removeError(name) {
      return function () {
        dispatch(actions.ui.removeError(name));
      };
    }
  };
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    nickname: state.ui.nickname,
    nicknameError: state.ui.nicknameError,
    partyCode: state.ui.partyCode,
    room: state.room,
    roomError: state.ui.roomError,
    isLoading: state.connecting.playerID === undefined,
    roomLoading: state.connecting.roomLoading
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);