import 'babel-polyfill'
import chai from "chai"
import {startServer, configureStore} from './helpers/server'
import rootReducer from '../src/client/reducers'
import io from 'socket.io-client'
import params from '../params'
import * as serverActions from '../src/client/actions/server'

chai.should()

describe('Server test', function() {
  this.timeout(15000);
  let tetrisServer, roomID
  before(cb => startServer( params.server, function(err, server){
    tetrisServer = server
    cb()
  }))

  after(done => {tetrisServer.stop(done)})

  it('Send a \'USER_CONNECTED\' action after a socket connection', done => {
    const initialState = {}
    const socket = io(params.server.url)
    const store =  configureStore(rootReducer, socket, initialState, {
      'USER_CONNECTED': ({ dispatch, getState }) => {
        getState().connecting.playerID.should.equal(socket.id)
        done()
      }
    })
  })

  it('CREATE_ROOM', done => {
    const initialState = {}
    const socket = io(params.server.url)
    const store =  configureStore(rootReducer, socket, initialState, {
      'UPDATE_ROOM': ({ dispatch, getState }) => {
        getState().connecting.roomLoading.should.be.false
        getState().room.should.have.property('id').which.is.a('string').which.have.lengthOf(5)
        roomID = getState().room.id
        getState().room.should.have.property('isPlaying').which.is.false
        getState().roomUsers.should.have.deep.members([{
          name: 'toto',
          id: socket.id,
          isPlaying: false,
        }])
        done()
      }
    })
    store.dispatch(serverActions.createRoom('toto'))
  })

  it('JOIN_ROOM / JOIN_ROOM_ERROR', done => {
    const initialState = {}
    const socket = io(params.server.url)
    const store =  configureStore(rootReducer, socket, initialState, {
      'JOIN_ROOM_ERROR': ({ dispatch, getState }) => {
        getState().connecting.roomLoading.should.be.false
        getState().ui.roomError.should.equal('This room doesn\'t exist')
        dispatch(serverActions.joinRoom(roomID, 'titi'))
      },
      'UPDATE_ROOM': ({ dispatch, getState }) => {
        getState().connecting.roomLoading.should.be.false
        getState().room.should.have.property('id').which.is.a('string').which.have.lengthOf(5)
        getState().room.should.have.property('isPlaying').which.is.false
        getState().roomUsers[1].should.deep.equal({
          name: 'titi',
          id: socket.id,
          isPlaying: false,
        })
        done()
      }
    })
    store.dispatch(serverActions.joinRoom('some wrong roomID', 'titi'))
  })


  it('START_GAME', done => {
    const initialState = {}
    const socket = io(params.server.url)
    const store =  configureStore(rootReducer, socket, initialState, {
      'UPDATE_ROOM': ({ dispatch }) => {
        dispatch(serverActions.startGame())
      },
      'NEW_PIECE': ({ dispatch, getState }) => {
        getState().piece.should.exist
        done()
      }
    })
    store.dispatch(serverActions.createRoom('toto'))
  })
})
