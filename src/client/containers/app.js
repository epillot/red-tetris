import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Room from '../components/room/'
import css from './app.css'

const App = ({ nickname, nicknameError, partyCode, room, roomError, editName, editCode, createRoom, joinRoom, removeError, isLoading, roomLoading}) => {
  if (isLoading || roomLoading) {
    return (
      <div className='appContainer'>
       <h1>Red Tetris</h1>
        <div className='connecting'>
          Connecting...
        </div>
      </div>
    )
  }
  return (
    <div className='appContainer'>
      {room !== null ?
      <Room/> :
      <div className='grid-container'>
      <div className='test'>
      <div className='main-container'>

          <h1>Red Tetris</h1>
          <div className='loginForm'>
            <input id='nickname' autoComplete="off" className={nicknameError ? 'formError' : ''} placeholder='Login' value={nickname} onSelect={removeError('nicknameError')} onChange={editName} autoFocus='autofocus'/>

                <input id='partyCode' autoComplete="off" className={roomError ? 'formError' : ''} value={partyCode} onSelect={removeError('roomError')} placeholder='Game code' onChange={editCode}/>


              </div>
            <button onClick={createRoom}>Start game</button>


                <button  onClick={joinRoom}>Join game</button>


                </div>
      </div>
      </div>}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    createRoom: () => dispatch((_, getState) => {
      const { nickname } = getState().ui
      if (!nickname) dispatch(actions.nicknameError())
      else dispatch(actions.server.createRoom(nickname))
    }),
    joinRoom: () => dispatch((_, getState) => {
      const { nickname, partyCode } = getState().ui
      if (!nickname) dispatch(actions.nicknameError())
      else dispatch(actions.server.joinRoom(partyCode, nickname))
    }),
    editName: (e) => {
      dispatch(actions.editName(e.target.value))
    },
    editCode: (e) => {
      dispatch(actions.editCode(e.target.value))
    },
    removeError: (name) => () => {
      dispatch(actions.removeError(name))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    nickname: state.ui.nickname,
    nicknameError: state.ui.nicknameError,
    partyCode: state.ui.partyCode,
    room: state.room,
    roomError: state.ui.roomError,
    isLoading: state.connecting.playerID === undefined,
    roomLoading: state.connecting.roomLoading,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
