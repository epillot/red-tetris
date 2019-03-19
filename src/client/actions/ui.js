export const editName = (value) => {
  return {
    type: 'EDIT_NAME',
    value,
  }
}

export const editCode = (value) => {
  return {
    type: 'EDIT_CODE',
    value,
  }
}

export const nicknameError = () => {
  return {
    type: 'NICKNAME_ERROR',
  }
}

export const removeError = (name) => {
  return {
    type: 'REMOVE_ERROR',
    name,
  }
}
