export default function animations(state=[], action) {

  switch (action.type) {

    case 'ANIMATION_STEP':
      return action.getStyle

    case 'REMOVE_LINES':
      return []

    default:
      return state

  }

}
