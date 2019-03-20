import { movePiece } from './piece'
import { getCompleteLines, isPossible, isComplete, isEmpty } from '../tools'

export const spaceAnimation = () => {
  return {
    isAnimation: true,
    nextAction: getState => {
      const newCoords = getState().piece.coords.map(([x, y]) => [x, y + 2])
      if (isPossible(getState().tetris, newCoords))
        return movePiece(newCoords)
    },
  }
}

const getPieceAnimationStyle = (coords, opacity) => {
  const output = []
  coords.forEach(([x, y]) => {
    output[x + y*10] = {opacity}
  })
  return output
}

export const pieceAnimation = () => {
  let opacity = 1
  let step = -0.05
  return {
    isAnimation: true,
    nextAction: getState => {
      if (opacity <= 0.5)
        step = -step
      opacity += step
      if (opacity < 1)
        return animationStep(getPieceAnimationStyle(getState().piece.coords, opacity))
    },
  }
}

const getLineAnimationStyle = (lines, opacity, s) => {
  const output = []
  let r = 360*s
  const style = {opacity, transform: `rotate(${r}deg) scale(${s})`}
  lines.forEach(y => {
    for (let x = 0; x < 10; x++) {
      output[x + y*10] = style
    }
  })
  return output
}

const getTranslateAnimationStyle = (lines, data, yi) => {
  const output = []
  for (let y = 0; y < 20; y++) {
    let translateY = data[y]
    if (translateY > yi) translateY = yi
    for (let x = 0; x < 10; x++) {
      output[x + y*10] = {transform: 'translate(0px, ' +(-translateY)+ 'px)'}
    }
  }
  lines.forEach(y => {
    for (let x = 0; x < 10; x++) {
      output[x + y*10] = {opacity: 0}
    }
  })
  return output
}

const getTranslationData = (tetris) => {
  const data = []
  let nbLine = 0
  let ydiff
  for (let y = tetris.length-1; y >= 0; y--) {
    ydiff = 0
    if (isComplete(tetris[y]))
      nbLine++
    else if (!isEmpty(tetris[y]))
      ydiff = nbLine * 40
    data[y] = ydiff
  }
  return data
}

export const disparitionLinesAnimation = (lines) => (dispatch) => {
  if (!lines)
    return Promise.resolve()

  let opacity = 1
  const step = 0.05
  let max
  let yi = 0
  let s = 1
  const si = 1 / (1 / step)

  return dispatch({
    isAnimation: true,
    nextAction: getState => {
      if (opacity > 0) {
        opacity -= step
        s -= si
        return animationStep(getLineAnimationStyle(getCompleteLines(getState().tetris), opacity, s))
      }
      const data = getTranslationData(getState().tetris)
      max = Math.max(...data)
      if (yi < max) {
        yi += 6
        if (yi > max)
          yi = max
        return animationStep(getTranslateAnimationStyle(getCompleteLines(getState().tetris), data, yi))
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
