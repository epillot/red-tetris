import React from 'react'
import { connect } from 'react-redux'
import { getPieceProjection } from '../../tools/'
import './style.css'

const defaultStyle = {}

const getBlockClass = (x, y, tetris, piece) => {
  if (!tetris)
    return 'block'

  if (piece && piece.coords.filter(([px, py]) => px==x && py==y).length)
    return 'block ' + piece.color + ' colored'

  const ghost = getPieceProjection(tetris, piece)
  if (ghost && ghost.filter(([px, py]) => px==x && py==y).length)
    return 'ghost'

  const color = tetris[y][x]
  if (color)
    return 'block ' + color + ' colored'
  return 'block'
}

export const block = ({ x, y, blockClass, style }) => {
  return (<div className={blockClass} style={style}></div>)
}

const mapStateToProps = (state, ownProps) => {
  const { x, y, num } = ownProps
  const blockClass = getBlockClass(x, y, state.tetris, state.piece)
  return {
    blockClass,
    //we don't need to animate an empty block
    style: (blockClass !== 'block' && state.getStyle[x + y*10]) || defaultStyle,
  }
}

export default connect(mapStateToProps, null)(block)
