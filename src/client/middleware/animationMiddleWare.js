export const animationMiddleWare = ({ dispatch, getState }) => next => action => {

  if (!action.isAnimation)
    return next(action)

  if (document.hidden) return Promise.resolve()

  const nextAction = (cb) => cb ? cb(getState) : action.actions.shift()

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
      const animAction = nextAction(action.nextAction)
      console.log('la', animAction);
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
