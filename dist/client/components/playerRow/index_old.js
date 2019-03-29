'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerRow = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlayerRow = exports.PlayerRow = function PlayerRow(props) {
  return console.log('MMMMMMMMMMMM') || (props.player ? _react2.default.createElement(ActivePlayer, {
    player: props.player,
    num: props.num,
    isMaster: props.isMaster,
    isSelf: props.isSelf
  }) : _react2.default.createElement(EmptyPlayer, { num: props.num }));
};

var ActivePlayer = function ActivePlayer(props) {
  return _react2.default.createElement(
    'div',
    { className: 'playerRow' + (props.isSelf ? ' selfRow' : '') },
    _react2.default.createElement(
      'div',
      { className: 'playerNum' },
      props.num
    ),
    _react2.default.createElement(
      'div',
      { className: 'playerName' },
      props.player.name + (props.isMaster ? ' (master)' : '')
    )
  );
};

var EmptyPlayer = function EmptyPlayer(props) {
  return _react2.default.createElement(
    'div',
    { className: 'emptyRow' },
    _react2.default.createElement(
      'div',
      { className: 'playerNum' },
      props.num
    ),
    _react2.default.createElement(
      'div',
      { className: 'emptyText' },
      'Waiting for player...'
    )
  );
};

var roomPlayers = function roomPlayers(_ref) {
  var master = _ref.master,
      players = _ref.players,
      playerID = _ref.playerID;
  return _react2.default.createElement(
    'div',
    { className: 'roomPlayers' },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        null,
        [1, 2, 3, 4, 5].map(function (num) {
          return _react2.default.createElement(PlayerRow, {
            player: players[num - 1],
            isMaster: players[num - 1] && players[num - 1].id === master.id,
            isSelf: players[num - 1] && players[num - 1].id === playerID,
            num: num,
            key: num
          });
        })
      )
    )
  );
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    master: state.room.master,
    players: state.room.users,
    playerID: state.playerID
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(roomPlayers);