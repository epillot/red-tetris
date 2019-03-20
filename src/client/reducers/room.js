import { updateObject } from '../tools'

export default function room(state=null, action) {

  switch (action.type) {

    case 'UPDATE_ROOM':
      return {
        id: action.room.id,
        isPlaying: action.room.isPlaying,
      }

    case 'JOIN_ROOM_ERROR':
      return null

    default:
      return state

  }

}
