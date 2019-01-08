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
  var tetris = _ref.tetris,
      startGame = _ref.startGame,
      hash = _ref.hash,
      nickname = _ref.nickname,
      nicknameError = _ref.nicknameError,
      editName = _ref.editName,
      createRoom = _ref.createRoom,
      room = _ref.room;

  return _react2.default.createElement(
    'div',
    { className: 'appContainer' },
    room !== null ? _react2.default.createElement(_room2.default, null) : _react2.default.createElement(
      'div',
      { className: 'homeContainer' },
      _react2.default.createElement(
        'div',
        { className: 'home' },
        _react2.default.createElement(
          'h1',
          null,
          'RED TETRIS'
        ),
        _react2.default.createElement(
          'div',
          { className: 'nameContainer' },
          _react2.default.createElement('input', { id: 'nickname', className: nicknameError ? 'formError' : '', placeholder: 'Nickname', value: nickname, onChange: editName, autoFocus: 'autofocus' }),
          _react2.default.createElement(
            'p',
            { className: 'nicknameError' },
            nicknameError
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'home-form' },
          _react2.default.createElement(
            'button',
            { className: 'createbutton', onClick: createRoom },
            'Cr\xE9er une partie'
          ),
          _react2.default.createElement(
            'button',
            { className: 'startbutton' },
            'Rejoindre une partie'
          )
        )
      )
    )
  );
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    startGame: function startGame() {
      dispatch(actions.server.startGame());
      dispatch(actions.newPiece());
    },
    createRoom: function createRoom() {
      return dispatch(function (_, getState) {
        var _getState = getState(),
            nickname = _getState.nickname;

        if (!nickname) dispatch(actions.nicknamError());else dispatch(actions.server.createRoom(nickname));
      });
    },
    editName: function editName(e) {
      dispatch(actions.editName(e.target.value));
    }
  };
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    tetris: state.tetris,
    nickname: state.nickname,
    room: state.room,
    hash: state.hash,
    nicknameError: state.nicknameError
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);