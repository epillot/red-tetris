import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Board from '../components/board/'
import css from './app.css'

const App = ({ tetris, startGame, hash, nickname, editName }) => {
  return (
    <div className='appContainer'>
      {tetris !== null ?
      <Board/> :
      <div className='homeContainer'>
        <div className='home'>
          <h1>RED TETRIS</h1>
          <input id='nickname' placeholder='Nickname' value={nickname} onChange={editName} autoFocus='autofocus'/>
          <div className='home-form'>
            <button className='createbutton' onClick={startGame}>Créer une partie</button>
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
      dispatch(actions.startGame())
      dispatch(actions.newPiece())
    },
    createRoom: () => {
      dispatch(actions.createRoom())
    },
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
