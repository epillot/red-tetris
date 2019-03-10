import React from 'react'
import { connect } from 'react-redux'
import './style.css'

const getBoardClassName = (ghost, isPlaying, gameOver, win) => {
  let boardClass = 'boardGhost'
  if (ghost === null)
    boardClass += ' waitingGhost'
  if (ghost === undefined && !isPlaying)
    boardClass += ' readyGhost'
  if (gameOver || win)
    boardClass += ' boardGhostGameEnded'
  return boardClass
}

const playerGhost = ({ name, ghost, num, isPlaying, gameOver, win }) => console.log(`-------${name || num} ghost is rendered----------`) || (
  <div className='ghostWrapper'>
  <div className='ghostContainer'>
    <span className='ghostPlayerName'>{name}</span>
    <div className={getBoardClassName(ghost, isPlaying, gameOver, win)}>
      {ghost && ghost.map((col, i) => col.map((c, j) => (
        <div key={`${i}${j}`} className={'blockGhost' + (c === 'black' ? ' black' : (c ? ' plain' : ''))}></div>
      )))}
      <div className='wrapper'>
        {ghost === undefined && !isPlaying && <p>READY</p>}
        {ghost === null && <p>Waiting for player</p>}
        {gameOver && <i className='material-icons md-48 md-dark'>sentiment_very_dissatisfied</i>}
        {win && <i className='material-icons md-48 md-dark'>sentiment_very_satisfied</i>}
      </div>
    </div>
  </div>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  const user = state.roomUsers.filter(user => user.id !== state.connecting.playerID)[ownProps.num]
  // if (ownProps.num == 0)
  //   return {
  //     name: 'test',
  //     ghost: undefined,
  //     isPlaying: true,
  //     gameOver: true,
  //   }
  return {
    name: user ? user.name : '',
    ghost: user ? state.playersGhosts[user.id] : null,
    isPlaying: user ? user.isPlaying : false,
    gameOver: user ? user.gameOver : false,
    win: user ? user.win : false,
  }
}

export default connect(mapStateToProps, null)(playerGhost)
