import { updateObject } from '../tools'
import { getPlayersGhosts, initGhosts } from '../tools/reducers'

export default function playersGhosts(state={}, action) {

  switch (action.type) {

    case 'UPDATE_ROOM':
      return getPlayersGhosts(state, action)

    case 'UPDATE_GHOST':
      return updateObject(state, {
        [action.id]: action.ghost,
      })

    case 'BEGIN_GAME':
      return initGhosts(state)

    default:
      return state

  }

}
