'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _board = require('../board/');

var _board2 = _interopRequireDefault(_board);

var _playerRow = require('../playerRow');

var _playerRow2 = _interopRequireDefault(_playerRow);

var _playerGhost = require('../playerGhost');

var _playerGhost2 = _interopRequireDefault(_playerGhost);

var _actions = require('../../actions');

var actions = _interopRequireWildcard(_actions);

require('./style.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var room = function room(_ref) {
  var roomId = _ref.roomId,
      isMaster = _ref.isMaster,
      isPlaying = _ref.isPlaying,
      startGame = _ref.startGame,
      pause = _ref.pause;
  return _react2.default.createElement(
    'div',
    { className: 'roomContainer' },
    _react2.default.createElement('div', { className: 'inGameGrid' }),
    _react2.default.createElement(
      'div',
      { className: 'roomSide roomSideLeft' },
      _react2.default.createElement(
        'h4',
        null,
        'Red Tetris'
      ),
      _react2.default.createElement(
        'div',
        { className: 'roomSideTop' },
        'Room code: ',
        roomId
      ),
      _react2.default.createElement(
        'div',
        { className: 'roomSideMiddle' },
        _react2.default.createElement(
          'div',
          { className: 'roomPlayers' },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              null,
              [1, 2, 3, 4, 5].map(function (num) {
                return _react2.default.createElement(_playerRow2.default, {
                  num: num,
                  key: num
                });
              })
            )
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'roomSideBottom' },
        !isPlaying && (isMaster ? _react2.default.createElement(
          'button',
          { className: 'startGame', onClick: startGame },
          'Start game'
        ) : _react2.default.createElement(
          'p',
          { className: 'waitingMaster' },
          'Waiting for the master to start the game...'
        )),
        isPlaying && _react2.default.createElement(
          'p',
          { className: 'waitingMaster' },
          'A game is in progress !'
        ),
        isPlaying && _react2.default.createElement(
          'button',
          { className: 'startGame', onClick: pause },
          'PAUSE'
        )
      )
    ),
    _react2.default.createElement(_board2.default, null),
    _react2.default.createElement(
      'div',
      { className: 'roomSide roomSideRight' },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(_playerGhost2.default, { num: 0 }),
        _react2.default.createElement(_playerGhost2.default, { num: 1 })
      ),
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(_playerGhost2.default, { num: 2 }),
        _react2.default.createElement(_playerGhost2.default, { num: 3 })
      )
    )
  );
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    roomId: state.room.id,
    isMaster: state.roomUsers[0].id === state.connecting.playerID,
    isPlaying: state.room.isPlaying
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    startGame: function startGame() {
      dispatch(actions.server.startGame());
    },
    pause: function pause() {
      dispatch(actions.pause());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(room);