import React from 'react'
import { connect } from 'react-redux'
import Block from '../block/'
import './style.css'

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

const getBlocks = () => {
  const output = []
  for (let i = 0; i < 200; i++) {
    console.log('salut');
    output.push(<Block key={i} x={Math.floor(i % 10)} y={Math.floor(i / 10)} />)
  }
  return output
}

// const board = ({ tetris, coords, color, getStyle, isPlaying, timer, gameOver }) => (
//   <div className={'board' + (gameOver ? ' boardGameOver' : '')}>
//     {getBlocks(tetris, coords, color, getStyle)}
//     <div className='wrapper'>
//       {timer && <div className='timer'>{timer}</div>}
//       {gameOver && <span className='gameOver'>GAME OVER</span>}
//     </div>
//   </div>
// )

const board = ({ timer, gameOver }) => (
  <div className={'board' + (gameOver ? ' boardGameOver' : '')}>
    {!timer && getBlocks()}
    <div className='wrapper'>
      {timer && <div className='timer'>{timer}</div>}
      {gameOver && <span className='gameOver'>GAME OVER</span>}
    </div>
  </div>
)

const mapStateToProps = (state) => {
  return {
    //tetris: state.tetris,
    //coords: state.coords,
    //color: state.color,
    //getStyle: state.getStyle,
    //isPlaying: state.isPlaying,
    timer: state.game.timer,
    gameOver: state.game.gameOver,
  }
}

export default connect(mapStateToProps, null)(board)
