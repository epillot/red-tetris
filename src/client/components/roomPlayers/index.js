import React from 'react'
import { connect } from 'react-redux'
import './style.css'


const PlayerRow = props => (
  props.player ?
  <ActivePlayer player={props.player} num={props.num} isMaster={props.player.id === props.master.id}/> :
  <EmptyPlayer num={props.num}/>
)

const ActivePlayer = props => (
  <tr className='playerRow'>
    <td className='playerNum'>{props.num}</td>
    <td className='playerName'>{props.player.name + (props.isMaster ? ' (master)' : '')}</td>
  </tr>
)

const EmptyPlayer = props => (
  <tr className='emptyRow'>
    <td className='playerNum'>{props.num}</td>
    <td className='emptyText'>Waiting for player...</td>
  </tr>
)

const roomPlayers = ({ master, players }) => (
  <div className='roomPlayers'>
    <table>
      <tbody>
        {[1, 2, 3, 4, 5].map(num =>
          <PlayerRow
            player={players[num-1]}
            master={master}
            num={num}
            key={num}
          />
        )}
      </tbody>
    </table>
  </div>
)

const mapStateToProps = (state) => {
  return {
    master: state.room.master,
    players: state.room.users,
  }
}

export default connect(mapStateToProps, null)(roomPlayers)
