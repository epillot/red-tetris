import { movePiece } from './piece'
import * as tools from '../tools/animations'
import { getCompleteLines, isPossible } from '../tools'

export const spaceAnimation = () => {
  return {
    type: 'SPACE_ANIMATION',
    isAnimation: true,
    nextAction: getState => {
      const newCoords = getState().piece.coords.map(([x, y]) => [x, y + 2])
      if (isPossible(getState().tetris, newCoords))
        return movePiece(newCoords)
    },
  }
}

export const pieceAnimation = () => {
  let opacity = 1
  let step = -0.05
  return {
    type: 'PIECE_ANIMATION',
    isAnimation: true,
    nextAction: getState => {
      if (opacity <= 0.5)
        step = -step
      opacity += step
      if (opacity < 1)
        return animationStep(tools.getPieceAnimationStyle(getState().piece.coords, opacity))
    },
  }
}

export const disparitionLinesAnimation = (lines) => (dispatch) => {
  if (!lines)
    return Promise.resolve()

  let opacity = 1
  const step = 0.01
  let max
  let yi = 0
  let s = 1
  const si = 1 / (1 / step)

  return dispatch({
    type: 'DISPARITION_LINES_ANIMATION',
    isAnimation: true,
    nextAction: getState => {
      if (opacity > 0) {
        opacity -= step
        s -= si
        return animationStep(tools.getLineAnimationStyle(getCompleteLines(getState().tetris), opacity, s))
      }
      const data = tools.getTranslationData(getState().tetris)
      max = Math.max(...data)
      if (yi < max) {
        yi += 6
        if (yi > max)
          yi = max
        return animationStep(tools.getTranslateAnimationStyle(getCompleteLines(getState().tetris), data, yi))
      }
    },
  })
}

export const animationStep = (getStyle) => {
  return {
    type: 'ANIMATION_STEP',
    getStyle,
  }
}
