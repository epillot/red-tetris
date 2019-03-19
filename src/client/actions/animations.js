import * as types from '../constants/actionTypes'
import { movePiece } from '.'
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

const getLineAnimationStyle = (lines, opacity, b) => {
  const output = []
  const style = {opacity, filter: `brightness(${b}%)`}
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
  let b = 90
  const step = 0.01
  const bi = 90 / (1 / step)
  let max
  let yi = 0

  return dispatch({
    isAnimation: true,
    nextAction: getState => {
      if (opacity > 0) {
        opacity -= step
        b -= bi
        return animationStep(getLineAnimationStyle(getCompleteLines(getState().tetris), opacity, b))
      }
      const data = getTranslationData(getState().tetris)
      max = Math.max(...data)
      if (yi < max) {
        console.log('kiiikiik');
        yi += 0.5
        if (yi > max)
          yi = max
        return animationStep(getTranslateAnimationStyle(getCompleteLines(getState().tetris), data, yi))
      }
    },
  })
}

export const animationStep = (getStyle) => {
  return {
    type: types.ANIMATION_STEP,
    getStyle,
  }
}
