import React from 'react'
import { connect } from 'react-redux'
import Board from '../board/'
import PlayerRow from '../playerRow'
import PlayerGhost from '../playerGhost'
import * as actions from '../../actions'

import './style.css'

const room = ({ roomId, isMaster, isPlaying, startGame }) => (
  <div className='roomContainer'>
  <div className='inGameGrid' />
    <div className='roomSide roomSideLeft'>
    <h4>Red Tetris</h4>
      <div className='roomSideTop'>
        Room code: {roomId}
      </div>
      <div className='roomSideMiddle'>

        <div className='roomPlayers'>
          <div>
            <div>
              {[1, 2, 3, 4, 5].map(num =>
                <PlayerRow
                  num={num}
                  key={num}
                />
              )}
            </div>
          </div>
        </div>

      </div>
      <div className='roomSideBottom'>
        {!isPlaying && (isMaster
          ? <button className='startGame' onClick={startGame}>Start game</button>
          : <p className='waitingMaster'>Waiting for the master to start the game...</p>)}
        {isPlaying && <p className='waitingMaster'>A game is in progress !</p>}
      </div>
    </div>

    <Board/>

    <div className='roomSide roomSideRight'>

      <div className='row'>
        <PlayerGhost num={0}/>
        <PlayerGhost num={1}/>
      </div>

      <div className='row'>
        <PlayerGhost num={2}/>
        <PlayerGhost num={3}/>
      </div>

    </div>

  </div>
)

const mapStateToProps = (state) => {
  return {
    roomId: state.room.id,
    isMaster: state.roomUsers[0].id === state.connecting.playerID,
    isPlaying: state.room.isPlaying
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: () => {
      dispatch(actions.server.startGame())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(room)
