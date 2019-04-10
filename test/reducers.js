import {configureStore} from './helpers/server'
import rootReducer from '../src/client/reducers'

import chai from "chai"

const should = chai.should()

describe('Reducers tests with actions from client', () => {

  it('Piece reducer', done => {
    const piece = tools.newTetriminos()
    const initialState = {piece}
    const coords = [[0, 0], [0, 1], [0, 2], [0, 3]]
    const rotate = 1
    const store = configureStore(rootReducer, null, initialState, {
      MOVE_PIECE: ({ dispatch, getState }) => {
        getState().piece.coords.should.have.deep.members(coords)
        getState().piece.rotate.should.equal(1)
        done()
      }
    })
    const action = movePiece(coords, rotate)
    store.dispatch(action)
  })
  
})
