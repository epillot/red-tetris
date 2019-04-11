import React from 'react'
import { connect } from 'react-redux'
import { getPieceProjection } from '../../tools/'
import './style.css'

const defaultStyle = {}

const getBlockClass = (x, y, tetris, piece) => {
  if (!tetris)
    return ''
  if (piece && piece.coords.filter(([px, py]) => px==x && py==y).length)
    return piece.color + ' colored'
  const block = tetris[y][x]
  const ghost = getPieceProjection(tetris, piece)
  if (ghost && ghost.filter(([px, py]) => px==x && py==y).length && block === '')
    return 'ghost'
  if (block)
    return block + ' colored'
  return block
}

export const block = ({ x, y, blockClass, style }) => /*console.log(`block is rendered`) ||*/ (
   <div className={`block ${blockClass}`} style={style}></div>
)

const mapStateToProps = (state, ownProps) => {
  const { x, y } = ownProps
  const blockClass = getBlockClass(x, y, state.tetris, state.piece)
  return {
    blockClass,
    //we don't need to animate an empty block
    style: (blockClass && state.getStyle[x + y*10]) || defaultStyle,
  }
}

export default connect(mapStateToProps, null)(block)
