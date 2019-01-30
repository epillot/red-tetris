import React from 'react'
import { connect } from 'react-redux'
import './style.css'

const playerGhost = ({ name, ghost, num }) => console.log(`-------${name || num} ghost is rendered----------`) || (
  <div className='ghostContainer'>
    <span className='ghostPlayerName'>{name}</span>
    <div className='boardGhost'>
       {ghost === null && <p>waiting for player</p>}
       {ghost === undefined && <p>READY</p>}
       {ghost && ghost.map((col, i) => col.map((c, j) => (
         <div key={`${i}${j}`} className={'blockGhost' + (c ? ' plain' : '')}></div>
      )))}
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  const user = state.room.users.filter(user => user.id !== state.playerID)[ownProps.num]
  return {
    name: user ? user.name : '',
    ghost: user ? user.tetris : null
  }
}

export default connect(mapStateToProps, null)(playerGhost)
