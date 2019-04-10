import { isComplete, isEmpty, getCompleteLines } from '../tools'

export const getPieceAnimationStyle = (coords, opacity) => {
  const output = []
  coords.forEach(([x, y]) => {
    output[x + y*10] = {opacity}
  })
  return output
}

export const getLineAnimationStyle = (tetris, opacity, s) => {
  const lines = getCompleteLines(tetris)
  const output = []
  let r = 360*s
  const style = {opacity, transform: `rotate(${r}deg) scale(${s})`}
  lines.forEach(y => {
    for (let x = 0; x < tetris[0].length; x++) {
      output[x + y*10] = style
    }
  })
  return output
}

export const getTranslateAnimationStyle = (tetris, data, yi) => {
  const output = []
  for (let y = 0; y < tetris.length; y++) {
    let translateY = data[y]
    if (translateY > yi) translateY = yi
    for (let x = 0; x < tetris[0].length; x++) {
      output[x + y*10] = {transform: 'translate(0px, ' +(-translateY)+ 'px)'}
    }
  }
  const lines = getCompleteLines(tetris)
  lines.forEach(y => {
    for (let x = 0; x < tetris[0].length; x++) {
      output[x + y*10] = {opacity: 0}
    }
  })
  return output
}

export const getTranslationData = (tetris) => {
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
