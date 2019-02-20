import React from 'react'
import { connect } from 'react-redux'
import { getPieceProjection } from '../../tools/'
import './style.css'

const defaultStyle = {}

const getBlockClass = (x, y, tetris, piece, pieceColor) => {
  if (!tetris)
    return ''
  if (piece && piece.filter(([px, py]) => px==x && py==y).length)
    return pieceColor + ' colored'
  const block = tetris[y][x]
  const ghost = getPieceProjection(tetris, piece)
  if (ghost && ghost.filter(([px, py]) => px==x && py==y).length && block === '')
    return 'ghost'
  if (block)
    return block + ' colored'
  return block
}

const block = ({ x, y, blockClass, style }) => console.log(`'block [${x + y*10}] is rendered`) || (
   <div className={`block ${blockClass}`} style={style}></div>
)

const mapStateToProps = (state, ownProps) => {
  const { x, y } = ownProps

  return {
    blockClass: getBlockClass(x, y, state.tetris, state.coords, state.color),
    style: state.getStyle ? (Object.keys(state.getStyle(x, y)).length ? state.getStyle(x, y) : defaultStyle) : defaultStyle,
  }
}

export default connect(mapStateToProps, null)(block)
