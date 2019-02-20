import { updateObject } from '../tools'

const initialState = {
  nickname: '',
  nicknameError: '',
  roomError: '',
  partyCode: '',
}

export default function ui(state=initialState, action) {

  switch (action.type) {

    case 'EDIT_NAME':
      return updateObject(state, {nickname: action.value.trim().substr(0, 15).trim()})

    case 'EDIT_CODE':
      return updateObject(state, {partyCode: action.value.trim().substr(0, 5).trim()})

    case 'NICKNAME_ERROR':
      return updateObject(state, {
        nicknameError: 'Please enter a nickname',
      })

    case 'JOIN_ROOM_ERROR':
      return updateObject(state, {
        roomError: action.error,
      })

    case 'REMOVE_ERROR':
      return updateObject(state, {
        [action.name]: '',
      })

    default:
      return state

  }

}
