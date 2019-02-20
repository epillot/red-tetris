export default function room(state=null, action) {

  switch (action.type) {

    case 'UPDATE_ROOM':
      return action.room

    case 'JOIN_ROOM_ERROR':
      return null

    default:
      return state

  }

}
