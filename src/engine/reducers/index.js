import { combineReducers } from 'redux'
import Mapper from '../common/Mapper'
import DataLoader from '../common/DataLoader'
import {
  QUERY_TARGET_CHANGE, RECEIVE_LAYERS,
  QUERY_FIELD_CHANGE,
  OPEN_DIALOG, CLOSE_DIALOG, CLEAR_DIALOGS,
  QUERING, RECEIVE_QUERY_RESULT,
  OPEN_DETAIL,
  TOGGLE_LAYER,
  IN_USERNAME, IN_PASSWORD, IN_LOGIN, LOGIN_RESULT, ROLE_CHANGED,
  NO_RESULT_FOUND
} from '../actions'

const defaultSelect = {
  value: '...',
  label: '...'
}
const emptyResult = {
  gid: -1,
  name: '...'
}

const queryDialog = (state = {target: 'user', queryData: {}}, action) => {
  switch (action.type) {
    case QUERING:
      return {
        ...state,
        isLoading: true
      }

    case QUERY_TARGET_CHANGE:
      return {
        ...state,
        target: action.target,
        hasNoResult: false
      }

    case QUERY_FIELD_CHANGE:
      return {
        ...state,
        hasNoResult: false,
        queryData: DataLoader.load(state.queryData, action.locate, action.value)
      }

    case NO_RESULT_FOUND:
      if (action.target === 'query')
        return {
          ...state,
          hasNoResult: true
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

const detailDialog = (state = { obj: {} }, action) => {
  switch (action.type) {

    case OPEN_DETAIL:
      return {
        ...state,
        obj: action.object,
        labels: action.labels
      }

    default:
      return state
  }
}

const filterDialog = (state = [], action) => {
  switch (action.type) {

    case RECEIVE_LAYERS:
      
      Mapper.init(action.layers.map(layer => layer.value))
      return [...(action.layers.map(layer => ({...layer, isChecked: true}))),
                {value: 'osm', label: 'Open Street Map', isChecked: true}
              ]

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

