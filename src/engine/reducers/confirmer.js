import { OPEN_CONFIRMER, CLOSE_CONFIRMER } from '../actions'

const confirmer = (state = {}, action) => {
  switch(action.type) {
    case OPEN_CONFIRMER:
      return {
        inUse: true,
        message: action.msg,
        onDeny: action.onDeny,
        onAccept: action.onAccept
      }

    case CLOSE_CONFIRMER:
      return {
        inUse: false
      }
    default:
      return state
  }
}

export default confirmer
