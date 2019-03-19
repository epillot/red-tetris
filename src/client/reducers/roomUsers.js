import { updateObject } from '../tools'

export default function roomUsers(state=[], action) {

  switch (action.type) {

    case 'UPDATE_ROOM':
      return action.room.users

    default:
      return state

  }

}
