'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getBoardClassName = function getBoardClassName(ghost, isPlaying, gameOver, win) {
  var boardClass = 'ghostContainer';
  if (ghost === null) boardClass += ' waitingGhost';
  if (ghost === undefined && !isPlaying) boardClass += ' readyGhost';
  if (gameOver || win) boardClass += ' boardGhostGameEnded';
  return boardClass;
};

var getGhost = function getGhost(ghost) {
  console.log(ghost);
  var output = [];
  var x = void 0,
      y = void 0,
      blockclass = void 0;
  var offset = ghost.length - 20;
  for (var i = 0; i < 200; i++) {
    x = Math.floor(i % 10);
    y = offset + Math.floor(i / 10);
    blockclass = 'blockGhost';
    if (y >= ghost.length - ghost.nbLine) blockclass += ' black';else if (ghost.data[x] !== -1 && y >= ghost.data[x]) blockclass += ' plain';
    output.push(_react2.default.createElement('div', { key: i, className: blockclass }));
  }
  return output;
};

var playerGhost = function playerGhost(_ref) {
  var name = _ref.name,
      ghost = _ref.ghost,
      num = _ref.num,
      isPlaying = _ref.isPlaying,
      gameOver = _ref.gameOver,
      win = _ref.win;
  return _react2.default.createElement(
    'div',
    { className: 'ghostWrapper' },
    _react2.default.createElement(
      'div',
      { className: 'ghostPlayerName' },
      name
    ),
    _react2.default.createElement(
      'div',
      { className: getBoardClassName(ghost, isPlaying, gameOver, win) },
      ghost === undefined && !isPlaying && _react2.default.createElement(
        'p',
        null,
        'READY'
      ),
      ghost === null && _react2.default.createElement(
        'p',
        null,
        'Waiting for player'
      ),
      gameOver && _react2.default.createElement(
        'i',
        { className: 'material-icons md-48 md-blue' },
        'sentiment_very_dissatisfied'
      ),
      win && _react2.default.createElement(
        'i',
        { className: 'material-icons md-48 md-blue' },
        'sentiment_very_satisfied'
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'boardGhost' },
      ghost && getGhost(ghost)
    )
  );
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var user = state.roomUsers.filter(function (user) {
    return user.id !== state.connecting.playerID;
  })[ownProps.num];
  // if (ownProps.num == 0)
  //   return {
  //     name: 'test',
  //     ghost: undefined,
  //     isPlaying: true,
  //     gameOver: true,
  //   }
  // if (user)
  //   console.log(state.playersGhosts[user.id]);
  return {
    name: user ? user.name : '',
    ghost: user ? state.playersGhosts[user.id] : null,
    isPlaying: user ? user.isPlaying : false,
    gameOver: user ? user.gameOver : false,
    win: user ? user.win : false
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(playerGhost);