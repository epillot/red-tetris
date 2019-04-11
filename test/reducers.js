import {configureStore} from './helpers/server'
import rootReducer from '../src/client/reducers/piece'
import * as actions from '../src/client/actions'


import chai from "chai"

const should = chai.should()

describe('Reducers tests with actions from client', () => {

  it('Piece reducer', done => {
    const piece = {
      coords: [[0, 0], [0, 1], [1, 0], [1, 1]],
      rotate: 0,
      color: 'red',
      type: 'square',
    }
    const tetris = [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ]
    const initialState = null//, tetris}
    const coords = piece.coords.map(([x, y]) => [x, y+1])
    const rotate = 1
    const interval = 1
    const store = configureStore(rootReducer, null, initialState, {
      NEW_PIECE: ({ dispatch, getState }) => {
        getState().should.deep.equal(piece)
        dispatch(actions.piece.movePiece(coords, rotate))
      },
      MOVE_PIECE: ({ dispatch, getState }) => {
        getState().coords.should.have.deep.ordered.members(coords)
        getState().rotate.should.equal(1)
        dispatch(actions.piece.interval(interval))
      },
      PIECE_INTERVAL: ({ dispatch, getState }) => {
        getState().rotate.should.equal(interval)
        dispatch(actions.tetris.putPiece(piece))
      },
      PUT_PIECE: ({ dispatch, getState }) => {
        should.not.exist(getState())
        done()
      },
    })
    //store.dispatch(actions.piece.movePiece(coords, rotate))
    store.dispatch({type: 'NEW_PIECE', piece})
  })

})
