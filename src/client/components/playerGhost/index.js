import React from 'react'
import { connect } from 'react-redux'
import './style.css'

const getBoardClassName = ghost => {
  let boardClass = 'boardGhost'
  if (!ghost) {
    boardClass += ' emptyGhost'
    if (ghost === null)
      boardClass += ' waitingGhost'
    else
      boardClass += ' readyGhost'
  } else
    boardClass += ' plainGhost'
  return boardClass
}

const playerGhost = ({ name, ghost, num }) => console.log(`-------${name || num} ghost is rendered----------`) || (
  <div className='ghostContainer'>
    <span className='ghostPlayerName'>{name}</span>
    <div className={getBoardClassName(ghost)}>
       {ghost === null && <p>Waiting for player</p>}
       {ghost === undefined && <p>READY</p>}
       {ghost && ghost.map((col, i) => col.map((c, j) => (
         <div key={`${i}${j}`} className={'blockGhost' + (c === 'black' ? ' black' : (c ? ' plain' : ''))}></div>
      )))}
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  const user = state.room.users.filter(user => user.id !== state.playerID)[ownProps.num]
  return {
    name: user ? user.name : '',
    ghost: user ? state.playersGhosts[user.id] : null
  }
}

export default connect(mapStateToProps, null)(playerGhost)
