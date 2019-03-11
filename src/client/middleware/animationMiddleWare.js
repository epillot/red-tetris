import { movePiece } from '../actions'
import { isPossible } from '../tools'

export const animationMiddleWare = ({ dispatch, getState }) => next => action => {

  if (!action.isAnimation)
    return next(action)

  if (document.hidden) return Promise.resolve()

  const nextAction = () => {
    if (action.type === 'SPACE_ANIMATION') {
      const newCoords = getState().piece.coords.map(([x, y]) => [x, y + 2])
      if (isPossible(getState().tetris, newCoords))
        return movePiece(newCoords)
      return null
    }

    const actions = action.actions

    if (actions.length)
      return actions.shift()
    return null
  }

  return new Promise(resolve => {
    let stopped = false

    const stop = () => {
      console.log('---------stop fired---------')
      if (document.hidden) {
        stopped = true
        resolve()
      }
    }

    addEventListener('visibilitychange', stop)

    const loop = () => {
      const animAction = nextAction()
      if (animAction && !stopped) {
        dispatch(animAction)
        requestAnimationFrame(loop)
      } else {
        resolve()
        removeEventListener('visibilitychange', stop)
      }
    }

    requestAnimationFrame(loop)
  })
}
