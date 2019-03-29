'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _block = require('../block/');

var _block2 = _interopRequireDefault(_block);

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const getBlocks = (tetris, piece, pieceColor, getStyle) => {
//   if (!tetris)
//     return null
//   const ghost = getPieceProjection(tetris, piece)
//   return tetris.map((col, y) => {
//     return col.map((color, x) => {
//       if (color) color += ' colored'
//       let style = {}
//       if (getStyle)
//         style = getStyle(x, y)
//       if (piece && piece.filter(([px, py]) => px==x && py==y).length)
//         color = pieceColor + ' colored'
//       if (ghost && ghost.filter(([px, py]) => px==x && py==y).length && color === '')
//         color = 'ghost'
//       return <div key={`${x}${y}`} className={`block ${color}`} style={style}></div>
//     });
//   });
// }

var getBlocks = function getBlocks(len) {
  var output = [];
  console.log(len);
  for (var i = 0; i < len * 10; i++) {
    console.log('salut');
    output.push(_react2.default.createElement(_block2.default, { key: i, x: 9 - Math.floor(i % 10), y: len - 1 - Math.floor(i / 10) }));
    //output.push(<Block key={i} num={i % 2} />)
  }
  return output;
};

// const board = ({ tetris, coords, color, getStyle, isPlaying, timer, gameOver }) => (
//   <div className={'board' + (gameOver ? ' boardGameOver' : '')}>
//     {getBlocks(tetris, coords, color, getStyle)}
//     <div className='wrapper'>
//       {timer && <div className='timer'>{timer}</div>}
//       {gameOver && <span className='gameOver'>GAME OVER</span>}
//     </div>
//   </div>
// )

var board = function board(_ref) {
  var timer = _ref.timer,
      gameOver = _ref.gameOver,
      win = _ref.win,
      len = _ref.len;
  return _react2.default.createElement(
    'div',
    { className: 'boardWrapper' },
    _react2.default.createElement(
      'div',
      { className: 'board-container' },
      timer && _react2.default.createElement(
        'div',
        { className: 'timer' },
        timer
      ),
      gameOver && _react2.default.createElement(
        'span',
        { className: 'gameOver' },
        'GAME OVER'
      ),
      win && _react2.default.createElement(
        'span',
        { className: 'gameOver' },
        'YOU WIN !'
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'board' + (gameOver || win ? ' boardGameOver' : '') },
      !timer && getBlocks(len)
    )
  );
};

var mapStateToProps = function mapStateToProps(state) {
  var self = state.roomUsers.find(function (user) {
    return user.id === state.connecting.playerID;
  });
  return {
    //tetris: state.tetris,
    //coords: state.coords,
    //color: state.color,
    //getStyle: state.getStyle,
    //isPlaying: state.isPlaying,
    len: state.tetris ? state.tetris.length : 0,
    timer: state.game.timer,
    gameOver: self.gameOver,
    win: self.win
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(board);