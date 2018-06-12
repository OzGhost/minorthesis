import { OPEN_DIALOG, CLOSE_DIALOG, CLEAR_DIALOGS,
          QUERY_FIELD_CHANGE, OPEN_MODIFIER } from '../actions'
import Mapper from '../common/Mapper'
import MODIFIER_DIALOG from '../common/Constants'

const dialogState = (state = {}, action) => {
  switch (action.type) {

    case OPEN_DIALOG:
      return {
        ...state,
        [action.dialogName]: true
      }
    
    case CLOSE_DIALOG:
      if (action.dialogName !== 'ruler') {
        Mapper.clearOverlay()
      }
      return {
        ...state,
        [action.dialogName]: false
      }

    case CLEAR_DIALOGS:
      return {}

    case QUERY_FIELD_CHANGE:
      Mapper.clearOverlay()
      return {
        ...state,
        ['detail']: false
      }

    default:
      return state
  }
}

export default dialogState

