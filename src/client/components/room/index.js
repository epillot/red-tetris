import React from 'react'
import { connect } from 'react-redux'
import Board from '../board/'
import './style.css'

const room = ({ room }) => (
  <div className='roomContainer'>
    <div className='roomSide'>
      <div className='roomHeader'>
        <p><span>Party code: </span><span className='roomId'>{room}</span></p>
        <p className='codeHint'>Share this code with your friends !</p>
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

export default connect(mapStateToProps, null)(room)
