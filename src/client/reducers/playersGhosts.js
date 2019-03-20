import { updateObject } from '../tools'

const getPlayersGhosts = (state, { room }) => {
  const output = Object.assign({}, state)
  const users = room.users

  Object.keys(output).forEach(id => {
    if (!users.find(user => user.id === id))
      delete output[id]
  })

  users.forEach(user => {
    if (!output[user.id])
      output[user.id] = user.ghost
  })
  return output
}

const initGhosts = state => {
  const output = Object.assign({}, state)
  Object.keys(output).forEach(id => {
    output[id] = undefined
  })
  return output
}

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
