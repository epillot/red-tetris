import React from 'react'
import { connect } from 'react-redux'
import './style.css'

const getBoardClassName = (ghost, isPlaying) => {
  let boardClass = 'boardGhost'
  if (ghost === null)
    boardClass += ' waitingGhost'
  if (ghost === undefined && !isPlaying)
    boardClass += ' readyGhost'
  return boardClass
}

const playerGhost = ({ name, ghost, num, isPlaying }) => console.log(`-------${name || num} ghost is rendered----------`) || (
  <div className='ghostContainer'>
    <span className='ghostPlayerName'>{name}</span>
    <div className={getBoardClassName(ghost, isPlaying)}>
      {ghost && ghost.map((col, i) => col.map((c, j) => (
        <div key={`${i}${j}`} className={'blockGhost' + (c === 'black' ? ' black' : (c ? ' plain' : ''))}></div>
      )))}
      <div className='wrapper'>
        {ghost === undefined && !isPlaying && <p>READY</p>}
        {ghost === null && <p>Waiting for player</p>}
      </div>
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  const user = state.room.users.filter(user => user.id !== state.connecting.playerID)[ownProps.num]
  return {
    name: user ? user.name : '',
    ghost: user ? state.playersGhosts[user.id] : null,
    isPlaying: state.game.isPlaying
  }
}

export default connect(mapStateToProps, null)(playerGhost)
