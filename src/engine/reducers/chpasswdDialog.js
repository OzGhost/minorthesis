import { OPEN_DIALOG, VALUE_CHANGE, STATE_CHANGE } from '../actions'
import { CHPASSWD_DIALOG } from '../common/Constants'

const chpasswdDialog = (state = {
                                  oldPasswd: '',
                                  newPasswd: '',
                                  renewPasswd: ''
                                }, action) => {
  switch(action.type) {
    case VALUE_CHANGE:
      if (action.target === CHPASSWD_DIALOG) {
        console.log('cout << hit!')
        return {
          ...state,
          [action.locate]: action.value,
          msg: ''
        }
      }

    case STATE_CHANGE:
      if (action.target === CHPASSWD_DIALOG)
        return {
          ...state,
          ...action.stateFragment
        }

    case OPEN_DIALOG:
      if (action.dialogName === CHPASSWD_DIALOG)
        return {
          ...state,
          offset: action.offset
        }

    default:
      return state
  }
}

export default chpasswdDialog

