import React from 'react'
import { connect } from 'react-redux'
import './style.css'

const playerGhost = ({ tetris }) => console.log('-------playerGhost is rendered----------') || (
  <div className='ghostContainer'>
    <span className='ghostPlayerName'>lol</span>
    <div className='boardGhost'>
     {tetris.map((col, i) => col.map((c, j) => (
       <div key={`${i}${j}`} className={'blockGhost' + (c ? ' plain' : '')}></div>
     )))
     }
    </div>
  </div>
)

const mapStateToProps = (state) => {
  return {
    tetris: state.tetris
  }
}

export default connect(mapStateToProps, null)(playerGhost)
