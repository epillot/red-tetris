import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import chai from "chai"
import { animationMiddleWare } from '../src/client/middleware/animationMiddleWare'
import rootReducer from '../src/client/reducers'
import { movePiece } from '../src/client/actions/piece'
import * as serverActions from '../src/client/actions/server'
import * as tetrisActions from '../src/client/actions/tetris'
import * as uiActions from '../src/client/actions/ui'
import * as animationsActions from '../src/client/actions/animations'
import * as tools from '../src/client/tools'

const should = chai.should()

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)

// describe('Fake redux test', function(){
//   it('alert it', function(done){
//     const initialState = {}
//     const store =  configureStore(rootReducer, null, initialState, {
//       ALERT_POP: ({dispatch, getState}) =>  {
//         const state = getState()
//         state.message.should.equal(MESSAGE)
//         done()
//       }
//     })
//     // store.dispatch(alert(MESSAGE))
//   })
//
// })

// it('Piece reducer', done => {
//   const piece = tools.newTetriminos()
//   const initialState = {piece}
//   const coords = [[0, 0], [0, 1], [0, 2], [0, 3]]
//   const rotate = 1
//   const store = configureStore(rootReducer, null, initialState, {
//     MOVE_PIECE: ({ dispatch, getState }) => {
//       getState().piece.coords.should.have.deep.members(coords)
//       getState().piece.rotate.should.equal(1)
//       done()
//     }
//   })
//   const action = movePiece(coords, rotate)
//   store.dispatch(action)
// })


describe('Redux actions test', () => {
  describe('Piece actions', () => {
    const store = mockStore({})
    const coords = [[0, 0], [0, 1], [0, 2], [0, 3]]
    const rotate = 1
    store.dispatch(movePiece(coords))
    store.dispatch(movePiece(coords, rotate))
    const actions = store.getActions()
    it('movePiece', () => {
      actions[0].should.deep.equal({
        type: 'MOVE_PIECE',
        coords,
        rotate: null,
      })
      actions[1].should.deep.equal({
        type: 'MOVE_PIECE',
        coords,
        rotate,
      })
    })
  })

  describe('Tetris actions', () => {
    const tetris = [
      ['', 'red', 'red', 'red', 'red'],
      ['red', 'red', 'red', 'red', ''],
      ['red', 'red', 'red', 'red', 'red'],
      ['red', '', 'red', 'red', 'red'],
      ['red', 'red', 'red', 'red', 'red'],
      ['black', 'black', 'black', 'black', 'black'],
    ]
    const piece = []
    const nbLines = 2
    const store = mockStore({tetris})
    store.dispatch(tetrisActions.putPiece(piece))
    store.dispatch(tetrisActions.blackLines(nbLines))
    store.dispatch(tetrisActions.removeLines())
    const actions = store.getActions()
    it('putPiece', () => {
      actions[0].should.deep.equal({
        type: 'PUT_PIECE',
        piece,
      })
    })
    it('blackLines', () => {
      actions[1].should.deep.equal({
        type: 'BLACK_LINES',
        nbLines,
        tetris,
      })
    })
    it('removeLines', () => {
      actions[2].should.deep.equal({
        type: 'REMOVE_LINES',
      })
    })
  })

  describe('Ui actions', () => {
    const store = mockStore({})
    const value = 'toto'
    const name = 'roomError'
    store.dispatch(uiActions.editName(value))
    store.dispatch(uiActions.editCode(value))
    store.dispatch(uiActions.nicknameError())
    store.dispatch(uiActions.removeError(name))
    const actions = store.getActions()
    it('editName', () => {
      actions[0].should.deep.equal({
        type: 'EDIT_NAME',
        value,
      })
    })
    it('editCode', () => {
      actions[1].should.deep.equal({
        type: 'EDIT_CODE',
        value,
      })
    })
    it('nicknameError', () => {
      actions[2].should.deep.equal({
        type: 'NICKNAME_ERROR',
      })
    })
    it('removeError', () => {
      actions[3].should.deep.equal({
        type: 'REMOVE_ERROR',
        name,
      })
    })
  })

  describe('Simple server actions', () => {
    const store = mockStore({})
    const id = '12345'
    const nickname = 'Toto'
    store.dispatch(serverActions.startGame())
    store.dispatch(serverActions.createRoom(nickname))
    store.dispatch(serverActions.joinRoom(id, nickname))
    store.dispatch(serverActions.gameOver())
    const actions = store.getActions()
    it('startGame', () => {
      actions[0].should.deep.equal({
        type: 'server/START_GAME'
      })
    })
    it('createRoom', () => {
      actions[1].should.deep.equal({
        type: 'server/CREATE_ROOM',
        nickname,
      })
    })
    it('joinRoom', () => {
      actions[2].should.deep.equal({
        type: 'server/JOIN_ROOM',
        id,
        nickname,
      })
    })
    it('gameOver', () => [
      actions[3].should.deep.equal({
        type: 'server/GAME_OVER',
      })
    ])
  })

  describe('updateTetris server action', () => {
    const tetris = [
      ['', 'red', 'red', 'red', 'red'],
      ['red', 'red', 'red', 'red', ''],
      ['red', 'red', 'red', 'red', 'red'],
      ['red', '', 'red', 'red', 'red'],
      ['red', 'red', 'red', 'red', 'red'],
      ['black', 'black', 'black', 'black', 'black'],
    ]
    const store = mockStore({tetris})
    store.dispatch(serverActions.updateTetris())
    store.dispatch(serverActions.updateTetris(2, true))
    const actions = store.getActions()
    it('set default value for lines and newPiece', () => {
      actions[0].should.deep.equal({
        type: 'server/UPDATE_TETRIS',
        lines: 0,
        newPiece: false,
        ghost: tools.getGhostData(tetris)
      })
    })
    it('use the value given in parameters otherwise', () => {
      actions[1].should.deep.equal({
        type: 'server/UPDATE_TETRIS',
        lines: 2,
        newPiece: true,
        ghost: tools.getGhostData(tetris)
      })
    })
  })

  describe('Animations actions', () => {
    const store = mockStore({})
    store.dispatch(animationsActions.spaceAnimation())
    store.dispatch(animationsActions.pieceAnimation())
    store.dispatch(animationsActions.disparitionLinesAnimation(2))
    store.dispatch(animationsActions.animationStep([]))
    store.dispatch(animationsActions.disparitionLinesAnimation(0))
    const actions = store.getActions()
    it('spaceAnimation', () => {
      actions[0].should.have.property('isAnimation', true)
      actions[0].should.have.property('nextAction').which.is.a('function')
    })
    it('pieceAnimation', () => {
      actions[1].should.have.property('isAnimation', true)
      actions[1].should.have.property('nextAction').which.is.a('function')
    })
    it('disparitionLinesAnimation', () => {
      actions[2].should.have.property('isAnimation', true)
      actions[2].should.have.property('nextAction').which.is.a('function')

    })
    it('animationStep', () => {
      actions[3].should.deep.equal({
        type: 'ANIMATION_STEP',
        getStyle: [],
      })
    })
    it('disparitionLinesAnimation with a falsy value', () => {
      should.not.exist(actions[4])
    })
  })

})
