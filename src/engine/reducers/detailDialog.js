import { OPEN_DIALOG, OPEN_DETAIL } from '../actions'
import { DETAIL_DIALOG } from '../common/Constants'

const detailDialog = (state = { obj: {} }, action) => {
  switch (action.type) {

    case OPEN_DETAIL:
      return {
        ...state,
        obj: action.object
      }

    case OPEN_DIALOG:
      if (action.dialogName === DETAIL_DIALOG)
        return {
          ...state,
          offset: action.offset
        }

    default:
      return state
  }
}

export default detailDialog

