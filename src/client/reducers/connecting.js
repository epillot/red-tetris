import { updateObject } from '../tools'

const initialState = {
  isLoading: true,
}

export default function connecting(state=initialState, action) {

  switch (action.type) {

    case 'server/CREATE_ROOM':
    case 'server/JOIN_ROOM':
      return updateObject(state, {
        isLoading: true,
      })

    case 'USER_CONNECTED':
      return {
        isLoading: false,
        playerID: action.id,
      }

    case 'UPDATE_ROOM':
    case 'JOIN_ROOM_ERROR':
      return updateObject(state, {
        isLoading: false,
      })

    default:
      return state

  }

}
