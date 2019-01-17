import React from 'react'
import { connect } from 'react-redux'
import Board from '../board/'
import RoomPlayers from '../roomPlayers/'
import * as actions from '../../actions'

import './style.css'

const room = ({ room, startGame }) => (
  <div className='roomContainer'>
    <div className='roomSide'>
      <div className='roomSideTop'>
        <p><span>Party code: </span><span className='roomId'>{room.id}</span></p>
        <p className='codeHint'>Share this code with your friends !</p>
      </div>
      <div className='roomSideMiddle'>
        <RoomPlayers/>
      </div>
      <div className='roomSideBottom'>
        <button className='' onClick={startGame}>Start game</button>
      </div>
    </div>
    <Board/>
    <div className='roomSide'></div>
  </div>
)

const mapStateToProps = (state) => {
  return {
    room: state.room,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: () => {
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

export default connect(mapStateToProps, mapDispatchToProps)(room)