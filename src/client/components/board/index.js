import React from 'react'
import { connect } from 'react-redux'
import './style.css'

const getBlocks = (tetris, piece, ghost, pieceColor, getStyle) => {
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

const board = ({ tetris, coords, ghost, color, getStyle }) => (
  <div className='board'>
    {getBlocks(tetris, coords, ghost, color, getStyle)}
  </div>
)

const mapStateToProps = (state) => {
  return {
    tetris: state.tetris,
    message: state.message,
    ghost: state.ghost,
    coords: state.coords,
    color: state.color,
    getStyle: state.getStyle,
  }
}

export default connect(mapStateToProps, null)(board)
