import { ROLE_CHANGED } from '../actions'

const taskbar = (state = {role: -1}, action) => {
  switch(action.type) {

    case ROLE_CHANGED:
      return {
        ...state,
        role: action.newRole
      }

    default:
      return state
  }
}

export default taskbar

