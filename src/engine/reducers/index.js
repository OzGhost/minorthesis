import { combineReducers } from 'redux'
import dialogState from './dialogState'
import queryDialog from './queryDialog'
import detailDialog from './detailDialog'
import filterDialog from './filterDialog'
import userIdentify from './userIdentify'
import taskbar from './taskbar'
import chpasswdDialog from './chpasswdDialog'
import modifierDialog from './modifierDialog'

const rootReducer = combineReducers({
  dialogState,
  queryDialog,
  detailDialog,
  filterDialog,
  userIdentify,
  taskbar,
  chpasswdDialog,
  modifierDialog
})

export default rootReducer

