import * as types from '../constants/actionTypes'
import { movePiece } from '.'
import * as f from '../tools'

// export const testAnim = store => {
//   let currentCoords
//   return store.subscribe(() => {
//     let prevCoords = currentCoords
//     currentCoords = store.getState().coords
//     if (!currentCoords || currentCoords === prevCoords) return;
//     if (!f.isPossible(store.getState().tetris, currentCoords.map(([x, y]) => [x, y+1])) ) {
//       store.dispatch(pieceAnimation(currentCoords))
//     }
//     //console.log('coucou');
//   })
// }

const getPieceAnimationStyle = (coords, opacity) => (x, y) => {
  if (coords.filter(([x1, y1]) => x==x1 && y == y1).length)
    return {opacity}
  return {}
}

export const pieceAnimation = coords => (dispatch, getState) => new Promise(resolve => {
  if (!coords) return resolve();
  let opacity = 1;
  let step = -0.05;
  const loop = () => {
    if (opacity <= 0.5)
      step = -step
    opacity += step
    if (opacity <= 1) {
      dispatch(animationStep(getPieceAnimationStyle(coords, opacity)))
      requestAnimationFrame(loop)
    } else {
      resolve()
    }
  }
  requestAnimationFrame(loop)
})

const getLineAnimationStyle = (lines, opacity, b) => (x, y) => {
  if (lines.indexOf(y) !== -1) return {opacity, filter: `brightness(${b}%)`}
  return {}
}

export const lineAnimation = (lines) => (dispatch, getState) => new Promise(resolve => {
  if (!lines.length) return resolve()
  let opacity = 1;
  let nb = 1 / 0.05
  let b = 90;
  let bi = 90 / nb;
  const loop = () => {
    opacity -= 0.05
    b -= bi
    if (opacity >= 0) {
      dispatch(animationStep(getLineAnimationStyle(lines, opacity, b)))
      requestAnimationFrame(loop)
    } else {
      //dispatch(animationOver())
      resolve()
    }
  }
  requestAnimationFrame(loop)
})

export const spaceAnimation = (coords, dest) => (dispatch, getState) => new Promise(resolve => {
  const diff = dest[0][1] - coords[0][1]
  let yi = 0
  const loop = () => {
    yi += 2
    if (yi === diff + 1) yi = diff
    const newCoords = coords.map(([x, y]) => [x, y+yi])
    if (yi <= diff) {
      dispatch(movePiece(newCoords))
      requestAnimationFrame(loop)
    } else resolve()
  }
  requestAnimationFrame(loop)
})


const getTranslateAnimationStyle = (data, yi) => (x, y) => {
  let translateY = data[y]
  if (translateY >= yi) translateY = yi
  return {transform: 'translate(0px, ' +translateY+ 'px)'}
}

const getTranslationData = (tetris, lines) => {
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

export const translateAnimation = (tetris, lines) => (dispatch, getState) => new Promise(resolve => {
  if (!lines.length) return resolve()
  let yi = 0
  const data = getTranslationData(tetris, lines)
  const max = Math.max(...data)
  const loop = () => {
    yi += 25
    if (yi >= max + 1 && yi < max + 25)
      yi = max
    if (yi <= max) {
      dispatch(animationStep(getTranslateAnimationStyle(data, yi)))
      requestAnimationFrame(loop)
    } else {
      //dispatch(animationOver())
      resolve()
    }
  }
  requestAnimationFrame(loop)
})

const animationStep = (getStyle) => {
  return {
    type: types.ANIMATION_STEP,
    getStyle,
  }
}

const animationOver = () => {
  return {
    type: types.ANIMATION_OVER,
  }
}
