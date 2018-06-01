import { combineReducers } from 'redux'
import Mapper from '../common/Mapper'
import {
  QUERY_TARGET_CHANGE, RECEIVE_LAYERS,
  OPEN_DIALOG, CLOSE_DIALOG, CLEAR_DIALOGS,
  QUERING, RECEIVE_QUERY_RESULT,
  OPEN_DETAIL,
  TOGGLE_LAYER,
  IN_USERNAME, IN_PASSWORD, IN_LOGIN, LOGIN_RESULT, ROLE_CHANGED
} from '../actions'

const defaultSelect = {
  value: '...',
  label: '...'
}
const emptyResult = {
  gid: -1,
  name: '...'
}

const queryDialog = (state = {target: ''}, action) => {
  switch (action.type) {
    case QUERING:
      return {
        ...state,
        isLoading: true
      }

    case QUERY_TARGET_CHANGE:
      return {
        ...state,
        target: action.target
      }

    default:
      return state
  }
}

const dialogState = (state = {}, action) => {
  switch (action.type) {

    case OPEN_DIALOG:
      return {
        ...state,
        [action.dialogName]: true
      }
    
    case CLOSE_DIALOG:
      return {
        ...state,
        [action.dialogName]: false
      }

    case CLEAR_DIALOGS:
      return {}

    default:
      return state
  }
}

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

const filterDialog = (state = [], action) => {
  switch (action.type) {

    case RECEIVE_LAYERS:
      Mapper.init(action.layers.map(layer => layer.value))
      return action.layers.map(layer => ({...layer, isChecked: true}))

    case TOGGLE_LAYER:
      const newState = state.map( layer => 
        layer.value === action.layer
          ? { ...layer, isChecked: !layer.isChecked }
          : layer
      )
      Mapper.filterLayer(
        newState
          .filter(layer => layer.isChecked)
          .map(layer => layer.value)
      )
      return newState
  
    default:
      return state
  }
}

const userIdentify = (state = {username: '', password: ''}, action) => {
  switch(action.type) {
    
    case IN_USERNAME:
      return {
        ...state,
        username: action.username
      }

    case IN_PASSWORD:
      return {
        ...state,
        password: action.password
      }

    case IN_LOGIN:
      return {
        ...state,
        isLoading: true
      }

    case LOGIN_RESULT:
      if (action.authenResult.isPass) {
        return {
          ...state,
          username: '',
          password: '',
          isLoading: false,
          result: action.authenResult
        }
      } else {
        return {
          ...state,
          isLoading: false,
          result: action.authenResult
        }
      }

    default:
      return state
  }
}

const taskbar = (state = {role: 'admin'}, action) => {
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

const rootReducer = combineReducers({
  dialogState,
  queryDialog,
  detailDialog,
  filterDialog,
  userIdentify,
  taskbar
})

export default rootReducer

