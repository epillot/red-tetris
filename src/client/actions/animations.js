import * as types from '../constants/actionTypes'
import { movePiece } from '.'
import { getCompleteLines, isPossible } from '../tools'

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

const getTranslateAnimationStyle = (lines, { yi }) => {
  const data = getTranslationData(lines)
  const output = []
  for (let y = 0; y < 20; y++) {
    let translateY = data[y]
    if (translateY > yi) translateY = yi
    for (let x = 0; x < 10; x++) {
      output[x + y*10] = {transform: 'translate(0px, ' +translateY+ 'px)'}
    }
  }
  const style = {opacity: 0}
  lines.forEach(y => {
    for (let x = 0; x < 10; x++) {
      output[x + y*10] = style
    }
  })
  return output
}

const getTranslationData = (lines) => {
  const data = []
  for (let y = 0; y < 20; y++) {
    let ydiff = 0
    lines.forEach(line => {
      if (y < line) ydiff++
    })
    data.push(ydiff * 40)
  }
  return data
}

export const disparitionLinesAnimation2 = () => (dispatch, getState) => {
  const lines = getCompleteLines(getState().tetris)

  if (!lines.length)
    return Promise.resolve()

  const actions = []
  let opacity = 1
  let b = 90
  const step = 0.05
  const bi = 90 / (1 / step)
  while (opacity >= 0) {
    opacity -= step
    b -= bi
    actions.push(animation('LINE_ANIMATION', {opacity, b}))
  }

  let yi = 0
  const data = getTranslationData(lines)
  const max = Math.max(...data)
  while (yi < max) {
    yi += 15
    if (yi > max)
      yi = max
    actions.push(animation('TRANSLATE_ANIMATION', {yi}))
  }

  return dispatch({
    isAnimation: true,
    actions,
  })
}

export const disparitionLinesAnimation = (lines) => (dispatch) => {
  if (!lines)
    return Promise.resolve()

  let opacity = 1
  let b = 90
  const step = 0.01
  const bi = 90 / (1 / step)
  const max = lines*40
  let yi = 0

  return dispatch({
    isAnimation: true,
    nextAction: getState => {
      if (opacity > 0) {
        opacity -= step
        b -= bi
        return animationStep(getLineAnimationStyle(getCompleteLines(getState().tetris), opacity, b))
      }
      // if (yi < max)
    },
  })
}

const animation = (type, data) => (dispatch, getState) => {
  let lines

  switch (type) {

    case 'PIECE_ANIMATION':
      dispatch(animationStep(getPieceAnimationStyle(getState().piece.coords, data)))
      break

    case 'LINE_ANIMATION':
      lines = getCompleteLines(getState().tetris)
      dispatch(animationStep(getLineAnimationStyle(lines, data)))
      break

    case 'TRANSLATE_ANIMATION':
      lines = getCompleteLines(getState().tetris)
      dispatch(animationStep(getTranslateAnimationStyle(lines, data)))
      break

    default:
      break
  }

}

export const animationStep = (getStyle) => {
  return {
    type: types.ANIMATION_STEP,
    getStyle,
  }
}
