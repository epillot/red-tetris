import React from 'react'
import { connect } from 'react-redux'
import './style.css'

const getBoardClassName = (ghost, isPlaying, gameOver, win) => {
  let boardClass = 'ghostContainer'
  if (ghost === null)
    boardClass += ' waitingGhost'
  if (ghost === undefined && !isPlaying)
    boardClass += ' readyGhost'
  if (gameOver || win)
    boardClass += ' boardGhostGameEnded'
  return boardClass
}

const getGhost = ghost => {
  const output = []
  let x, y, blockclass
  const offset = ghost.length - 20
  for (let i = 0; i < 200; i++) {
    x = Math.floor(i % 10)
    y = offset + Math.floor(i / 10)
    blockclass = 'blockGhost'
    if (y >= ghost.length - ghost.nbLine)
      blockclass += ' black'
    else if (ghost.data[x] !== -1 && y >= ghost.data[x])
      blockclass += ' plain'
    output.push(<div key={i} className={blockclass}></div>)
  }
  return output
}

const playerGhost = ({ name, ghost, num, isPlaying, gameOver, win }) => (
  <div className='ghostWrapper'>
    <div className='ghostPlayerName'>{name}</div>
    <div className={getBoardClassName(ghost, isPlaying, gameOver, win)}>
      {ghost === undefined && !isPlaying && <p>READY</p>}
      {ghost === null && <p>Waiting for player</p>}
      {gameOver && <i className='material-icons md-48 md-blue'>sentiment_very_dissatisfied</i>}
      {win && <i className='material-icons md-48 md-blue'>sentiment_very_satisfied</i>}
    </div>
    <div className='boardGhost'>
      {ghost && getGhost(ghost)}
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  const user = state.roomUsers.filter(user => user.id !== state.connecting.playerID)[ownProps.num]
  return {
    name: user ? user.name : '',
    ghost: user ? state.playersGhosts[user.id] : null,
    isPlaying: user ? user.isPlaying : false,
    gameOver: user ? user.gameOver : false,
    win: user ? user.win : false,
  }
}

export default connect(mapStateToProps, null)(playerGhost)
