import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Room from '../components/room/'
import css from './app.css'



const App = ({ nickname, nicknameError, partyCode, room, roomError, editName, editCode, createRoom, joinRoom, removeError, isLoading}) => {
  if (isLoading) {
    return (
      <div className='appContainer'>
        <div className='connecting'>
          <p>Connecting...</p>
        </div>
      </div>
    )
  }
  return (
    <div className='appContainer'>
      {room !== null ?
      <Room/> :
      <div className='homeContainer'>
        <div className='home'>
          <h1>RED TETRIS</h1>
          <div className='nameContainer'>
            <input id='nickname' className={nicknameError ? 'formError' : ''} placeholder='Nickname' value={nickname} onSelect={removeError('nicknameError')} onChange={editName} autoFocus='autofocus'/>
            <p className='nicknameError'>{nicknameError}</p>
          </div>
          <div className='home-form'>
            <button className='createbutton' onClick={createRoom}>Create a game</button>
            <div className='joinFormContainer'>
              <div className='joinForm'>
                <button className='joinbutton' onClick={joinRoom}>Join a game</button>
                <input id='partyCode' className={roomError ? 'formError' : ''} value={partyCode} onSelect={removeError('roomError')} placeholder='Party code' onChange={editCode}/>
              </div>
              <p className='roomError'>{roomError}</p>
            </div>
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
    isLoading: state.connecting.isLoading,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
