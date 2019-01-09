import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Room from '../components/room/'
import css from './app.css'

const App = ({ nickname, nicknameError, partyCode, room, editName, editCode, createRoom, joinRoom}) => {
  return (
    <div className='appContainer'>
      {room !== null ?
      <Room/> :
      <div className='homeContainer'>
        <div className='home'>
          <h1>RED TETRIS</h1>
          <div className='nameContainer'>
            <input id='nickname' className={nicknameError ? 'formError' : ''} placeholder='Nickname' value={nickname} onChange={editName} autoFocus='autofocus'/>
            <p className='nicknameError'>{nicknameError}</p>
          </div>
          <div className='home-form'>
            <button className='createbutton' onClick={createRoom}>Create a game</button>
            <div className='joinForm'>
              <button className='joinbutton' onClick={joinRoom}>Join a game</button>
              <input id='partyCode' value={partyCode} placeholder='Party code' onChange={editCode}/>
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
      const { nickname } = getState()
      if (!nickname) dispatch(actions.nicknameError())
      else dispatch(actions.server.createRoom(nickname))
    }),
    joinRoom: () => dispatch((_, getState) => {
      const { nickname, partyCode } = getState()
      if (!nickname) dispatch(actions.nicknameError())
      else dispatch(actions.server.joinRoom(partyCode, nickname))
    }),
    editName: (e) => {
      dispatch(actions.editName(e.target.value))
    },
    editCode: (e) => {
      dispatch(actions.editCode(e.target.value))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    nickname: state.nickname,
    nicknameError: state.nicknameError,
    partyCode: state.partyCode,
    room: state.room,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
