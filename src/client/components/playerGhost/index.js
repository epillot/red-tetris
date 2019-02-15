import React from 'react'
import { connect } from 'react-redux'
import './style.css'

const getBoardClassName = (ghost, isPlaying) => {
  let boardClass = 'boardGhost'
  if (!ghost) {
    boardClass += ' emptyGhost'
    if (ghost === null)
      boardClass += ' waitingGhost'
    else if (!isPlaying)
      boardClass += ' readyGhost'
  } else
    boardClass += ' plainGhost'
  return boardClass
}

const playerGhost = ({ name, ghost, num, isPlaying }) => console.log(`-------${name || num} ghost is rendered----------`) || (
  <div className='ghostContainer'>
    <span className='ghostPlayerName'>{name}</span>
    // <i className="material-icons">thumb_up</i>
    <div className={getBoardClassName(ghost, isPlaying)}>
       {ghost === null && <p>Waiting for player</p>}
       {ghost === undefined && !isPlaying && <p>READY</p>}
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
    ghost: user ? state.playersGhosts[user.id] : null,
    isPlaying: state.isPlaying
  }
}

export default connect(mapStateToProps, null)(playerGhost)
