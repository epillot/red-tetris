import React from 'react'
import { connect } from 'react-redux'
import Block from '../block/'
import './style.css'

const getBlocks = (len) => {
  const output = []
  for (let i = 0; i < len*10; i++) {
    output.push(<Block key={i} x={9 - Math.floor(i % 10)} y={len-1 - Math.floor(i / 10)} />)
  }
  return output
}

const board = ({ timer, gameOver, win, len }) => (
  <div className='boardWrapper'>
    <div className='board-container'>
      {timer && <div className='timer'>{timer}</div>}
      {gameOver && <span className='gameOver'>GAME OVER</span>}
      {win && <span className='gameOver'>YOU WIN !</span>}
    </div>
    <div className={'board' + (gameOver || win ? ' boardGameOver' : '')}>
      {!timer && getBlocks(len)}
    </div>
  </div>
)

const mapStateToProps = (state) => {
  const self = state.roomUsers.find(user => user.id === state.connecting.playerID)
  return {
    len: state.tetris ? state.tetris.length : 0,
    timer: state.game.timer,
    gameOver: self.gameOver,
    win: self.win,
  }
}

export default connect(mapStateToProps, null)(board)
