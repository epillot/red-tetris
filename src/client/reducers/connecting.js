import { updateObject } from '../tools'

const initialState = {
  isLoading: false,
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

    case 'CONNECTING':
      return updateObject(state, {
        isLoading: action.connecting,
      })

    default:
      return state

  }

}
