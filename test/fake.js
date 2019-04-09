import chai from "chai"
import * as tools from '../src/client/tools'
import * as animationsTools from '../src/client/tools/animations'

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
    it('return an array of style with the given opacity', () => {
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

  })
})
