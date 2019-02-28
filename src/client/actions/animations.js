import * as types from '../constants/actionTypes'
import { movePiece } from '.'
import * as f from '../tools'

// const getPieceAnimationStyle = (coords, opacity) => (x, y) => {
//   if (coords.filter(([x1, y1]) => x==x1 && y == y1).length)
//     return {opacity}
//   return {}
// }

const getPieceAnimationStyle = (coords, opacity) => {
  const output = []
  const style = {opacity}
  coords.forEach(([x, y]) => {
    output[x + y*10] = style
  })
  return output
}

export const pieceAnimation = coords => {
  return {
    getLoop: ({ dispatch, getState }, resolve, getStop) => {
      let opacity = 1
      let step = -0.05
      return function loop() {
        //console.log('in loop', 'piece animation');
        if (opacity <= 0.5)
          step = -step
        opacity += step
        if (opacity <= 1 && !getStop().stopped) {
          dispatch(animationStep(getPieceAnimationStyle(getState().piece.coords, opacity)))
          requestAnimationFrame(loop)
        } else resolve(getStop().stop)
      }
    },
    name: 'piece animation',
  }
}

// const getLineAnimationStyle = (lines, opacity, b) => (x, y) => {
//   if (lines.indexOf(y) !== -1) return {opacity, filter: `brightness(${b}%)`}
//   return {}
// }

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

export const lineAnimation = lines => {
  return {
    getLoop: ({ dispatch }, resolve, getStop) => {
      if (!lines.length) return null
      let opacity = 1;
      let nb = 1 / 0.05
      let b = 90;
      let bi = 90 / nb;
      return function loop() {
        //console.log('in loop', 'line animation');
        opacity -= 0.05
        b -= bi
        if (opacity >= 0 && !getStop().stopped) {
          dispatch(animationStep(getLineAnimationStyle(lines, opacity, b)))
          requestAnimationFrame(loop)
        } else resolve(getStop().stop)
      }
    },
    name: 'line animation'
  }
}

export const spaceAnimation = (coords, dest) => {
  return {
    getLoop: ({ dispatch }, resolve, getStop) => {
      const diff = dest[0][1] - coords[0][1]
      let yi = 0

      return function loop() {
        //console.log('in loop', 'space animation');
        yi += 2
        if (yi === diff + 1) yi = diff
        const newCoords = coords.map(([x, y]) => [x, y+yi])
        if (yi <= diff && !getStop().stopped) {
          dispatch(movePiece(newCoords))
          requestAnimationFrame(loop)
        } else resolve(getStop().stop)
      }
    },
    name: 'space animation',
  }
}

// const getTranslateAnimationStyle = (data, yi) => (x, y) => {
//   let translateY = data[y]
//   if (translateY >= yi) translateY = yi
//   return {transform: 'translate(0px, ' +translateY+ 'px)'}
// }

const getTranslateAnimationStyle = (data, yi) => {
  const output = []
  for (let y = 0; y < 20; y++) {
    let translateY = data[y]
    if (translateY > yi) translateY = yi
    for (let x = 0; x < 10; x++) {
      output[x + y*10] = {transform: 'translate(0px, ' +translateY+ 'px)'}
    }
  }
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

export const translateAnimation = (tetris, lines) => {
  return {
    getLoop: ({ dispatch }, resolve, getStop) => {
      if (!lines.length) return null
      let yi = 0
      const data = getTranslationData(lines)
      const max = Math.max(...data)
      return function loop() {
        //console.log('in loop', 'translate animation');
        yi += 25
        if (yi >= max + 1 && yi < max + 25)
          yi = max
        if (yi <= max && !getStop().stopped) {
          dispatch(animationStep(getTranslateAnimationStyle(data, yi)))
          requestAnimationFrame(loop)
        } else resolve(getStop().stop)
      }
    },
    name: 'translate animation',
  }
}

const animationStep = (getStyle) => {
  return {
    type: types.ANIMATION_STEP,
    getStyle,
  }
}
