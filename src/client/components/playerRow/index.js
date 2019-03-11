import React from 'react'
import { connect } from 'react-redux'
import './style.css'


const PlayerRow = ({ isEmpty, playerName, playerID, selfId, num }) => (
  !isEmpty ?
  <ActivePlayer
    name={playerName}
    num={num}
    isMaster={num === 1}
    isSelf={playerID === selfId}
  /> :
  <EmptyPlayer num={num}/>
)

const ActivePlayer = props => (
  <div className={'playerRow' + (props.isSelf ? ' selfRow' : '')}>
    <div className='playerNum'>{props.num}</div>
    <div className='playerName'>{props.name + (props.isMaster ? ' (master)' : '')}</div>
  </div>
)

const EmptyPlayer = props => (
  <div className='emptyRow'>
    <div className='playerNum'>{props.num}</div>
    <div className='emptyText'>Waiting for player...</div>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  const player = state.roomUsers[ownProps.num - 1]
  return {
    isEmpty: player === undefined,
    playerName: player ? player.name : '',
    playerID: player ? player.id : '',
    selfId: state.connecting.playerID,
  }
}

export default connect(mapStateToProps, null)(PlayerRow)
