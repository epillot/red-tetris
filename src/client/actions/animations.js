import * as types from '../constants/actionTypes'
import { movePiece } from '.'
import * as f from '../tools'

export const spaceAnimation = () => {
  return {
    isAnimation: true,
    type: 'SPACE_ANIMATION',
  }
}

const getPieceAnimationStyle = (coords, { opacity }) => {
  const output = []
  const style = {opacity}
  coords.forEach(([x, y]) => {
    output[x + y*10] = style
  })
  return output
}


export const pieceAnimation = () => (dispatch) => {
  const type = 'PIECE_ANIMATION'
  let opacity = 1
  let step = -0.05
  const actions = []
  while (opacity <= 1) {
    if (opacity <= 0.5)
      step = -step
    opacity += step
    actions.push(animation(type, {opacity}))
  }
  return dispatch({
    isAnimation: true,
    actions,
  })
}

const getLineAnimationStyle = (lines, { opacity, b }) => {
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

export const disparitionLinesAnimation = () => (dispatch, getState) => {
  const lines = f.getCompleteLines(getState().tetris)

  if (!lines.length)
    return Promise.resolve()

  const actions = []
  let opacity = 1
  let b = 90
  const step = 0.01
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
    yi += 1
    if (yi >= max + 1 && yi < max + 10)
      yi = max
    actions.push(animation('TRANSLATE_ANIMATION', {yi}))
  }

  return dispatch({
    isAnimation: true,
    actions,
  })
}

export const animation = (type, data) => (dispatch, getState) => {
  let lines

  switch (type) {

    case 'PIECE_ANIMATION':
      dispatch(animationStep(getPieceAnimationStyle(getState().piece.coords, data)))
      break

    case 'LINE_ANIMATION':
      lines = f.getCompleteLines(getState().tetris)
      dispatch(animationStep(getLineAnimationStyle(lines, data)))
      break

    case 'TRANSLATE_ANIMATION':
      lines = f.getCompleteLines(getState().tetris)
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
