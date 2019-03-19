export const putPiece = piece => {
  return {
    type: 'PUT_PIECE',
    piece,
  }
}

export const blackLines = nbLines => (dispatch, getState) => {
  return dispatch({
    type: 'BLACK_LINES',
    nbLines,
    tetris: getState().tetris,
  })
}

export const removeLines = () => {
  return {
    type: 'REMOVE_LINES'
  }
}
