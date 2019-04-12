import chai from "chai"
import * as tools from '../src/client/tools'
import * as animationsTools from '../src/client/tools/animations'
import * as reducersTools from '../src/client/tools/reducers'

const should = chai.should()


describe('Tools', () => {

  describe('updateObject', () => {
    const obj = {foo: 'bar'}
    let newObj
    it('create a new object', () => {
      newObj = tools.updateObject(obj, {})
      newObj.should.be.not.equal(obj)
    })
    it('update/create existing/new fields', () => {
      newObj = tools.updateObject(obj, {foo: 'not bar', foo2: 'bar2'})
      newObj.should.have.property('foo', 'not bar')
      newObj.should.have.property('foo2', 'bar2')
    })
  })

  describe('isPossible', () => {
    const tetris = [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', 'red', '', ''],
      ['', 'red', 'red', 'red', ''],
    ]
    it('returns true when tetris is null or undefined', () => {
      let res = tools.isPossible(null)
      res.should.be.true
      res = tools.isPossible(undefined)
      res.should.be.true
    })
    it('returns true when the given coords are empty on the given tetris', () => {
      const res = tools.isPossible(tetris, [[0, 1], [0, 2], [0, 3], [0, 4]])
      res.should.be.true
    })
    it('returns false otherwise', () => {
      const res = tools.isPossible(tetris, [[1, 1], [1, 2], [1, 3], [1, 4]])
      res.should.be.false
    })
  })

  describe('isEmpty', () => {
    it('returns true when a line is empty', () => {
      const res = tools.isEmpty(['', '', '',])
      res.should.be.true
    })
    it('returns false otherwise', () => {
      const res = tools.isEmpty(['', 'red', ''])
      res.should.be.false
    })
  })

  describe('isComplete', () => {
    it('returns false when a line has black blocks', () => {
      const res = tools.isComplete(['black', 'black', 'black',])
      res.should.be.false
    })
    it('returns true when a line is complete', () => {
      const res = tools.isComplete(['red', 'red', 'red',])
      res.should.be.true
    })
    it('returns false otherwise', () => {
      const res = tools.isComplete(['red', 'red', ''])
      res.should.be.false
    })
  })

  describe('getCompleteLines', () => {
    it('returns an empty array if the given tetris does not have complete line', () => {
      const res = tools.getCompleteLines([['', '', '']])
      res.should.be.an('array').that.is.empty
    })
    it('returns an array containing each index of each complete lines in the given tetris', () => {
      const tetris = [
        ['', 'red', 'red', 'red', 'red'],
        ['red', 'red', 'red', 'red', ''],
        ['red', 'red', 'red', 'red', 'red'],
        ['red', '', 'red', 'red', 'red'],
        ['red', 'red', 'red', 'red', 'red'],
        ['black', 'black', 'black', 'black', 'black'],
      ]
      const res = tools.getCompleteLines(tetris)
      res.should.have.members([2, 4])
    })
  })

  describe('getPieceProjection', () => {
    const tetris = [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['red', 'red', '', '', ''],
      ['', 'red', 'red', '', ''],
    ]
    it('return null when the given piece is null or undefined', () => {
      let res = tools.getPieceProjection(tetris, null)
      should.not.exist(res)
      res = tools.getPieceProjection(tetris, undefined)
      should.not.exist(res)
    })
    it('returns the coordinates of the projection of the given piece', () => {
      const piece = {coords: [[0, 0], [1, 0], [2, 0], [2, 1]]}
      const res = tools.getPieceProjection(tetris, piece)
      res.should.have.ordered.deep.members([[0, 2], [1, 2], [2, 2], [2, 3]])
    })
  })

})

