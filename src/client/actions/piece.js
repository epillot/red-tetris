export const movePiece = (coords, rotate=null) => {
  return {
    type: 'MOVE_PIECE',
    coords,
    rotate,
  }
}

export const interval = id => {
  return {
    type: 'PIECE_INTERVAL',
    interval: id,
  }
}
