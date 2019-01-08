import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Room from '../components/room/'
import css from './app.css'

const App = ({ tetris, startGame, hash, nickname, nicknameError, editName, createRoom, room }) => {
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
            <button className='createbutton' onClick={createRoom}>Créer une partie</button>
            <button className='startbutton'>Rejoindre une partie</button>
          </div>
        </div>
      </div>}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: () => {
      dispatch(actions.server.startGame())
      dispatch(actions.newPiece())
    },
    createRoom: () => dispatch((_, getState) => {
      const { nickname } = getState()
      if (!nickname) dispatch(actions.nicknamError())
      else dispatch(actions.server.createRoom(nickname))
    }),
    editName: (e) => {
      dispatch(actions.editName(e.target.value))
    },
  }
}

const mapStateToProps = (state) => {
  return {
    tetris: state.tetris,
    nickname: state.nickname,
    room: state.room,
    hash: state.hash,
    nicknameError: state.nicknameError,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