describe('Animations tools', () => {

  describe('getPieceAnimationStyle', () => {
    it('return an array of style filled at the right coords', () => {
      const opacity = 0.1
      const coords = [[0,0], [1,0], [2,0], [3,0]]
      const res = animationsTools.getPieceAnimationStyle(coords, opacity)
      res.should.be.an('array')
      coords.forEach(coord => {
        res[coord[0] + coord[1]*10].should.deep.equal({opacity})
      })
    })
  })

  describe('getLineAnimationStyle', () => {
    it('return an array of style filled at the right coords', () => {
      const opacity = 0.1
      const scale = 0.5
      const tetris = [
        ['', 'red', ''],
        ['red', 'red', 'red'],
        ['', '', 'red'],
        ['red', 'red', 'red'],
      ]
      const res = animationsTools.getLineAnimationStyle(tetris, opacity, scale)
      res.should.be.an('array')
      tools.getCompleteLines(tetris).forEach(y => {
        for (let x = 0; x < tetris[0].length; x++) {
          res[x + y*10].should.deep.equal({
            opacity,
            transform: `rotate(${scale*360}deg) scale(${scale})`
          })
        }
      })
    })
  })

  describe('getTranslationData & getTranslateAnimationStyle', () => {
    const tetris = [
      ['', '', ''],
      ['', 'red', ''],
      ['red', 'red', 'red'],
      ['', '', 'red'],
      ['red', 'red', 'red'],
    ]
    const data = animationsTools.getTranslationData(tetris)
    it('getTranslationData', () => {
      data.should.have.ordered.members([0, 80, 0, 40, 0])
    })
    it('getTranslateAnimationStyle', () => {
      const yi = 45
      const res = animationsTools.getTranslateAnimationStyle(tetris, data, yi)
      res.should.be.an('array')
      for (let x = 0; x < tetris[0].length; x++) {
        res[x].should.deep.equal({transform: 'translate(0px, 0px)'})
      }
      for (let x = 0; x < tetris[0].length; x++) {
        res[x + 10].should.deep.equal({transform: 'translate(0px, -45px)'})
      }
      for (let x = 0; x < tetris[0].length; x++) {
        res[x + 30].should.deep.equal({transform: 'translate(0px, -40px)'})
      }
      [2, 4].forEach(y => {
        for (let x = 0; x < tetris[0].length; x++) {
          res[x + y*10].should.deep.equal({opacity: 0})
        }
      })
    })
  })

})

describe('Reducer tools', () => {

  describe('movePiece', () => {
    const piece = {
      coords: [[0, 0], [0, 1], [0, 2], [0, 3]],
      rotate: 0,
    }
    const coords = [[0, 1], [0, 2], [0, 3], [0, 4]]
    it('returns a new objects updated with the given coords and the given rotate', () => {
      const rotate = 1
      const res = reducersTools.movePiece(piece, {coords, rotate})
      res.should.not.equal(piece)
      res.should.have.property('coords').which.have.deep.ordered.members(coords)
      res.should.have.property('rotate').which.is.equal(rotate)
    })

    it('does not upate the rotate if the give rotate is null', () => {
      const res = reducersTools.movePiece(piece, {coords, rotate:null})
      res.should.have.property('rotate').which.is.equal(piece.rotate)
    })
  })

  describe('newTetris', () => {
    it('return a new 2d array with a length of 20 * 10 containing only empty blocks', () => {
      const res = reducersTools.newTetris()
      res.should.be.an('array').which.have.lengthOf(20)
      res.forEach(line => {
        line.should.be.an('array').which.have.lengthOf(10)
        line.forEach(block => {
          block.should.be.equal('')
        })
      })
    })
  })

  describe('blackLines', () => {
    let tetris = reducersTools.newTetris()
    const piece = {
      coords: [[0, 0], [0, 1], [0, 2], [0, 3]],
      rotate: 0,
    }
    it('update the piece coordinates to increase the position of the piece if the max Y of the piece is greater than the start Y (i.e tetris.length-20) of the tetris', () => {
      const nbLines = 2
      const res = reducersTools.blackLines(piece, {tetris, nbLines})
      res.should.have.property('coords').which.have.deep.ordered.members(piece.coords.map(([x, y]) =>[x, y-nbLines]))
    })
    it('does not increase the position of the piece more than startY - 1', () => {
      const nbLines = 5
      const res = reducersTools.blackLines(piece, {tetris, nbLines})
      res.should.have.property('coords').which.have.deep.ordered.members(piece.coords.map(([x, y]) =>[x, y-4]))
    })
    it('decrease the position of the piece if the maxY is lower than the start Y due to an increase of the tetris length', () => {
      tetris = tetris.concat([
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
      ])
      const nbLines = 4
      const res = reducersTools.blackLines(piece, {tetris, nbLines})
      res.should.have.property('coords').which.have.deep.ordered.members(piece.coords.map(([x, y]) =>[x, y+1]))
    })
  })

  describe('getPlayersGhosts', () => {
    const playersGhosts = {
      1: {},
      2: {},
      3: {},
      4: {},
    }
    const room = {
      users: [
        {
          id: '1',
          ghost: {},
        },
        {
          id: '2',
          ghost: {},
        },
        {
          id: '3',
          ghost: {},
        },
        {
          id: '4',
          ghost: {},
        },
      ]
    }
    let res = reducersTools.getPlayersGhosts(playersGhosts, {room})
    it('return a new objects', () => {
      res.should.not.equal(playersGhosts)
    })
    room.users[3].id = '5'
    res = reducersTools.getPlayersGhosts(playersGhosts, {room})
    it('delete the keys in the playersGhost output that are missing in the users array', () => {
      res.should.not.have.property('4')
    })
    it('add the keys of the users array int the players ghost output if they are missing', () => {
      res.should.have.property('5')
    })
  })
})
