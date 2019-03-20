import * as actions from '../actions'

export const socketIoMiddleWare = socket => ({dispatch, getState}) => {

  addEventListener('keydown', ({ keyCode }) => {
    if (keyCode === 27 && getState().tetris)
      dispatch(actions.tetris.blackLines(2))
  })

  if (socket) {
    socket.on('action', action => {
      if (action.hash && action.hash.to === socket.id)
        window.location.hash = action.hash.hash
      if (action.type === 'NEW_PIECE') {
        if (action.room)
          dispatch({type: 'UPDATE_ROOM', room: action.room})
        dispatch(actions.tryNewPiece(action))
      } else if (action.type === 'UPDATE_GHOST') {
        dispatch(action)
        if (action.lines > 0 && getState().roomUsers.find(user => user.id === socket.id && user.isPlaying)) {
          dispatch(actions.tetris.blackLines(action.lines))
          dispatch(actions.server.updateTetris())
        }
      } else if (action.type === 'UPDATE_ROOM') {
        dispatch(action)
        const winner = action.room.users.find(user => user.win === true)
        if (winner && winner.id === socket.id) {
          const piece = getState().piece
          if (piece) {
            clearInterval(piece.interval)
            removeEventListener('keydown', actions.keyEvents)
          }
        }
      } else
        dispatch(action)
    })
  }
  return next => action => {
    if (socket && action.type && action.type.indexOf('server/') === 0)
      socket.emit('action', action)
    return next(action)
  }
}
