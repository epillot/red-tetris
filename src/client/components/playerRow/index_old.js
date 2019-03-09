import React from 'react'
import { connect } from 'react-redux'
import './style.css'


export const PlayerRow = props => console.log('MMMMMMMMMMMM') || (
  props.player ?
  <ActivePlayer
    player={props.player}
    num={props.num}
    isMaster={props.isMaster}
    isSelf={props.isSelf}
  /> :
  <EmptyPlayer num={props.num}/>
)

const ActivePlayer = props => (
  <div className={'playerRow' + (props.isSelf ? ' selfRow' : '')}>
    <div className='playerNum'>{props.num}</div>
    <div className='playerName'>{props.player.name + (props.isMaster ? ' (master)' : '')}</div>
  </div>
)

const EmptyPlayer = props => (
  <div className='emptyRow'>
    <div className='playerNum'>{props.num}</div>
    <div className='emptyText'>Waiting for player...</div>
  </div>
)

const roomPlayers = ({ master, players, playerID }) => (
  <div className='roomPlayers'>
    <div>
      <div>
        {[1, 2, 3, 4, 5].map(num =>
          <PlayerRow
            player={players[num-1]}
            isMaster={players[num-1] && players[num-1].id === master.id}
            isSelf={players[num-1] && players[num-1].id === playerID}
            num={num}
            key={num}
          />
        )}
      </div>
    </div>
  </div>
)

const mapStateToProps = (state) => {
  return {
    master: state.room.master,
    players: state.room.users,
    playerID: state.playerID,
  }
}

export default connect(mapStateToProps, null)(roomPlayers)
