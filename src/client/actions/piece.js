export const movePiece = (coords, rotate=null) => {
  return {
    type: 'MOVE_PIECE',
    coords,
    rotate,
  }
}
