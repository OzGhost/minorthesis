import { OPEN_DETAIL } from '../actions'

const detailDialog = (state = { obj: {} }, action) => {
  switch (action.type) {

    case OPEN_DETAIL:
      return {
        ...state,
        obj: action.object
      }

    default:
      return state
  }
}

export default detailDialog

