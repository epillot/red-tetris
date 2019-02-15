import React from 'react'
import { connect } from 'react-redux'
import { getPieceProjection } from '../../tools/'
import './style.css'

const getBlocks = (tetris, piece, pieceColor, getStyle) => {
  if (!tetris)
    return null
  const ghost = getPieceProjection(tetris, piece)
  return tetris.map((col, i) => {
    return col.map((color, j) => {
      if (color) color += ' colored'
      let style = {}
      if (getStyle)
        style = getStyle(i, j)
      if (piece && piece.filter(([x, y]) => x==i && y==j).length)
        color = pieceColor + ' colored'
      if (ghost && ghost.filter(([x, y]) => x==i && y==j).length && color === '')
        color = 'ghost'
      return <div key={`${i}${j}`} className={`block ${color}`} style={style}></div>
    });
  });
}

const board = ({ tetris, coords, color, getStyle, isPlaying, timer, gameOver }) => (
  <div className={'board' + (gameOver ? ' boardGameOver' : '')}>
    {getBlocks(tetris, coords, color, getStyle)}
    <div className='wrapper'>
      {timer && <div className='timer'>{timer}</div>}
      {gameOver && <span className='gameOver'>GAME OVER</span>}
    </div>
  </div>
)

// const board2 = ({ tetris, coords, color, getStyle, isPlaying, timer, gameOver }) => (
//   <div className={getBoardClass()}}>
//
//   </div>
// )

const mapStateToProps = (state) => {
  return {
    tetris: state.tetris,
    coords: state.coords,
    color: state.color,
    getStyle: state.getStyle,
    isPlaying: state.isPlaying,
    timer: state.timer,
    gameOver: state.gameOver,
  }
}

export default connect(mapStateToProps, null)(board)
