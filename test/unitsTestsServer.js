import chai from "chai"
import Game from '../src/server/game'
import User from '../src/server/user'
import Tetris from '../src/server/tetris'
import Room from '../src/server/room'


const should = chai.should()

describe('Class Tetris', () => {
  describe('getTetriminos', () => {
    it('return a tetriminos depending on the given name', () => {
      let res = Tetris.getTetriminos('square')
      res.should.deep.equal({
        coords: [[0, -1], [0, 0], [1, -1], [1, 0]],
        rotate: 0,
        color: 'red',
        type: 'square',
      })

      res = Tetris.getTetriminos('T')
      res.should.deep.equal({
        coords: [[0, -1], [0, 0], [-1, 0], [1, 0]],
        rotate: 0,
        color: 'blue',
        type: 'T',
      })

      res = Tetris.getTetriminos('L')
      res.should.deep.equal({
        coords: [[0, -2], [0, -1], [0, 0], [1, 0]],
        rotate: 0,
        color: 'yellow',
        type: 'L',
      })

      res = Tetris.getTetriminos('revL')
      res.should.deep.equal({
        coords: [[0, 0], [0, -1], [0, -2], [1, -2]],
        rotate: 0,
        color: 'green',
        type: 'revL',
      })

      res = Tetris.getTetriminos('line')
      res.should.deep.equal({
        coords: [[0, -3], [0, -2], [0, -1], [0, 0]],
        rotate: 0,
        color: 'purple',
        type: 'line',
      })

      res = Tetris.getTetriminos('Z')
      res.should.deep.equal({
        coords: [[1, -1], [0, -1], [0, 0], [-1, 0]],
        rotate: 0,
        color: 'pink',
        type: 'Z',
      })

      res = Tetris.getTetriminos('revZ')
      res.should.deep.equal({
        coords: [[-1, -1], [0, -1], [0, 0], [1, 0]],
        rotate: 0,
        color: 'orange',
        type: 'revZ',
      })

      res = Tetris.getTetriminos('')
      should.not.exist(res)
    })
  })

  describe('newTetriminos', () => {
    it('return a random tetriminos with the coordinates updated to start at the middle of the tetris', () => {
      const res = Tetris.newTetriminos()
      const expected = Tetris.getTetriminos(res.type)
      res.should.have.property('coords').which.have.deep.ordered.members(expected.coords.map(([x, y]) => [x + 4, y]))
    })
  })
})

const getFakeSocket = id => {
  return {
    id,
    join: () => this,
    leave: () => this,
    to: () => this,
    emit: () => {},
  }
}

const getFakeUser = id => new User(getFakeSocket(id))

describe('Class User', () => {
  const id = '1234'
  const user = getFakeUser(id)
  it('instanciate a new user', () => {
    user.should.have.property('id', id)
  })
})

describe('Class Room', () => {
  const id = '789'
  const room = new Room(id)
  describe('constructor', () => {
    it('instanciate a new room', () => {
      room.should.deep.equal({
        id,
        users: [],
        pieces: [],
        isPlaying: false,
      })
    })
  })

  describe('addUser', () => {
    it('add a user to the room and return true on success, false otherwise', () => {
      const room = new Room('123')
      let res = room.addUser(getFakeUser('123'))
      res.should.be.true
      room.addUser(getFakeUser('234'))
      room.addUser(getFakeUser('345'))
      room.addUser(getFakeUser('456'))
      room.addUser(getFakeUser('567'))
      res = room.addUser(getFakeUser('678'))
      res.should.be.false
    })
  })

  describe('removeUser', () => {
    it('remove a user from the room and set the property isPlaying to false if there is no user which are playing', () => {
      const room = new Room('123')
      room.isPlaying = true
      const user = getFakeUser('123')
      user.isPlaying= true
      room.addUser(user)
      const user2 = getFakeUser('234')
      room.addUser(user2)
      room.removeUser(user2)
      room.should.have.property('isPlaying').which.is.true
      room.removeUser(user)
      room.should.have.property('isPlaying').which.is.false
    })
  })

  describe('initGame', () => {
    it('push 3 new tetriminos in the pieces array', () => {
      const room = new Room('123')
      room.initGame()
      room.should.have.property('pieces').which.have.lengthOf(3)
    })
  })

  describe('checkWinner', () => {
    it('set the property win to true of the last user left', () => {
      const room = new Room('123')
      room.isPlaying = true
      const user = getFakeUser('123')
      user.isPlaying = true
      user.gameOver = true
      room.addUser(user)
      room.checkWinner()
      room.should.have.property('isPlaying').which.is.false

      room.isPlaying = true
      const user2 = getFakeUser('234')
      user2.isPlaying = true
      room.addUser(user2)
      room.checkWinner()
      room.should.have.property('isPlaying').which.is.false
      user2.should.have.property('win').which.is.true

      room.isPlaying = true
      user.gameOver = false
      room.checkWinner()
      room.should.have.property('isPlaying').which.is.true
    })
  })
})

// describe('Class Game', () => {
//   it('is instanciate with an empty array of rooms', () => {
//     Game.should.have.property('rooms').which.is.an('array').which.is.empty
//   })
// })
