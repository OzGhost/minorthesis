import { VALUE_CHANGE, STATE_CHANGE } from '../actions'
import { MODIFIER_DIALOG, ADD_MODE, ACCOUNT_CODE } from '../common/Constants'
import DataLoader from '../common/DataLoader'

const modifierDialog = (state = {
                                  mode: ADD_MODE,
                                  target: ACCOUNT_CODE
                                }, action) => {
  switch(action.type) {
    case VALUE_CHANGE:
      if (action.target === MODIFIER_DIALOG)
        return {
          ...DataLoader.load(state, action.locate, action.value),
          msg: ''
        }
    case STATE_CHANGE:
      if (action.target === MODIFIER_DIALOG)
        return {
          ...state,
          ...action.stateFragment
        }
    default:
      return state
  }
}

export default modifierDialog

