import React from 'react'
import { connect } from 'react-redux'
import Board from '../board/'
import './style.css'

const room = props => (
  <div className='roomContainer'>
    <div className='roomSide'></div>
    <Board/>
    <div className='roomSide'></div>
  </div>
)

export default room
