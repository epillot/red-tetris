import { updateObject } from '../tools'

const updateUsers = (state, action) => {
  return state.map(user => updateObject(user, {isPlaying: true}))
}

export default function roomUsers(state=[], action) {

  switch (action.type) {

    case 'UPDATE_ROOM':
      return action.room.users

    case 'UPDATE_TIMER':
      return updateUsers(state, action)

    default:
      return state

  }

}
