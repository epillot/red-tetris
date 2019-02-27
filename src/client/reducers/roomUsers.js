import { updateObject } from '../tools'

const updateUsers = (state, action, update) => {
  return state.map(user => updateObject(user, update))
}

export default function roomUsers(state=[], action) {

  switch (action.type) {

    case 'UPDATE_ROOM':
      return action.room.users

    case 'BEGIN_GAME':
      return updateUsers(state, action, {isPlaying: true})

    default:
      return state

  }

}
