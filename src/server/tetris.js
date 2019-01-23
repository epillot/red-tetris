class Tetris {

  getTetriminos(name) {
    //square
    if (name === 'square') return {
      coords: [[0, -1], [0, 0], [1, -1], [1, 0]],
      rotate: 0,
      color: 'red',
      type: 'square',
    }
    //T
    if (name === 'T') return {
      coords: [[0, -1], [0, 0], [-1, 0], [1, 0]],
      rotate: 0,
      color: 'blue',
      type: 'T',
    }
    //L
    if (name === 'L') return {
      coords: [[0, -2], [0, -1], [0, 0], [1, 0]],
      rotate: 0,
      color: 'yellow',
      type: 'L',
    }
    //reverse L
    if (name === 'revL') return {
      coords: [[0, 0], [0, -1], [0, -2], [1, -2]],
      rotate: 0,
      color: 'green',
      type: 'revL',
    }
    //ligne
    if (name === 'line') return {
      coords: [[0, -3], [0, -2], [0, -1], [0, 0]],
      rotate: 0,
      color: 'purple',
      type: 'line',
    }
    //Z
    if (name === 'Z') return {
      coords: [[1, -1], [0, -1], [0, 0], [-1, 0]],
      rotate: 0,
      color: 'pink',
      type: 'Z',
    }
    //reverse Z
    if (name === 'revZ') return {
      coords: [[-1, -1], [0, -1], [0, 0], [1, 0]],
      rotate: 0,
      color: 'orange',
      type: 'revZ',
    }
  }

  newTetriminos() {
    const items = ['line', 'L', 'revL', 'Z', 'revZ', 'T', 'square']
    let name = items[Math.floor(Math.random()*items.length)]
    const t = this.getTetriminos(name)
    const startx = 4
    for (let i = 0; i < 4; i++) {
      t.coords[i][0] += startx
    }
    return t
  }
}

export default new Tetris()
