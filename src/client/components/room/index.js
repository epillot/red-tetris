import React from 'react'
import { connect } from 'react-redux'
import Board from '../board/'
import RoomPlayers from '../roomPlayers/'
import PlayerGhost from '../playerGhost'
import * as actions from '../../actions'

import './style.css'

// const TetrisGhost=

const room = ({ roomId, isMaster, startGame }) => (
  <div className='roomContainer'>

    <div className='roomSide roomSideLeft'>
      <div className='roomSideTop'>
        <p><span>Party code: </span><span className='roomId'>{roomId}</span></p>
        <p className='codeHint'>Share this code with your friends !</p>
      </div>
      <div className='roomSideMiddle'>

        <RoomPlayers/>

      </div>
      <div className='roomSideBottom'>
        {isMaster
          ? <button className='startbutton' onClick={startGame}>Start game</button>
          : <p className='waitingMaster'>Waiting for the master to start the game...</p>}
      </div>
    </div>

    <Board/>

    <div className='roomSide roomSideRight'>

      <div className='row'>
        <PlayerGhost/>
        <PlayerGhost/>
      </div>

      <div className='row'>
        <PlayerGhost/>
        <PlayerGhost/>
      </div>

    </div>

  </div>
)

const mapStateToProps = (state) => {
  return {
    roomId: state.room.id,
    isMaster: state.playerID === state.room.master.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: () => {
      dispatch(actions.server.startGame())
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

export default connect(mapStateToProps, mapDispatchToProps)(room)
