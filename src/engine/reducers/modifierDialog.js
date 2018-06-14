import { VALUE_CHANGE, STATE_CHANGE, OPEN_MODIFIER, OPEN_DIALOG } from '../actions'
import { MODIFIER_DIALOG, ADD_MODE, GOVERN_DOC_CODE,
        EDIT_MODE } from '../common/Constants'
import DataLoader from '../common/DataLoader'
import ModifierFactory from '../common/ModifierFactory'

const defaultState = {mode: ADD_MODE, target: GOVERN_DOC_CODE}

const modifierDialog = (state = defaultState, action) => {
  switch(action.type) {
    case VALUE_CHANGE:
      if (action.target === MODIFIER_DIALOG)
        return {
          ...state,
          ...DataLoader.load(state, action.locate, action.value),
          msg: ''
        }
    case STATE_CHANGE:
      if (action.target === MODIFIER_DIALOG)
        return {
          ...state,
          ...action.stateFragment
        }

    case OPEN_MODIFIER:
      const modifier = ModifierFactory.buildFor(action.code)
      return {
        ...state,
        mode: EDIT_MODE,
        msg: '',
        target: action.code,
        [modifier.getNamespace()]: modifier.handlePayload(action.payload),
        callback: action.callback
      }

    case OPEN_DIALOG:
      if (action.dialogName === MODIFIER_DIALOG)
        return defaultState

    default:
      return state
  }
}

export default modifierDialog

