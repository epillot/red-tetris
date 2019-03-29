'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlayerRow = function PlayerRow(_ref) {
  var isEmpty = _ref.isEmpty,
      playerName = _ref.playerName,
      playerID = _ref.playerID,
      selfId = _ref.selfId,
      num = _ref.num;
  return !isEmpty ? _react2.default.createElement(ActivePlayer, {
    name: playerName,
    num: num,
    isMaster: num === 1,
    isSelf: playerID === selfId
  }) : _react2.default.createElement(EmptyPlayer, { num: num });
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
      props.name + (props.isMaster ? ' (master)' : '')
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

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var player = state.roomUsers[ownProps.num - 1];
  return {
    isEmpty: player === undefined,
    playerName: player ? player.name : '',
    playerID: player ? player.id : '',
    selfId: state.connecting.playerID
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(PlayerRow);