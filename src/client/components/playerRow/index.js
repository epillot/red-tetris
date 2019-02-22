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
  <tr className={'playerRow' + (props.isSelf ? ' selfRow' : '')}>
    <td className='playerNum'>{props.num}</td>
    <td className='playerName'>{props.name + (props.isMaster ? ' (master)' : '')}</td>
  </tr>
)

const EmptyPlayer = props => (
  <tr className='emptyRow'>
    <td className='playerNum'>{props.num}</td>
    <td className='emptyText'>Waiting for player...</td>
  </tr>
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
